import { expect, test } from "@playwright/test";

test("muestra la shell inicial de Criterio Web", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Criterio Web");
  await expect(page.getByRole("heading", { name: "Inicio" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Navegación principal" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Inicio", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("permite recorrer las secciones principales y conserva el estado activo", async ({ page }) => {
  await page.goto("/");

  const routes = [
    { name: "Módulos", path: "/modulos", heading: "Módulos" },
    { name: "Progreso", path: "/progreso", heading: "Progreso" },
    { name: "Importar / Exportar", path: "/transferencia", heading: "Importar / Exportar" },
  ];

  for (const route of routes) {
    const link = page.getByRole("link", { name: route.name, exact: true });

    await link.click();
    await expect(page).toHaveURL(`http://127.0.0.1:4173${route.path}`);
    await expect(page.getByRole("heading", { name: route.heading, exact: true })).toBeVisible();
    await expect(link).toHaveAttribute("aria-current", "page");
  }

  await page.goBack();
  await expect(page).toHaveURL("http://127.0.0.1:4173/progreso");
  await expect(page.getByRole("link", { name: "Progreso", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
});
