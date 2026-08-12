import { moduleCatalog, type ModuleSummary } from "../modules/module-catalog";

export const COURSE_ID = "criterio-web" as const;
export const PROGRESS_SCHEMA_VERSION = 1 as const;
export const CONTENT_VERSION = 1 as const;
export const PRACTICE_ID = "practica-integradora" as const;

export const lessonProgressStatuses = ["not_started", "in_progress", "completed"] as const;

export type LessonProgressStatus = (typeof lessonProgressStatuses)[number];

export type ModuleProgressStatus =
  "not_started" | "in_progress" | "external_practice_pending" | "completed";

export type PracticeProgress = {
  started: boolean;
  verified: boolean;
};

export type ModuleProgress = {
  lessons: Record<string, LessonProgressStatus>;
  practice: PracticeProgress;
};

export type ProgressSnapshot = {
  schemaVersion: typeof PROGRESS_SCHEMA_VERSION;
  courseId: typeof COURSE_ID;
  contentVersion: typeof CONTENT_VERSION;
  updatedAt: string;
  modules: Record<string, ModuleProgress>;
};

export type ProgressValidationResult =
  { valid: true; snapshot: ProgressSnapshot } | { valid: false; errors: string[] };

export type ProgressCompatibilityResult =
  | { status: "compatible"; snapshot: ProgressSnapshot }
  | { status: "migration_required"; errors: string[] }
  | { status: "invalid"; errors: string[] };

export type ProgressTransitionResult =
  { ok: true; snapshot: ProgressSnapshot } | { ok: false; error: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isPositiveInteger = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value) && value > 0;

const getMigrationVersionErrors = (value: unknown): string[] => {
  if (!isRecord(value)) {
    return [];
  }

  const errors: string[] = [];

  if (isPositiveInteger(value.schemaVersion) && value.schemaVersion !== PROGRESS_SCHEMA_VERSION) {
    errors.push(
      `schemaVersion: ${value.schemaVersion} requiere migración antes de incorporarse (se admite ${PROGRESS_SCHEMA_VERSION})`,
    );
  }

  if (isPositiveInteger(value.contentVersion) && value.contentVersion !== CONTENT_VERSION) {
    errors.push(
      `contentVersion: ${value.contentVersion} requiere migración antes de incorporarse (se admite ${CONTENT_VERSION})`,
    );
  }

  return errors;
};

const isIsoDate = (value: unknown): value is string => {
  if (typeof value !== "string") {
    return false;
  }

  const date = new Date(value);

  return Number.isFinite(date.getTime()) && date.toISOString() === value;
};

const isLessonProgressStatus = (value: unknown): value is LessonProgressStatus =>
  typeof value === "string" && lessonProgressStatuses.some((status) => status === value);

const getModuleById = (moduleId: string): ModuleSummary | undefined =>
  moduleCatalog.find((module) => module.id === moduleId);

export const getRequiredLessonIds = (module: ModuleSummary): string[] =>
  module.lessons.filter((lesson) => lesson.id !== PRACTICE_ID).map((lesson) => lesson.id);

export const createEmptyProgressSnapshot = (updatedAt: string): ProgressSnapshot => ({
  schemaVersion: PROGRESS_SCHEMA_VERSION,
  courseId: COURSE_ID,
  contentVersion: CONTENT_VERSION,
  updatedAt,
  modules: {},
});

export const hasProgressEvidence = (snapshot: ProgressSnapshot): boolean =>
  Object.entries(snapshot.modules).some(([moduleId, moduleProgress]) => {
    const hasLessonEvidence = Object.values(moduleProgress.lessons).some(
      (status) => status !== "not_started",
    );
    const hasInteractivePracticeEvidence =
      getModuleById(moduleId)?.practiceTracking === "interactive" &&
      moduleProgress.practice.started;

    return hasLessonEvidence || hasInteractivePracticeEvidence;
  });

const createEmptyModuleProgress = (): ModuleProgress => ({
  lessons: {},
  practice: { started: false, verified: false },
});

type ModuleProgressUpdateError = { ok: false; error: string };
type ModuleProgressUpdater = (
  progress: ModuleProgress,
) => ModuleProgress | ModuleProgressUpdateError;

