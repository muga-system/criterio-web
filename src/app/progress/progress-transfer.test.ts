import { describe, expect, it } from "vitest";
import {
  PROGRESS_TOKEN_PREFIX,
  decodeProgressToken,
  encodeProgressToken,
} from "./progress-transfer";
import {
  CONTENT_VERSION,
  COURSE_ID,
  PROGRESS_SCHEMA_VERSION,
  type ProgressSnapshot,
} from "./progress-model";

const snapshot: ProgressSnapshot = {
  schemaVersion: PROGRESS_SCHEMA_VERSION,
  courseId: COURSE_ID,
  contentVersion: CONTENT_VERSION,
  updatedAt: "2026-08-12T00:00:00.000Z",
  modules: {
    "dom-eventos-06": {
      lessons: {
        "leccion-01": "completed",
        "leccion-02": "in_progress",
      },
      practice: { started: true, verified: false },
    },
  },
};

describe("progress-transfer", () => {
  it("codifica y decodifica un snapshot válido sin perder evidencia", () => {
    const token = encodeProgressToken(snapshot);
    const result = decodeProgressToken(token);

    expect(token.startsWith(`${PROGRESS_TOKEN_PREFIX}.`)).toBe(true);
    expect(result).toEqual({ valid: true, snapshot });
  });

  it("rechaza prefijos, payloads y snapshots incompatibles", () => {
    expect(decodeProgressToken("OTRO1.payload")).toEqual({
      valid: false,
      error: `El token debe comenzar con ${PROGRESS_TOKEN_PREFIX}. y contener un payload válido.`,
    });
    expect(decodeProgressToken(`${PROGRESS_TOKEN_PREFIX}.no válido`)).toEqual({
      valid: false,
      error: "El payload del token no tiene un formato base64url válido.",
    });
  });
});
