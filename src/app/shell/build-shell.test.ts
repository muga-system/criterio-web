import { describe, expect, it } from "vitest";
import { appRoutes } from "../navigation/routes";
import { buildShell } from "./build-shell";

describe("buildShell", () => {
  it("construye la shell con la navegación y la sección activa", () => {
    const shell = buildShell(appRoutes[0]);

    expect(shell).toContain('<main class="app-workspace"');
    expect(shell).toContain("Criterio Web");
    expect(shell).toContain('href="/modulos"');
    expect(shell).toContain('aria-current="page"');
    expect(shell).toContain("La ruta de aprendizaje empieza acá");
  });
});
