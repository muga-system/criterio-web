import type { AppRoute } from "../navigation/routes";

export function buildWorkspace(route: AppRoute): string {
  return `
    <header class="app-workspace-header">
      <p class="app-workspace-kicker">${route.eyebrow}</p>
      <h1 id="workspace-title">${route.title}</h1>
      <p class="app-workspace-description">${route.description}</p>
    </header>
    <section class="app-placeholder" aria-labelledby="placeholder-title">
      <p class="app-placeholder-label">Vista placeholder</p>
      <h2 id="placeholder-title">${route.placeholderTitle}</h2>
      <p>${route.placeholderDescription}</p>
    </section>
  `;
}
