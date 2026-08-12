import { describe, expect, it } from "vitest";
import {
  CONTENT_VERSION,
  COURSE_ID,
  PROGRESS_SCHEMA_VERSION,
  completeLesson,
  createEmptyProgressSnapshot,
  deriveModuleProgressStatus,
  getRequiredLessonIds,
  startLesson,
  startPractice,
  validateProgressSnapshot,
  verifyPractice,
  type ModuleProgress,
  type ProgressSnapshot,
} from "./progress-model";
import { moduleCatalog } from "../modules/module-catalog";

const domModule = moduleCatalog.find((module) => module.id === "dom-eventos-06");

if (domModule === undefined) {
  throw new Error("No se encontró el módulo DOM y eventos para las pruebas.");
}

const createModuleProgress = (overrides: Partial<ModuleProgress> = {}): ModuleProgress => ({
  lessons: {},
  practice: { started: false, verified: false },
  ...overrides,
});

const validSnapshot = (moduleProgress: ModuleProgress): ProgressSnapshot => ({
  schemaVersion: PROGRESS_SCHEMA_VERSION,
  courseId: COURSE_ID,
  contentVersion: CONTENT_VERSION,
  updatedAt: "2026-08-12T00:00:00.000Z",
  modules: { [domModule.id]: moduleProgress },
});

