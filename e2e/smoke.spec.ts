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

test("mantiene la shell fija y desplaza el workspace", async ({ page }) => {
  await page.goto("/modulos");

  const metrics = await page.locator("#workspace-scroll-viewport").evaluate((workspace) => ({
    bodyScrollHeight: document.body.scrollHeight,
    documentScrollHeight: document.documentElement.scrollHeight,
    sidebarWidth: document.querySelector<HTMLElement>(".app-sidebar")?.offsetWidth ?? 0,
    viewportHeight: window.innerHeight,
    workspaceClientHeight: workspace.clientHeight,
    workspaceScrollHeight: workspace.scrollHeight,
  }));

  expect(metrics.bodyScrollHeight).toBe(metrics.viewportHeight);
  expect(metrics.documentScrollHeight).toBe(metrics.viewportHeight);
  expect(metrics.sidebarWidth).toBe(240);
  expect(metrics.workspaceScrollHeight).toBeGreaterThan(metrics.workspaceClientHeight);

  const scrollbar = page.getByRole("scrollbar", { name: "Área de trabajo" });

  await expect(scrollbar).toBeVisible();
  await expect(scrollbar).toHaveAttribute("aria-valuemax", /[1-9]/);
  await expect(page.locator(".app-workspace-frame .app-scroll-thumb")).toHaveCSS(
    "border-radius",
    "0px",
  );

  const workspace = page.locator("#workspace-scroll-viewport");
  const scrollTopBeforeArrow = await workspace.evaluate((element) => element.scrollTop);

  await page.getByRole("button", { name: "Desplazar Área de trabajo hacia abajo" }).click();
  await expect
    .poll(() =>
      page.locator("#workspace-scroll-viewport").evaluate((workspace) => workspace.scrollTop),
    )
    .toBeGreaterThan(scrollTopBeforeArrow);

  const scrollTopBeforeDrag = await workspace.evaluate((element) => element.scrollTop);
  const thumb = page.locator(".app-workspace-frame .app-scroll-thumb");
  const thumbBounds = await thumb.boundingBox();

  if (thumbBounds === null) {
    throw new Error("No se encontró el thumb del scrollbar del workspace.");
  }

  await page.mouse.move(
    thumbBounds.x + thumbBounds.width / 2,
    thumbBounds.y + thumbBounds.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    thumbBounds.x + thumbBounds.width / 2,
    thumbBounds.y + thumbBounds.height / 2 + 120,
  );
  await page.mouse.up();
  await expect
    .poll(() => workspace.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(scrollTopBeforeDrag);
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

  await expect(page.locator(".app-module-card")).toHaveCount(6);
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

test("abre el quinto módulo desde el catálogo", async ({ page }) => {
  await page.goto("/modulos");

  await page
    .getByRole("link", {
      name: "Abrir Módulo 05 · Hacer visibles los contratos",
      exact: true,
    })
    .click();

  await expect(page).toHaveURL("http://127.0.0.1:4173/modulos/typescript-05");
  await expect(
    page.getByRole("heading", {
      name: "Módulo 05 · Hacer visibles los contratos",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Módulos", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    page.getByRole("heading", { name: "Lección 01 · Tipos como contratos", exact: true }),
  ).toBeVisible();
});

test("abre el sexto módulo desde el catálogo", async ({ page }) => {
  await page.goto("/modulos");

  await page
    .getByRole("link", {
      name: "Abrir Módulo 06 · Conectar estado y representación",
      exact: true,
    })
    .click();

  await expect(page).toHaveURL("http://127.0.0.1:4173/modulos/dom-eventos-06");
  await expect(
    page.getByRole("heading", {
      name: "Módulo 06 · Conectar estado y representación",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Módulos", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    page.getByRole("heading", { name: "Lección 01 · El DOM como representación", exact: true }),
  ).toBeVisible();

  const practice = page.getByRole("region", {
    name: "Práctica local: avanzar por lecciones",
  });

  await expect(practice).toBeVisible();
  await expect(practice.getByRole("status")).toHaveText("Lección 1 de 3");

  const advance = practice.getByRole("button", { name: "Siguiente lección" });

  await advance.click();
  await expect(practice.getByRole("status")).toHaveText("Lección 2 de 3");
  await advance.click();
  await expect(practice.getByRole("status")).toHaveText("Lección 3 de 3 · Completada");
  await expect(practice.getByRole("button", { name: "Práctica completada" })).toBeDisabled();
  await practice.getByRole("button", { name: "Reiniciar" }).click();
  await expect(practice.getByRole("status")).toHaveText("Lección 1 de 3");
});
