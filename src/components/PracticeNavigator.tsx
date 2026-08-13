import { useEffect, useState, type ReactElement } from "react";
import {
  completeLesson,
  createEmptyProgressSnapshot,
  startLesson,
  startPractice,
  verifyPractice,
  type ProgressSnapshot,
  type ProgressTransitionResult,
} from "../app/progress/progress-model";
import {
  clearProgressSnapshot,
  loadProgressSnapshot,
  saveProgressSnapshot,
} from "../app/progress/progress-store";

const moduleId = "dom-eventos-06";
const totalLessons = 3;
const lessonIds = ["leccion-01", "leccion-02", "leccion-03"] as const;
const initialUpdatedAt = "1970-01-01T00:00:00.000Z";

const createInitialSnapshot = (): ProgressSnapshot => createEmptyProgressSnapshot(initialUpdatedAt);

const getCurrentLessonId = (lesson: number): string => lessonIds[lesson - 1] ?? lessonIds[0];

const getCurrentLessonNumber = (snapshot: ProgressSnapshot): number => {
  const lessons = snapshot.modules[moduleId]?.lessons;
  const completedLessons = lessonIds.filter((lessonId) => lessons?.[lessonId] === "completed");

  return Math.min(completedLessons.length + 1, totalLessons);
};

const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error && error.message !== "" ? error.message : fallback;

function advancePractice(
  snapshot: ProgressSnapshot,
  currentLesson: number,
  updatedAt: string,
): ProgressTransitionResult {
  let result = startPractice(snapshot, moduleId, updatedAt);

  if (!result.ok) {
    return result;
  }

  result = startLesson(result.snapshot, moduleId, getCurrentLessonId(currentLesson), updatedAt);

  if (!result.ok) {
    return result;
  }

  result = completeLesson(result.snapshot, moduleId, getCurrentLessonId(currentLesson), updatedAt);

  if (!result.ok) {
    return result;
  }

  if (currentLesson === totalLessons) {
    return verifyPractice(result.snapshot, moduleId, updatedAt);
  }

  return startLesson(result.snapshot, moduleId, getCurrentLessonId(currentLesson + 1), updatedAt);
}

export default function PracticeNavigator(): ReactElement {
  const [isReady, setIsReady] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [progress, setProgress] = useState<ProgressSnapshot>(createInitialSnapshot);
  const [error, setError] = useState<string | null>(null);
  const isComplete = progress.modules[moduleId]?.practice.verified === true;
  const isAdvanceDisabled = !isReady || isBusy || isComplete || error !== null;

  useEffect((): (() => void) => {
    let isCancelled = false;

    void loadProgressSnapshot()
      .then((storedProgress) => {
        if (isCancelled) {
          return;
        }

        const nextProgress = storedProgress ?? createInitialSnapshot();

        setProgress(nextProgress);
        setCurrentLesson(getCurrentLessonNumber(nextProgress));
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

  async function advance(): Promise<void> {
    if (!isReady || isBusy || isComplete || error !== null) {
      return;
    }

    const result = advancePractice(progress, currentLesson, new Date().toISOString());

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setIsBusy(true);

    try {
      await saveProgressSnapshot(result.snapshot);
      setError(null);
      setProgress(result.snapshot);
      setCurrentLesson((lesson) => Math.min(lesson + 1, totalLessons));
    } catch (saveError: unknown) {
      setError(
        getErrorMessage(saveError, "No se pudo guardar el progreso local. Intentá nuevamente."),
      );
    } finally {
      setIsBusy(false);
    }
  }

  async function reset(): Promise<void> {
    if (!isReady || isBusy) {
      return;
    }

    setIsBusy(true);

    try {
      await clearProgressSnapshot();
      const nextProgress = createInitialSnapshot();

      setProgress(nextProgress);
      setCurrentLesson(getCurrentLessonNumber(nextProgress));
      setError(null);
    } catch (clearError: unknown) {
      setError(
        getErrorMessage(clearError, "No se pudo reiniciar el progreso local. Intentá nuevamente."),
      );
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <section
      className="app-practice-card"
      aria-labelledby="practice-navigator-title"
      data-progress-advance-disabled={isAdvanceDisabled ? "true" : "false"}
      data-practice-completed={isComplete ? "true" : "false"}
      data-progress-error={error !== null ? "true" : "false"}
      data-progress-ready={isReady ? "true" : "false"}
    >
      <p className="app-placeholder-label">Punto de control · estado local</p>
      <h2 id="practice-navigator-title">Práctica local: avanzar por lecciones</h2>
      <p id="practice-navigator-description">
        Esta interacción registra el inicio, el cierre de cada lección y la verificación final. El
        avance se conserva en este navegador, sin sincronización, y puede exportarse desde Importar
        / Exportar.
      </p>
      <progress
        className="app-practice-progress"
        value={currentLesson}
        max={totalLessons}
        aria-label="Avance de la práctica"
      />
      <p className="app-practice-status" role="status" aria-live="polite" aria-atomic="true">
        Lección {currentLesson} de {totalLessons}
        {isComplete ? " · Completada" : ""}
      </p>
      {error !== null && (
        <p className="app-practice-error" role="alert">
          {error}
        </p>
      )}
      <div className="app-practice-actions">
        <button
          key={isAdvanceDisabled ? "advance-blocked" : "advance-available"}
          type="button"
          onClick={advance}
          disabled={isAdvanceDisabled}
          aria-describedby="practice-navigator-description"
        >
          {isBusy ? "Guardando…" : isComplete ? "Práctica completada" : "Siguiente lección"}
        </button>
        <button type="button" className="app-practice-reset" onClick={reset} disabled={isBusy}>
          Reiniciar
        </button>
      </div>
    </section>
  );
}
