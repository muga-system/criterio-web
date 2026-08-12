import { describe, expect, it } from "vitest";
import {
  CONTENT_VERSION,
  COURSE_ID,
  PROGRESS_SCHEMA_VERSION,
  createEmptyProgressSnapshot,
  deriveModuleProgressStatus,
  getRequiredLessonIds,
  validateProgressSnapshot,
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
});
