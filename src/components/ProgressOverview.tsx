import { useEffect, useState, type ReactElement } from "react";
import {
  createEmptyProgressSnapshot,
  deriveModuleProgressStatus,
  getRequiredLessonIds,
  type ModuleProgressStatus,
  type ProgressSnapshot,
} from "../app/progress/progress-model";
import { loadProgressSnapshot } from "../app/progress/progress-store";
import { moduleCatalog, type ModuleSummary } from "../app/modules/module-catalog";

const initialUpdatedAt = "1970-01-01T00:00:00.000Z";

const statusLabels: Record<ModuleProgressStatus, string> = {
  not_started: "Sin iniciar",
  in_progress: "En progreso",
  completed: "Completado",
};

const createInitialSnapshot = (): ProgressSnapshot => createEmptyProgressSnapshot(initialUpdatedAt);

const getErrorMessage = (error: unknown): string =>
  error instanceof Error && error.message !== ""
    ? error.message
    : "No se pudo cargar el progreso local.";

const getModuleProgressStatus = (
  module: ModuleSummary,
  snapshot: ProgressSnapshot,
): ModuleProgressStatus => deriveModuleProgressStatus(module, snapshot.modules[module.id]);

const getCompletedLessonCount = (module: ModuleSummary, snapshot: ProgressSnapshot): number => {
  const moduleProgress = snapshot.modules[module.id];

  return getRequiredLessonIds(module).filter(
    (lessonId) => moduleProgress?.lessons[lessonId] === "completed",
  ).length;
};

const getPracticeLabel = (module: ModuleSummary, snapshot: ProgressSnapshot): string => {
  const practice = snapshot.modules[module.id]?.practice;

  if (practice?.verified === true) {
    return "Práctica verificada";
  }

  if (practice?.started === true) {
    return "Práctica iniciada";
  }

  return "Práctica pendiente";
};

export default function ProgressOverview(): ReactElement {
  const [isReady, setIsReady] = useState(false);
  const [snapshot, setSnapshot] = useState<ProgressSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect((): (() => void) => {
    let isCancelled = false;

    void loadProgressSnapshot()
      .then((storedProgress) => {
        if (!isCancelled) {
          setSnapshot(storedProgress ?? createInitialSnapshot());
        }
      })
      .catch((loadError: unknown) => {
        if (!isCancelled) {
          setError(getErrorMessage(loadError));
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

  const moduleStatuses =
    snapshot === null
      ? []
      : moduleCatalog.map((module) => ({
          module,
          status: getModuleProgressStatus(module, snapshot),
        }));
  const completedModules = moduleStatuses.filter(({ status }) => status === "completed").length;
  const inProgressModules = moduleStatuses.filter(({ status }) => status === "in_progress").length;

  return (
    <section
      className="app-progress-overview"
      aria-labelledby="progress-overview-title"
      data-progress-error={error !== null ? "true" : "false"}
      data-progress-ready={isReady ? "true" : "false"}
    >
      <p className="app-placeholder-label">Snapshot local</p>
      <h2 id="progress-overview-title">Estado del recorrido</h2>
      <p className="app-progress-intro">
        El avance se calcula desde las evidencias guardadas en este navegador. No representa una
        calificación ni se sincroniza con un servicio externo.
      </p>
      {error !== null && (
        <p className="app-progress-error" role="alert">
          {error}
        </p>
      )}
      {snapshot !== null && error === null && (
        <>
          <div className="app-progress-summary" aria-label="Resumen del progreso">
            <div className="app-progress-stat">
              <span>Módulos completados</span>
              <strong>{completedModules}</strong>
            </div>
            <div className="app-progress-stat">
              <span>En progreso</span>
              <strong>{inProgressModules}</strong>
            </div>
            <div className="app-progress-stat">
              <span>Disponibles</span>
              <strong>{moduleCatalog.length}</strong>
            </div>
          </div>
          <ul className="app-progress-list">
            {moduleStatuses.map(({ module, status }) => {
              const completedLessons = getCompletedLessonCount(module, snapshot);

              return (
                <li
                  className={`app-progress-card is-${status}`}
                  data-module-id={module.id}
                  data-progress-status={status}
                  key={module.id}
                >
                  <div className="app-progress-card-header">
                    <p className="app-progress-card-status">{statusLabels[status]}</p>
                    <p className="app-progress-card-index">{module.id}</p>
                  </div>
                  <h3>
                    <a href={module.path}>{module.title}</a>
                  </h3>
                  <p className="app-progress-card-meta">
                    {completedLessons} de {module.lessonCount} lecciones ·{" "}
                    {getPracticeLabel(module, snapshot)}
                  </p>
                  <progress
                    className="app-progress-card-progress"
                    value={completedLessons}
                    max={module.lessonCount}
                    aria-label={`${module.title}: ${completedLessons} de ${module.lessonCount} lecciones`}
                  />
                  <a className="app-progress-card-link" href={module.path}>
                    Ver módulo <span aria-hidden="true">→</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
