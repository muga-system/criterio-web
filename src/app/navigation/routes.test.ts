import { describe, expect, it } from "vitest";
import { appRoutes } from "./routes";

describe("appRoutes", () => {
  it("declara las cuatro rutas principales en orden de navegación", () => {
    expect(appRoutes.map((route) => route.path)).toEqual([
      "/",
      "/modulos",
      "/progreso",
      "/transferencia",
    ]);

    expect(appRoutes.map((route) => route.label)).toEqual([
      "Inicio",
      "Módulos",
      "Progreso",
      "Importar / Exportar",
    ]);
  });

  it("mantiene identificadores únicos para cada sección", () => {
    expect(new Set(appRoutes.map((route) => route.id)).size).toBe(appRoutes.length);
  });
});