const updateModuleProgress = (
  snapshot: ProgressSnapshot,
  moduleId: string,
  updatedAt: string,
  updater: ModuleProgressUpdater,
): ProgressTransitionResult => {
  if (getModuleById(moduleId) === undefined) {
    return { ok: false, error: `modules.${moduleId}: módulo desconocido` };
  }

  if (!isIsoDate(updatedAt)) {
    return { ok: false, error: "updatedAt: debe ser una fecha ISO canónica" };
  }

  const currentProgress = snapshot.modules[moduleId] ?? createEmptyModuleProgress();
  const nextProgress = updater(currentProgress);

  if ("ok" in nextProgress) {
    return nextProgress;
  }

  if (nextProgress === currentProgress) {
    return { ok: true, snapshot };
  }

  return {
    ok: true,
    snapshot: {
      ...snapshot,
      updatedAt,
      modules: { ...snapshot.modules, [moduleId]: nextProgress },
    },
  };
};

const validateLessonId = (moduleId: string, lessonId: string): string | undefined => {
  const module = getModuleById(moduleId);

  if (module === undefined) {
    return `modules.${moduleId}: módulo desconocido`;
  }

  if (!getRequiredLessonIds(module).includes(lessonId)) {
    return `modules.${moduleId}.lessons.${lessonId}: lección desconocida`;
  }

  return undefined;
};

export const startLesson = (
  snapshot: ProgressSnapshot,
  moduleId: string,
  lessonId: string,
  updatedAt: string,
): ProgressTransitionResult => {
  const lessonError = validateLessonId(moduleId, lessonId);

  if (lessonError !== undefined) {
    return { ok: false, error: lessonError };
  }

  return updateModuleProgress(snapshot, moduleId, updatedAt, (progress) => {
    const currentStatus = progress.lessons[lessonId] ?? "not_started";

    if (currentStatus !== "not_started") {
      return progress;
    }

    return {
      ...progress,
      lessons: { ...progress.lessons, [lessonId]: "in_progress" },
    };
  });
};

export const completeLesson = (
  snapshot: ProgressSnapshot,
  moduleId: string,
  lessonId: string,
  updatedAt: string,
): ProgressTransitionResult => {
  const lessonError = validateLessonId(moduleId, lessonId);

  if (lessonError !== undefined) {
    return { ok: false, error: lessonError };
  }

  return updateModuleProgress(snapshot, moduleId, updatedAt, (progress) => {
    const currentStatus = progress.lessons[lessonId] ?? "not_started";

    if (currentStatus === "completed") {
      return progress;
    }

    if (currentStatus !== "in_progress") {
      return {
        ok: false,
        error: `modules.${moduleId}.lessons.${lessonId}: completar requiere iniciar la lección`,
      };
    }

    return {
      ...progress,
      lessons: { ...progress.lessons, [lessonId]: "completed" },
    };
  });
};

export const startPractice = (
  snapshot: ProgressSnapshot,
  moduleId: string,
  updatedAt: string,
): ProgressTransitionResult => {
  const module = getModuleById(moduleId);

  if (module?.practiceTracking === "external") {
    return {
      ok: false,
      error: `modules.${moduleId}.practice: la práctica ocurre fuera de la aplicación`,
    };
  }

  return updateModuleProgress(snapshot, moduleId, updatedAt, (progress) => {
    if (progress.practice.started) {
      return progress;
    }

    return {
      ...progress,
      practice: { ...progress.practice, started: true },
    };
  });
};

export const verifyPractice = (
  snapshot: ProgressSnapshot,
  moduleId: string,
  updatedAt: string,
): ProgressTransitionResult => {
  const module = getModuleById(moduleId);

  if (module?.practiceTracking === "external") {
    return {
      ok: false,
      error: `modules.${moduleId}.practice: la práctica ocurre fuera de la aplicación`,
    };
  }

  return updateModuleProgress(snapshot, moduleId, updatedAt, (progress) => {
    if (!progress.practice.started) {
      return {
        ok: false,
        error: `modules.${moduleId}.practice: verificar requiere iniciar la práctica`,
      };
    }

    if (progress.practice.verified) {
      return progress;
    }

    return {
      ...progress,
      practice: { ...progress.practice, verified: true },
    };
  });
};

export const deriveModuleProgressStatus = (
  module: ModuleSummary,
  progress: ModuleProgress | undefined,
): ModuleProgressStatus => {
  if (progress === undefined) {
    return "not_started";
  }

  const hasEvidence =
    Object.values(progress.lessons).some((status) => status !== "not_started") ||
    (module.practiceTracking === "interactive" && progress.practice.started);
  const hasCompletedLessons = getRequiredLessonIds(module).every(
    (lessonId) => progress.lessons[lessonId] === "completed",
  );

  if (hasCompletedLessons && module.practiceTracking === "external") {
    return "external_practice_pending";
  }

  if (hasCompletedLessons && progress.practice.started && progress.practice.verified) {
    return "completed";
  }

  return hasEvidence ? "in_progress" : "not_started";
};

