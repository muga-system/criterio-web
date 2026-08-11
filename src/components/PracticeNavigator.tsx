import { useEffect, useState, type ReactElement } from "react";

const totalLessons = 3;

export default function PracticeNavigator(): ReactElement {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(1);
  const isComplete = currentLesson === totalLessons;

  useEffect((): void => {
    setIsHydrated(true);
  }, []);

  function advance(): void {
    setCurrentLesson((lesson) => Math.min(lesson + 1, totalLessons));
  }

  function reset(): void {
    setCurrentLesson(1);
  }

  return (
    <section className="app-practice-card" aria-labelledby="practice-navigator-title">
      <p className="app-placeholder-label">Isla React · estado local</p>
      <h2 id="practice-navigator-title">Práctica local: avanzar por lecciones</h2>
      <p id="practice-navigator-description">
        Esta interacción prueba el flujo estado → actualización → representación. El avance se
        pierde al recargar la página.
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
