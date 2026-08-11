import { resolveRoute } from "./navigation/routes";
import { buildShell } from "./shell/build-shell";

export function bootstrap(documentReference: Document): void {
  const appRoot = documentReference.querySelector<HTMLDivElement>("#app");

  if (!appRoot) {
    throw new Error("No se encontró el contenedor principal de la aplicación.");
  }

  const windowReference = documentReference.defaultView;

  if (!windowReference) {
    throw new Error("No se encontró el contexto de ventana de la aplicación.");
  }

  const render = (): void => {
    const activeRoute = resolveRoute(windowReference.location.pathname);

    appRoot.replaceChildren();
    appRoot.insertAdjacentHTML("afterbegin", buildShell(activeRoute));

    appRoot.querySelectorAll<HTMLAnchorElement>("a[data-route]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        const targetPath = link.getAttribute("href");

        if (!targetPath) {
          return;
        }

        event.preventDefault();
        windowReference.history.pushState({}, "", targetPath);
        render();
        appRoot.querySelector<HTMLElement>("#workspace")?.focus();
      });
    });
  };

  windowReference.addEventListener("popstate", render);
  render();
}
