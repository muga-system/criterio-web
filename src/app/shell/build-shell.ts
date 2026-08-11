import { appRoutes, type AppRoute } from "../navigation/routes";
import { buildWorkspace } from "../workspace/build-workspace";

export function buildShell(activeRoute: AppRoute): string {
  return `
    <div class="app-shell">
      <header class="app-topbar">
        <a class="app-brand" href="/" data-route>
          <span class="app-brand-mark" aria-hidden="true">CW</span>
          <span>Criterio Web</span>
        </a>
        <p class="app-topbar-context"><span>Entorno local</span><span>Fase 1</span></p>
      </header>
      <div class="app-layout">
        <aside class="app-sidebar">
          <div>
            <p class="app-sidebar-label">Navegación principal</p>
            <nav aria-label="Navegación principal">
              <ul class="app-nav-list">
                ${buildNavigation(appRoutes, activeRoute)}
              </ul>
            </nav>
          </div>
          <p class="app-sidebar-note">Aprender criterio web mediante práctica guiada.</p>
        </aside>
        <main class="app-workspace" id="workspace" tabindex="-1" aria-labelledby="workspace-title">
          ${buildWorkspace(activeRoute)}
        </main>
      </div>
    </div>
  `;
}

function buildNavigation(routes: readonly AppRoute[], activeRoute: AppRoute): string {
  return routes
    .map((route, index) => {
      const isActive = route.id === activeRoute.id;
      const activeAttributes = isActive ? ' aria-current="page"' : "";

      return `
        <li>
          <a class="app-nav-link${isActive ? " is-active" : ""}" href="${route.path}" data-route${activeAttributes}>
            <span class="app-nav-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
            <span>${route.label}</span>
          </a>
        </li>
      `;
    })
    .join("");
}
