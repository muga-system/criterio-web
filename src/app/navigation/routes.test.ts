import { describe, expect, it } from "vitest";
import { appRoutes, resolveRoute } from "./routes";

describe("resolveRoute", () => {
  it("resuelve las rutas principales de la aplicación", () => {
    expect(resolveRoute("/")).toBe(appRoutes[0]);
    expect(resolveRoute("/modulos").id).toBe("modules");
    expect(resolveRoute("/progreso").id).toBe("progress");
    expect(resolveRoute("/transferencia").id).toBe("transfer");
  });

  it("vuelve a Inicio cuando la ruta todavía no existe", () => {
    expect(resolveRoute("/modulos/introduccion")).toBe(appRoutes[0]);
  });
});
