import { describe, expect, it } from "vitest";
import { buildShell } from "./build-shell";

describe("buildShell", () => {
  it("construye una shell semántica con el nombre del producto y su estado", () => {
    const shell = buildShell();

    expect(shell).toContain("<main");
    expect(shell).toContain("Criterio Web");
    expect(shell).toContain('role="status"');
  });
});
