import { moduleCatalog, type ModuleSummary } from "../modules/module-catalog";

export const COURSE_ID = "criterio-web" as const;
export const PROGRESS_SCHEMA_VERSION = 1 as const;
export const CONTENT_VERSION = 1 as const;
export const PRACTICE_ID = "practica-integradora" as const;

export const lessonProgressStatuses = ["not_started", "in_progress", "completed"] as const;

export type LessonProgressStatus = (typeof lessonProgressStatuses)[number];

export type ModuleProgressStatus = "not_started" | "in_progress" | "completed";

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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isPositiveInteger = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value) && value > 0;

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

export const deriveModuleProgressStatus = (
  module: ModuleSummary,
  progress: ModuleProgress | undefined,
): ModuleProgressStatus => {
  if (progress === undefined) {
    return "not_started";
  }

  const hasEvidence =
    Object.values(progress.lessons).some((status) => status !== "not_started") ||
    progress.practice.started;
  const hasCompletedLessons = getRequiredLessonIds(module).every(
    (lessonId) => progress.lessons[lessonId] === "completed",
  );

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