const parseModuleProgress = (
  moduleId: string,
  value: unknown,
  errors: string[],
): ModuleProgress | undefined => {
  const module = getModuleById(moduleId);

  if (module === undefined) {
    errors.push(`modules.${moduleId}: módulo desconocido`);
    return undefined;
  }

  if (!isRecord(value)) {
    errors.push(`modules.${moduleId}: debe ser un objeto`);
    return undefined;
  }

  const lessons = value.lessons;
  const parsedLessons: Record<string, LessonProgressStatus> = {};

  if (!isRecord(lessons)) {
    errors.push(`modules.${moduleId}.lessons: debe ser un objeto`);
  } else {
    const knownLessonIds = new Set(getRequiredLessonIds(module));

    Object.entries(lessons).forEach(([lessonId, status]): void => {
      if (!knownLessonIds.has(lessonId)) {
        errors.push(`modules.${moduleId}.lessons.${lessonId}: lección desconocida`);
      }

      if (!isLessonProgressStatus(status)) {
        errors.push(`modules.${moduleId}.lessons.${lessonId}: estado inválido`);
      } else if (knownLessonIds.has(lessonId)) {
        parsedLessons[lessonId] = status;
      }
    });
  }

  const practice = value.practice;

  if (!isRecord(practice)) {
    errors.push(`modules.${moduleId}.practice: debe ser un objeto`);
    return undefined;
  }

  const started = practice.started;
  const verified = practice.verified;

  if (typeof started !== "boolean") {
    errors.push(`modules.${moduleId}.practice.started: debe ser booleano`);
  }

  if (typeof verified !== "boolean") {
    errors.push(`modules.${moduleId}.practice.verified: debe ser booleano`);
  }

  if (started === false && verified === true) {
    errors.push(`modules.${moduleId}.practice: verified requiere started`);
  }

  if (typeof started !== "boolean" || typeof verified !== "boolean") {
    return undefined;
  }

  return {
    lessons: parsedLessons,
    practice: { started, verified },
  };
};

export const validateProgressSnapshot = (value: unknown): ProgressValidationResult => {
  if (!isRecord(value)) {
    return { valid: false, errors: ["snapshot: debe ser un objeto"] };
  }

  const errors: string[] = [];

  if (!isPositiveInteger(value.schemaVersion) || value.schemaVersion !== PROGRESS_SCHEMA_VERSION) {
    errors.push(`schemaVersion: se esperaba ${PROGRESS_SCHEMA_VERSION}`);
  }

  if (value.courseId !== COURSE_ID) {
    errors.push(`courseId: se esperaba ${COURSE_ID}`);
  }

  if (!isPositiveInteger(value.contentVersion) || value.contentVersion !== CONTENT_VERSION) {
    errors.push(`contentVersion: se esperaba ${CONTENT_VERSION}`);
  }

  const updatedAt = isIsoDate(value.updatedAt) ? value.updatedAt : undefined;

  if (updatedAt === undefined) {
    errors.push("updatedAt: debe ser una fecha ISO canónica");
  }

  const parsedModules: Record<string, ModuleProgress> = {};
  if (!isRecord(value.modules)) {
    errors.push("modules: debe ser un objeto");
  } else {
    Object.entries(value.modules).forEach(([moduleId, moduleProgress]): void => {
      const parsedModuleProgress = parseModuleProgress(moduleId, moduleProgress, errors);

      if (parsedModuleProgress !== undefined) {
        parsedModules[moduleId] = parsedModuleProgress;
      }
    });
  }

  if (errors.length > 0 || updatedAt === undefined) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    snapshot: {
      schemaVersion: PROGRESS_SCHEMA_VERSION,
      courseId: COURSE_ID,
      contentVersion: CONTENT_VERSION,
      updatedAt,
      modules: parsedModules,
    },
  };
};

export const checkProgressSnapshotCompatibility = (value: unknown): ProgressCompatibilityResult => {
  const migrationErrors = getMigrationVersionErrors(value);

  if (migrationErrors.length > 0) {
    return { status: "migration_required", errors: migrationErrors };
  }

  const validation = validateProgressSnapshot(value);

  if (!validation.valid) {
    return { status: "invalid", errors: validation.errors };
  }

  return { status: "compatible", snapshot: validation.snapshot };
};