describe("progress-model", () => {
  it("crea un snapshot vacío con las versiones del contrato", () => {
    expect(createEmptyProgressSnapshot("2026-08-12T00:00:00.000Z")).toEqual({
      schemaVersion: 1,
      courseId: "criterio-web",
      contentVersion: 1,
      updatedAt: "2026-08-12T00:00:00.000Z",
      modules: {},
    });
  });

  it("separa las lecciones obligatorias de la práctica integradora", () => {
    expect(getRequiredLessonIds(domModule)).toEqual(["leccion-01", "leccion-02", "leccion-03"]);
  });

  it("deriva not_started cuando todavía no existe evidencia", () => {
    expect(deriveModuleProgressStatus(domModule, undefined)).toBe("not_started");
    expect(deriveModuleProgressStatus(domModule, createModuleProgress())).toBe("not_started");
  });

  it("deriva in_progress cuando existe avance sin cumplir el cierre", () => {
    expect(
      deriveModuleProgressStatus(
        domModule,
        createModuleProgress({
          lessons: { "leccion-01": "completed" },
        }),
      ),
    ).toBe("in_progress");

    expect(
      deriveModuleProgressStatus(
        domModule,
        createModuleProgress({ practice: { started: true, verified: false } }),
      ),
    ).toBe("in_progress");
  });

  it("deriva completed solo con todas las lecciones y la verificación", () => {
    expect(
      deriveModuleProgressStatus(
        domModule,
        createModuleProgress({
          lessons: {
            "leccion-01": "completed",
            "leccion-02": "completed",
            "leccion-03": "completed",
          },
          practice: { started: true, verified: true },
        }),
      ),
    ).toBe("completed");

    expect(
      deriveModuleProgressStatus(
        domModule,
        createModuleProgress({
          lessons: {
            "leccion-01": "completed",
            "leccion-02": "completed",
            "leccion-03": "completed",
          },
          practice: { started: true, verified: false },
        }),
      ),
    ).toBe("in_progress");
  });

  it("inicia una lección sin mutar el snapshot original", () => {
    const snapshot = createEmptyProgressSnapshot("2026-08-12T00:00:00.000Z");
    const result = startLesson(snapshot, domModule.id, "leccion-01", "2026-08-12T00:01:00.000Z");

    expect(result).toEqual({
      ok: true,
      snapshot: {
        ...snapshot,
        updatedAt: "2026-08-12T00:01:00.000Z",
        modules: {
          [domModule.id]: {
            lessons: { "leccion-01": "in_progress" },
            practice: { started: false, verified: false },
          },
        },
      },
    });
    expect(snapshot.modules).toEqual({});
  });

  it("mantiene idempotentes las transiciones repetidas", () => {
    const snapshot = createEmptyProgressSnapshot("2026-08-12T00:00:00.000Z");
    const started = startPractice(snapshot, domModule.id, "2026-08-12T00:01:00.000Z");

    expect(started.ok).toBe(true);

    if (started.ok) {
      const repeated = startPractice(started.snapshot, domModule.id, "2026-08-12T00:02:00.000Z");

      expect(repeated).toEqual({ ok: true, snapshot: started.snapshot });
    }
  });

  it("exige iniciar antes de completar una lección o verificar la práctica", () => {
    const snapshot = createEmptyProgressSnapshot("2026-08-12T00:00:00.000Z");
    const lessonResult = completeLesson(
      snapshot,
      domModule.id,
      "leccion-01",
      "2026-08-12T00:01:00.000Z",
    );
    const practiceResult = verifyPractice(snapshot, domModule.id, "2026-08-12T00:01:00.000Z");

    expect(lessonResult).toEqual({
      ok: false,
      error: "modules.dom-eventos-06.lessons.leccion-01: completar requiere iniciar la lección",
    });
    expect(practiceResult).toEqual({
      ok: false,
      error: "modules.dom-eventos-06.practice: verificar requiere iniciar la práctica",
    });
  });

  it("completa la lección y verifica la práctica después de sus transiciones previas", () => {
    const empty = createEmptyProgressSnapshot("2026-08-12T00:00:00.000Z");
    const lessonStarted = startLesson(
      empty,
      domModule.id,
      "leccion-01",
      "2026-08-12T00:01:00.000Z",
    );

    expect(lessonStarted.ok).toBe(true);

    if (lessonStarted.ok) {
      const lessonCompleted = completeLesson(
        lessonStarted.snapshot,
        domModule.id,
        "leccion-01",
        "2026-08-12T00:02:00.000Z",
      );

      expect(lessonCompleted.ok).toBe(true);

      if (lessonCompleted.ok) {
        const practiceStarted = startPractice(
          lessonCompleted.snapshot,
          domModule.id,
          "2026-08-12T00:03:00.000Z",
        );

        expect(practiceStarted.ok).toBe(true);

        if (practiceStarted.ok) {
          expect(
            verifyPractice(practiceStarted.snapshot, domModule.id, "2026-08-12T00:04:00.000Z"),
          ).toEqual({
            ok: true,
            snapshot: {
              ...practiceStarted.snapshot,
              updatedAt: "2026-08-12T00:04:00.000Z",
              modules: {
                [domModule.id]: {
                  lessons: { "leccion-01": "completed" },
                  practice: { started: true, verified: true },
                },
              },
            },
          });
        }
      }
    }
  });

  it("valida un snapshot compatible con el catálogo actual", () => {
    const snapshot = validSnapshot({
      lessons: { "leccion-01": "in_progress" },
      practice: { started: true, verified: false },
    });

    expect(validateProgressSnapshot(snapshot)).toEqual({ valid: true, snapshot });
  });

  it("rechaza versiones, módulos y estados que no pertenecen al contrato", () => {
    const result = validateProgressSnapshot({
      ...validSnapshot(createModuleProgress()),
      schemaVersion: 2,
      modules: {
        "dom-eventos-06": {
          lessons: { "leccion-inexistente": "completed" },
          practice: { started: false, verified: false },
        },
        "modulo-inexistente": {
          lessons: {},
          practice: { started: false, verified: false },
        },
      },
    });

    expect(result.valid).toBe(false);

    if (!result.valid) {
      expect(result.errors).toEqual([
        "schemaVersion: se esperaba 1",
        "modules.dom-eventos-06.lessons.leccion-inexistente: lección desconocida",
        "modules.modulo-inexistente: módulo desconocido",
      ]);
    }
  });

  it("rechaza verified cuando la práctica no fue iniciada", () => {
    const result = validateProgressSnapshot(
      validSnapshot(createModuleProgress({ practice: { started: false, verified: true } })),
    );

    expect(result.valid).toBe(false);

    if (!result.valid) {
      expect(result.errors).toContain("modules.dom-eventos-06.practice: verified requiere started");
    }
  });

  it("rechaza módulos, lecciones y fechas desconocidas en las transiciones", () => {
    const snapshot = createEmptyProgressSnapshot("2026-08-12T00:00:00.000Z");

    expect(startPractice(snapshot, "modulo-inexistente", "2026-08-12T00:01:00.000Z")).toEqual({
      ok: false,
      error: "modules.modulo-inexistente: módulo desconocido",
    });
    expect(
      startLesson(snapshot, domModule.id, "leccion-inexistente", "2026-08-12T00:01:00.000Z"),
    ).toEqual({
      ok: false,
      error: "modules.dom-eventos-06.lessons.leccion-inexistente: lección desconocida",
    });
    expect(startPractice(snapshot, domModule.id, "fecha-inválida")).toEqual({
      ok: false,
      error: "updatedAt: debe ser una fecha ISO canónica",
    });
  });
});
