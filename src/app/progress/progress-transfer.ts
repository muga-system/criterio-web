import { validateProgressSnapshot, type ProgressSnapshot } from "./progress-model";

export const PROGRESS_TOKEN_PREFIX = "CRITERIO1";

export type ProgressTokenDecodeResult =
  { valid: true; snapshot: ProgressSnapshot } | { valid: false; error: string };

export class ProgressTokenError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "ProgressTokenError";
  }
}

const getErrorMessage = (error: unknown): string =>
  error instanceof Error && error.message !== ""
    ? error.message
    : "El contenido del token no pudo interpretarse.";

const encodeBase64Url = (value: string): string => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte): void => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
};

const decodeBase64Url = (value: string): string => {
  if (!/^[A-Za-z0-9_-]+$/u.test(value) || value.length % 4 === 1) {
    throw new ProgressTokenError("El payload del token no tiene un formato base64url válido.");
  }

  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(`${base64}${padding}`);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
};

export const encodeProgressToken = (snapshot: ProgressSnapshot): string => {
  const validation = validateProgressSnapshot(snapshot);

  if (!validation.valid) {
    throw new ProgressTokenError(
      `No se puede exportar un snapshot inválido: ${validation.errors.join("; ")}`,
    );
  }

  return `${PROGRESS_TOKEN_PREFIX}.${encodeBase64Url(JSON.stringify(validation.snapshot))}`;
};

export const decodeProgressToken = (token: string): ProgressTokenDecodeResult => {
  const normalizedToken = token.trim();
  const parts = normalizedToken.split(".");
  const prefix = parts[0];
  const payload = parts[1];

  if (
    parts.length !== 2 ||
    prefix !== PROGRESS_TOKEN_PREFIX ||
    payload === undefined ||
    payload === ""
  ) {
    return {
      valid: false,
      error: `El token debe comenzar con ${PROGRESS_TOKEN_PREFIX}. y contener un payload válido.`,
    };
  }

  try {
    const candidate: unknown = JSON.parse(decodeBase64Url(payload));
    const validation = validateProgressSnapshot(candidate);

    if (!validation.valid) {
      return {
        valid: false,
        error: `El snapshot del token no es compatible: ${validation.errors.join("; ")}`,
      };
    }

    return { valid: true, snapshot: validation.snapshot };
  } catch (error) {
    return { valid: false, error: getErrorMessage(error) };
  }
};
