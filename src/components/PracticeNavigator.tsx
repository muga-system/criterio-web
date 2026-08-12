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

const moduleId = "dom-eventos-06";
const totalLessons = 3;
const lessonIds = ["leccion-01", "leccion-02", "leccion-03"] as const;
const initialUpdatedAt = "1970-01-01T00:00:00.000Z";

const createInitialSnapshot = (): ProgressSnapshot => createEmptyProgressSnapshot(initialUpdatedAt);

const getCurrentLessonId = (lesson: number): string => lessonIds[lesson - 1] ?? lessonIds[0];

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
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [progress, setProgress] = useState<ProgressSnapshot>(createInitialSnapshot);
  const [error, setError] = useState<string | null>(null);
  const isComplete = progress.modules[moduleId]?.practice.verified === true;

  useEffect((): void => {
    setIsHydrated(true);
  }, []);

  function advance(): void {
    const result = advancePractice(progress, currentLesson, new Date().toISOString());

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError(null);
    setProgress(result.snapshot);
    setCurrentLesson((lesson) => Math.min(lesson + 1, totalLessons));
  }

  function reset(): void {
    setProgress(createInitialSnapshot());
    setCurrentLesson(1);
    setError(null);
  }

  return (
    <section
      className="app-practice-card"
      aria-labelledby="practice-navigator-title"
      data-practice-completed={isComplete ? "true" : "false"}
    >
      <p className="app-placeholder-label">Isla React · estado local</p>
      <h2 id="practice-navigator-title">Práctica local: avanzar por lecciones</h2>
      <p id="practice-navigator-description">
        Esta interacción registra el inicio, el cierre de cada lección y la verificación final. El
        avance se pierde al recargar la página.
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
          type="button"
          onClick={advance}
          disabled={!isHydrated || isComplete}
          aria-describedby="practice-navigator-description"
        >
          {isComplete ? "Práctica completada" : "Siguiente lección"}
        </button>
        <button type="button" className="app-practice-reset" onClick={reset}>
          Reiniciar
        </button>
      </div>
    </section>
  );
}
