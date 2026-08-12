import { useEffect, useState, type ReactElement } from "react";
import {
  createEmptyProgressSnapshot,
  hasProgressEvidence,
  type ProgressSnapshot,
} from "../app/progress/progress-model";
import { loadProgressSnapshot, saveProgressSnapshot } from "../app/progress/progress-store";
import { decodeProgressToken, encodeProgressToken } from "../app/progress/progress-transfer";

const initialUpdatedAt = "1970-01-01T00:00:00.000Z";

type TransferMessage = {
  kind: "error" | "success" | "warning";
  text: string;
} | null;

const createInitialSnapshot = (): ProgressSnapshot => createEmptyProgressSnapshot(initialUpdatedAt);

const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error && error.message !== "" ? error.message : fallback;

const copyText = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export default function ProgressTransfer(): ReactElement {
  const [isReady, setIsReady] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [snapshot, setSnapshot] = useState<ProgressSnapshot>(createInitialSnapshot);
  const [exportedToken, setExportedToken] = useState("");
  const [importToken, setImportToken] = useState("");
  const [pendingImport, setPendingImport] = useState<ProgressSnapshot | null>(null);
  const [message, setMessage] = useState<TransferMessage>(null);

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
          setMessage({
            kind: "error",
            text: getErrorMessage(loadError, "No se pudo cargar el progreso local."),
          });
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

  async function generateToken(): Promise<void> {
    if (!isReady || isBusy) {
      return;
    }

    setIsBusy(true);

    try {
      const latestSnapshot = (await loadProgressSnapshot()) ?? snapshot;

      setSnapshot(latestSnapshot);
      setExportedToken(encodeProgressToken(latestSnapshot));
      setMessage({ kind: "success", text: "Token generado. Copialo para llevar tu progreso." });
    } catch (exportError: unknown) {
      setMessage({
        kind: "error",
        text: getErrorMessage(exportError, "No se pudo generar el token portable."),
      });
    } finally {
      setIsBusy(false);
    }
  }

  async function copyToken(): Promise<void> {
    if (!isReady || isBusy || exportedToken === "") {
      return;
    }

    try {
      const copied = await copyText(exportedToken);

      if (copied) {
        setMessage({ kind: "success", text: "Token copiado al portapapeles." });
        return;
      }

      const tokenField = document.querySelector<HTMLTextAreaElement>("#exported-progress-token");

      tokenField?.focus();
      tokenField?.select();
      setMessage({ kind: "success", text: "Token seleccionado. Presioná Ctrl+C para copiarlo." });
    } catch (copyError: unknown) {
      setMessage({
        kind: "error",
        text: getErrorMessage(copyError, "No se pudo copiar el token. Copialo manualmente."),
      });
    }
  }

  async function importProgress(): Promise<void> {
    if (!isReady || isBusy) {
      return;
    }

    const result = decodeProgressToken(importToken);

    if (!result.valid) {
      setMessage({ kind: "error", text: result.error });
      return;
    }

    setIsBusy(true);

    try {
      const latestSnapshot = (await loadProgressSnapshot()) ?? createInitialSnapshot();

      setSnapshot(latestSnapshot);

      if (hasProgressEvidence(latestSnapshot)) {
        setPendingImport(result.snapshot);
        setMessage({
          kind: "warning",
          text: "Ya existe avance local. Confirmá si querés reemplazarlo por el token importado.",
        });
        return;
      }

      await saveProgressSnapshot(result.snapshot);
      setSnapshot(result.snapshot);
      setExportedToken("");
      setImportToken("");
      setMessage({ kind: "success", text: "Progreso importado en este navegador." });
    } catch (importError: unknown) {
      setMessage({
        kind: "error",
        text: getErrorMessage(importError, "No se pudo guardar el progreso importado."),
      });
    } finally {
      setIsBusy(false);
    }
  }

  async function confirmImport(): Promise<void> {
    if (!isReady || isBusy || pendingImport === null) {
      return;
    }

    setIsBusy(true);

    try {
      await saveProgressSnapshot(pendingImport);
      setSnapshot(pendingImport);
      setPendingImport(null);
      setExportedToken("");
      setImportToken("");
      setMessage({
        kind: "success",
        text: "Progreso importado. Reemplazó el snapshot local de este navegador.",
      });
    } catch (importError: unknown) {
      setMessage({
        kind: "error",
        text: getErrorMessage(importError, "No se pudo guardar el progreso importado."),
      });
    } finally {
      setIsBusy(false);
    }
  }

  function cancelImport(): void {
    if (isBusy) {
      return;
    }

    setPendingImport(null);
    setMessage({ kind: "success", text: "No se modificó el progreso local." });
  }

  return (
    <section
      className="app-transfer-overview"
      aria-labelledby="transfer-overview-title"
      data-transfer-ready={isReady ? "true" : "false"}
    >
      <p className="app-placeholder-label">Token portable · CRITERIO1</p>
      <h2 id="transfer-overview-title">Mover el progreso entre navegadores</h2>
      <p className="app-transfer-intro">
        Exportá un snapshot validado como texto y cargalo en otro entorno. El token no está cifrado,
        no tiene firma y no debe tratarse como un secreto.
      </p>
      <div className="app-transfer-grid">
        <article className="app-transfer-panel">
          <p className="app-placeholder-label">Exportar</p>
          <h3>Generar un token</h3>
          <p>El token representa el progreso local disponible en este navegador.</p>
          <button type="button" onClick={generateToken} disabled={isBusy ? true : undefined}>
            {isBusy ? "Procesando…" : "Generar token"}
          </button>
          {exportedToken !== "" && (
            <>
              <label htmlFor="exported-progress-token">Token exportado</label>
              <textarea
                id="exported-progress-token"
                value={exportedToken}
                readOnly
                rows={6}
                spellCheck={false}
              />
              <button type="button" className="app-transfer-secondary" onClick={copyToken}>
                Copiar token
              </button>
            </>
          )}
        </article>
        <article className="app-transfer-panel">
          <p className="app-placeholder-label">Importar</p>
          <h3>Reemplazar el progreso local</h3>
          <p>La importación valida el token y pide confirmación si ya existe avance local.</p>
          <label htmlFor="import-progress-token">Token para importar</label>
          <textarea
            id="import-progress-token"
            value={importToken}
            onChange={(event): void => setImportToken(event.currentTarget.value)}
            rows={6}
            spellCheck={false}
          />
          <button type="button" onClick={importProgress} disabled={isBusy ? true : undefined}>
            Importar y reemplazar
          </button>
        </article>
      </div>
      {pendingImport !== null && (
        <dialog
          className="app-transfer-confirmation"
          open
          aria-labelledby="transfer-confirmation-title"
          aria-describedby="transfer-confirmation-description"
        >
          <p className="app-placeholder-label">Conflicto de progreso local</p>
          <h3 id="transfer-confirmation-title">¿Reemplazar el snapshot de este navegador?</h3>
          <p id="transfer-confirmation-description">
            Ya existe evidencia de avance en este navegador. La versión actual no hace merge
            automático: si confirmás, el token importado reemplazará ese snapshot.
          </p>
          <div className="app-transfer-confirmation-actions">
            <button type="button" onClick={confirmImport} disabled={isBusy ? true : undefined}>
              Reemplazar progreso local
            </button>
            <button
              type="button"
              className="app-transfer-secondary"
              onClick={cancelImport}
              disabled={isBusy ? true : undefined}
            >
              Cancelar
            </button>
          </div>
        </dialog>
      )}
      {message !== null && (
        <p
          className={`app-transfer-message is-${message.kind}`}
          role={message.kind === "error" ? "alert" : "status"}
        >
          {message.text}
        </p>
      )}
    </section>
  );
}
