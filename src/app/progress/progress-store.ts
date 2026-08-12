import { COURSE_ID, validateProgressSnapshot, type ProgressSnapshot } from "./progress-model";

export const PROGRESS_DATABASE_NAME = "criterio-web-progress";
export const PROGRESS_DATABASE_VERSION = 1;

const PROGRESS_STORE_NAME = "snapshots";
const PROGRESS_SNAPSHOT_KEY = COURSE_ID;

export class ProgressStoreError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "ProgressStoreError";
  }
}

const getIndexedDb = (): IDBFactory => {
  if (typeof indexedDB === "undefined") {
    throw new ProgressStoreError("El almacenamiento local no está disponible en este navegador.");
  }

  return indexedDB;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof DOMException && error.message !== "") {
    return error.message;
  }

  if (error instanceof Error && error.message !== "") {
    return error.message;
  }

  return "Error desconocido del almacenamiento local";
};

const openDatabase = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject): void => {
    let request: IDBOpenDBRequest;

    try {
      request = getIndexedDb().open(PROGRESS_DATABASE_NAME, PROGRESS_DATABASE_VERSION);
    } catch (error) {
      reject(
        error instanceof Error
          ? error
          : new ProgressStoreError(
              `No se pudo abrir el almacenamiento local: ${getErrorMessage(error)}`,
            ),
      );
      return;
    }

    request.onupgradeneeded = (): void => {
      const database = request.result;

      if (!database.objectStoreNames.contains(PROGRESS_STORE_NAME)) {
        database.createObjectStore(PROGRESS_STORE_NAME);
      }
    };

    request.onsuccess = (): void => resolve(request.result);
    request.onerror = (): void =>
      reject(
        new ProgressStoreError(
          `No se pudo abrir el almacenamiento local: ${getErrorMessage(request.error)}`,
        ),
      );
    request.onblocked = (): void =>
      reject(new ProgressStoreError("El almacenamiento local está bloqueado por otra pestaña."));
  });

const runStoreRequest = <T>(
  database: IDBDatabase,
  mode: IDBTransactionMode,
  createRequest: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> =>
  new Promise((resolve, reject): void => {
    let transaction: IDBTransaction;
    let request: IDBRequest<T>;
    let result: T;

    try {
      transaction = database.transaction(PROGRESS_STORE_NAME, mode);
      request = createRequest(transaction.objectStore(PROGRESS_STORE_NAME));
    } catch (error) {
      reject(
        new ProgressStoreError(
          `No se pudo acceder al almacenamiento local: ${getErrorMessage(error)}`,
        ),
      );
      return;
    }

    request.onsuccess = (): void => {
      result = request.result;
    };
    request.onerror = (): void =>
      reject(
        new ProgressStoreError(
          `No se pudo completar la operación local: ${getErrorMessage(request.error)}`,
        ),
      );
    transaction.oncomplete = (): void => resolve(result);
    transaction.onerror = (): void =>
      reject(
        new ProgressStoreError(
          `No se pudo confirmar la operación local: ${getErrorMessage(transaction.error)}`,
        ),
      );
    transaction.onabort = (): void =>
      reject(new ProgressStoreError("La operación del almacenamiento local fue cancelada."));
  });

const withDatabase = async <T>(operation: (database: IDBDatabase) => Promise<T>): Promise<T> => {
  const database = await openDatabase();

  try {
    return await operation(database);
  } finally {
    database.close();
  }
};

export const loadProgressSnapshot = (): Promise<ProgressSnapshot | null> =>
  withDatabase(async (database): Promise<ProgressSnapshot | null> => {
    const storedSnapshot = await runStoreRequest<unknown>(database, "readonly", (store) =>
      store.get(PROGRESS_SNAPSHOT_KEY),
    );

    if (storedSnapshot === undefined) {
      return null;
    }

    const validation = validateProgressSnapshot(storedSnapshot);

    if (!validation.valid) {
      throw new ProgressStoreError(
        `El progreso guardado no es compatible: ${validation.errors.join("; ")}`,
      );
    }

    return validation.snapshot;
  });

export const saveProgressSnapshot = (snapshot: ProgressSnapshot): Promise<void> =>
  withDatabase(async (database): Promise<void> => {
    const validation = validateProgressSnapshot(snapshot);

    if (!validation.valid) {
      throw new ProgressStoreError(
        `No se guardó el progreso inválido: ${validation.errors.join("; ")}`,
      );
    }

    await runStoreRequest<IDBValidKey>(database, "readwrite", (store) =>
      store.put(validation.snapshot, PROGRESS_SNAPSHOT_KEY),
    );
  });

export const clearProgressSnapshot = (): Promise<void> =>
  withDatabase(async (database): Promise<void> => {
    await runStoreRequest<undefined>(database, "readwrite", (store) =>
      store.delete(PROGRESS_SNAPSHOT_KEY),
    );
  });
