import { expect, test } from "@playwright/test";

test("muestra la shell inicial de Criterio Web", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Inicio · Criterio Web");
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

test("abre el primer módulo y conserva Módulos como sección activa", async ({ page }) => {
  await page.goto("/modulos");

  const moduleLink = page.getByRole("link", {
    name: "Abrir Módulo 01 · Observar antes de construir",
    exact: true,
  });

  await expect(moduleLink).toBeVisible();
  await moduleLink.click();

  await expect(page).toHaveURL("http://127.0.0.1:4173/modulos/orientacion-web-01");
  await expect(
    page.getByRole("heading", { name: "Módulo 01 · Observar antes de construir", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Módulos", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    page.getByRole("heading", { name: "Lección 01 · Del pedido al problema", exact: true }),
  ).toBeVisible();

  const moduleContents = page.getByRole("navigation", { name: "En este módulo" });

  await expect(moduleContents).toBeVisible();
  await expect(
    moduleContents.getByRole("link", { name: "Lección 01 · Del pedido al problema" }),
  ).toHaveAttribute("href", "#leccion-01");
  await moduleContents.getByRole("link", { name: "Lección 01 · Del pedido al problema" }).click();
  await expect(page).toHaveURL("http://127.0.0.1:4173/modulos/orientacion-web-01#leccion-01");
});

test("abre el segundo módulo desde el catálogo", async ({ page }) => {
  await page.goto("/modulos");

  await expect(page.locator(".app-module-card")).toHaveCount(4);
  await page
    .getByRole("link", { name: "Abrir Módulo 02 · Estructurar antes de decorar", exact: true })
    .click();

  await expect(page).toHaveURL("http://127.0.0.1:4173/modulos/html-semantico-02");
  await expect(
    page.getByRole("heading", { name: "Módulo 02 · Estructurar antes de decorar", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Módulos", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    page.getByRole("heading", {
      name: "Lección 01 · Significado antes que apariencia",
      exact: true,
    }),
  ).toBeVisible();
});

test("abre el tercer módulo desde el catálogo", async ({ page }) => {
  await page.goto("/modulos");

  await page
    .getByRole("link", {
      name: "Abrir Módulo 03 · Componer sin pelear con la estructura",
      exact: true,
    })
    .click();

  await expect(page).toHaveURL("http://127.0.0.1:4173/modulos/css-composicion-03");
  await expect(
    page.getByRole("heading", {
      name: "Módulo 03 · Componer sin pelear con la estructura",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Módulos", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    page.getByRole("heading", { name: "Lección 01 · Cascada y conflictos", exact: true }),
  ).toBeVisible();
});

test("abre el cuarto módulo desde el catálogo", async ({ page }) => {
  await page.goto("/modulos");

  await page
    .getByRole("link", {
      name: "Abrir Módulo 04 · Hacer explícito el comportamiento",
      exact: true,
    })
    .click();

  await expect(page).toHaveURL("http://127.0.0.1:4173/modulos/javascript-navegador-04");
  await expect(
    page.getByRole("heading", {
      name: "Módulo 04 · Hacer explícito el comportamiento",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Módulos", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    page.getByRole("heading", {
      name: "Lección 01 · Datos que representan una situación",
      exact: true,
    }),
  ).toBeVisible();
});
