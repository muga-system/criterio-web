import { useEffect, useState, type ReactElement } from "react";
import {
  completeLesson,
  createEmptyProgressSnapshot,
  startLesson,
  type LessonProgressStatus,
  type ProgressSnapshot,
} from "../app/progress/progress-model";
import { loadProgressSnapshot, saveProgressSnapshot } from "../app/progress/progress-store";

type Lesson = {
  id: string;
  title: string;
};

type Props = {
  lessons: readonly Lesson[];
  moduleId: string;
};

const initialUpdatedAt = "1970-01-01T00:00:00.000Z";

const statusLabels: Record<LessonProgressStatus, string> = {
  not_started: "Sin iniciar",
  in_progress: "En progreso",
  completed: "Completada",
};

const createInitialSnapshot = (): ProgressSnapshot => createEmptyProgressSnapshot(initialUpdatedAt);

const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error && error.message !== "" ? error.message : fallback;

export default function LessonProgressNavigator({ lessons, moduleId }: Props): ReactElement {
  const [isReady, setIsReady] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [progress, setProgress] = useState<ProgressSnapshot>(createInitialSnapshot);
  const [error, setError] = useState<string | null>(null);

  useEffect((): (() => void) => {
    let isCancelled = false;

    void loadProgressSnapshot()
      .then((storedProgress) => {
        if (!isCancelled) {
          setProgress(storedProgress ?? createInitialSnapshot());
        }
      })
      .catch((loadError: unknown) => {
        if (!isCancelled) {
          setError(getErrorMessage(loadError, "No se pudo cargar el progreso local."));
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsReady(true);
        }
      });

    return (): void => {
      isCancelled = true;
    };
  }, []);

  const getLessonStatus = (lessonId: string): LessonProgressStatus =>
    progress.modules[moduleId]?.lessons[lessonId] ?? "not_started";

  async function complete(lessonId: string): Promise<void> {
    if (!isReady || isBusy || error !== null || getLessonStatus(lessonId) === "completed") {
      return;
    }

    const updatedAt = new Date().toISOString();
    let result = startLesson(progress, moduleId, lessonId, updatedAt);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    result = completeLesson(result.snapshot, moduleId, lessonId, updatedAt);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setIsBusy(true);

    try {
      await saveProgressSnapshot(result.snapshot);
      setProgress(result.snapshot);
      setError(null);
    } catch (saveError: unknown) {
      setError(
        getErrorMessage(saveError, "No se pudo guardar el progreso local. Intentá nuevamente."),
      );
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <section
      className="app-lesson-progress-card"
      aria-labelledby="lesson-progress-title"
      data-module-id={moduleId}
      data-progress-error={error !== null ? "true" : "false"}
      data-progress-ready={isReady ? "true" : "false"}
    >
      <p className="app-placeholder-label">Registro local</p>
      <h2 id="lesson-progress-title">Marcar lecciones recorridas</h2>
      <p className="app-lesson-progress-intro">
        El cierre se registra solo cuando confirmás cada lección. Leer la ruta o desplazar el
        contenido no modifica este estado.
      </p>
      {error !== null && (
        <p className="app-lesson-progress-error" role="alert">
          {error}
        </p>
      )}
      <ul className="app-lesson-progress-list">
        {lessons.map((lesson) => {
          const status = getLessonStatus(lesson.id);
          const isDisabled = !isReady || isBusy || error !== null || status === "completed";

          return (
            <li
              className="app-lesson-progress-item"
              data-lesson-id={lesson.id}
              data-progress-status={status}
              key={lesson.id}
            >
              <div>
                <a href={`#${lesson.id}`}>{lesson.title}</a>
                <p>{statusLabels[status]}</p>
              </div>
              <button
                key={`${lesson.id}-${status}-${isDisabled ? "disabled" : "enabled"}`}
                type="button"
                onClick={() => void complete(lesson.id)}
                disabled={isDisabled}
              >
                {status === "completed" ? "Lección completada" : "Marcar como completada"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
