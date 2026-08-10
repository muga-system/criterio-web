import { buildShell } from "./shell/build-shell";

export function bootstrap(documentReference: Document): void {
  const appRoot = documentReference.querySelector<HTMLDivElement>("#app");

  if (!appRoot) {
    throw new Error("No se encontró el contenedor principal de la aplicación.");
  }

  appRoot.replaceChildren();
  appRoot.insertAdjacentHTML("afterbegin", buildShell());
}
