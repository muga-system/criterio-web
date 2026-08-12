import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const seedProgressSnapshot = async (page: Page, snapshot: unknown): Promise<void> => {
  await page.evaluate(
    (value) =>
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.open("criterio-web-progress", 1);

        request.onupgradeneeded = (): void => {
          const database = request.result;

          if (!database.objectStoreNames.contains("snapshots")) {
            database.createObjectStore("snapshots");
          }
        };
        request.onerror = (): void =>
          reject(request.error ?? new Error("No se pudo abrir IndexedDB."));
        request.onsuccess = (): void => {
          const database = request.result;
          const transaction = database.transaction("snapshots", "readwrite");

          transaction.objectStore("snapshots").put(value, "criterio-web");
          transaction.oncomplete = (): void => {
            database.close();
            resolve();
          };
          transaction.onerror = (): void =>
            reject(transaction.error ?? new Error("Error de IndexedDB."));
        };
      }),
    snapshot,
  );
};

test("muestra la shell inicial de Criterio Web", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Inicio · Criterio Web");
  await expect(page.getByRole("heading", { name: "Inicio" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Elegí un módulo para comenzar" })).toBeVisible();
  const skipLink = page.getByRole("link", { name: "Saltar al contenido principal" });

  await expect(skipLink).toHaveAttribute("href", "#workspace-content");
  await skipLink.focus();
  await skipLink.press("Enter");
  await expect(page.locator("#workspace-content")).toBeFocused();
  await expect(page.getByRole("link", { name: "Ver módulos publicados" })).toHaveAttribute(
    "href",
    "/modulos",
  );
  await expect(page.getByRole("navigation", { name: "Navegación principal" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Inicio", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("mantiene las rutas publicadas sin violaciones de accesibilidad", async ({ page }) => {
  test.setTimeout(120_000);

  const routes = [
    "/",
    "/modulos",
    "/progreso",
    "/transferencia",
    "/modulos/orientacion-web-01",
    "/modulos/html-semantico-02",
    "/modulos/css-composicion-03",
    "/modulos/javascript-navegador-04",
    "/modulos/typescript-05",
    "/modulos/dom-eventos-06",
    "/modulos/pruebas-07",
  ];

  for (const route of routes) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations, `Se detectaron violaciones en ${route}`).toEqual([]);
  }
});

test("permite recorrer las secciones principales y conserva el estado activo", async ({ page }) => {
  await page.goto("/");

  const routes = [
    {
      name: "Módulos",
      path: "/modulos",
      heading: "Módulos",
      description:
        "Explorá los siete módulos publicados para practicar cómo observar, construir y verificar decisiones web.",
    },
    {
      name: "Progreso",
      path: "/progreso",
      heading: "Progreso",
      description:
        "Consultá el estado de avance local de tu recorrido y la evidencia registrada por cada módulo.",
    },
    {
      name: "Importar / Exportar",
      path: "/transferencia",
      heading: "Importar / Exportar",
      description:
        "Transferí tu progreso entre entornos mediante un token portable validado localmente.",
    },
  ];

  for (const route of routes) {
    const link = page.getByRole("link", { name: route.name, exact: true });

    await link.click();
    await expect(page).toHaveURL(`http://127.0.0.1:4173${route.path}`);
    await expect(page.getByRole("heading", { name: route.heading, exact: true })).toBeVisible();
    await expect(page.locator(".app-workspace-description")).toHaveText(route.description);
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
  await expect(page.locator(".app-sidebar-frame .app-scrollbar")).toBeHidden();
  await expect(page.locator(".app-workspace-frame .app-scroll-icon")).toHaveCount(2);
  await expect(page.locator(".app-workspace-frame .app-scrollbar-region")).toHaveCSS(
    "border-left-width",
    "1px",
  );
  await expect(page.locator(".app-workspace-frame .app-scroll-track")).toHaveCSS(
    "border-left-width",
    "0px",
  );
  await expect(page.locator(".app-workspace-frame .app-scrollbar button").first()).toHaveCSS(
    "height",
    "16px",
  );
  await expect(page.locator(".app-workspace-frame .app-scrollbar button").first()).toHaveCSS(
    "border-bottom-width",
    "1px",
  );
  await expect(page.locator(".app-workspace-frame .app-scrollbar button").last()).toHaveCSS(
    "border-top-width",
    "1px",
  );
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
  await expect(thumb).toHaveCSS("left", "0px");
  await expect(thumb).toHaveCSS("right", "0px");
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

  await scrollbar.focus();
  await scrollbar.press("Home");
  await expect.poll(() => workspace.evaluate((element) => element.scrollTop)).toBe(0);

  await scrollbar.press("ArrowDown");
  await expect.poll(() => workspace.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);

  const maxScroll = await workspace.evaluate(
    (element) => element.scrollHeight - element.clientHeight,
  );

  await scrollbar.press("End");
  await expect
    .poll(() => workspace.evaluate((element) => element.scrollTop))
    .toBeGreaterThanOrEqual(maxScroll - 2);
});

test("mantiene la shell usable en un viewport angosto", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/modulos");

  const metrics = await page.locator("#workspace-scroll-viewport").evaluate((workspace) => ({
    bodyScrollWidth: document.body.scrollWidth,
    bodyClientWidth: document.body.clientWidth,
    documentScrollWidth: document.documentElement.scrollWidth,
    documentClientWidth: document.documentElement.clientWidth,
    viewportHeight: window.innerHeight,
    shellHeight:
      document.querySelector<HTMLElement>(".app-shell")?.getBoundingClientRect().height ?? 0,
    workspaceClientHeight: workspace.clientHeight,
    workspaceScrollHeight: workspace.scrollHeight,
  }));

  expect(metrics.bodyScrollWidth).toBe(metrics.bodyClientWidth);
  expect(metrics.documentScrollWidth).toBe(metrics.documentClientWidth);
  expect(Math.abs(metrics.shellHeight - metrics.viewportHeight)).toBeLessThan(1);
  expect(metrics.workspaceScrollHeight).toBeGreaterThan(metrics.workspaceClientHeight);
  await expect(page.getByRole("link", { name: "Importar / Exportar", exact: true })).toBeVisible();
  await expect(page.locator(".app-sidebar-frame .app-scrollbar")).toBeHidden();
  await expect(page.getByRole("scrollbar", { name: "Área de trabajo" })).toBeVisible();
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

test("permite registrar el cierre de una lección estática y conservarlo", async ({ page }) => {
  await page.goto("http://127.0.0.1:4173/modulos/orientacion-web-01");

  const lessonProgress = page.getByRole("region", { name: "Marcar lecciones recorridas" });
  const firstLesson = lessonProgress.locator('[data-lesson-id="leccion-01"]');

  await expect(lessonProgress).toHaveAttribute("data-progress-ready", "true");
  await expect(firstLesson).toHaveAttribute("data-progress-status", "not_started");
  await firstLesson.getByRole("button", { name: "Marcar como completada" }).click();
  await expect(firstLesson).toHaveAttribute("data-progress-status", "completed");
  await expect(firstLesson.getByRole("button", { name: "Lección completada" })).toBeDisabled();

  await page.reload();
  const persistedLessonProgress = page.getByRole("region", {
    name: "Marcar lecciones recorridas",
  });
  const persistedFirstLesson = persistedLessonProgress.locator('[data-lesson-id="leccion-01"]');

  await expect(persistedLessonProgress).toHaveAttribute("data-progress-ready", "true");
  await expect(persistedFirstLesson).toHaveAttribute("data-progress-status", "completed");

  await page.goto("http://127.0.0.1:4173/progreso");
  const overview = page.getByRole("region", { name: "Estado del recorrido" });
  const moduleCard = overview.locator('[data-module-id="orientacion-web-01"]');

  await expect(moduleCard).toHaveAttribute("data-progress-status", "in_progress");
  await expect(moduleCard).toContainText("1 de 3 lecciones");
  await expect(moduleCard).toContainText("Práctica fuera de la app");
});

test("abre el segundo módulo desde el catálogo", async ({ page }) => {
  await page.goto("/modulos");

  await expect(page.locator(".app-module-card")).toHaveCount(7);
  await expect(page.locator('.app-module-card[data-practice-tracking="external"]')).toHaveCount(6);
  await expect(page.locator('.app-module-card[data-practice-tracking="interactive"]')).toHaveCount(
    1,
  );
  await expect(
    page.locator('.app-module-card[data-practice-tracking="external"]').first(),
  ).toContainText("Práctica fuera de la app");
  await expect(
    page.locator('.app-module-card[data-practice-tracking="interactive"]'),
  ).toContainText("Práctica interactiva");
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
  await expect(practice).toHaveAttribute("data-progress-ready", "true");
  await expect(practice).toHaveAttribute("data-practice-completed", "false");
  await expect(practice.getByRole("status")).toHaveText("Lección 1 de 3");

  const advance = practice.getByRole("button", { name: "Siguiente lección" });

  await advance.click();
  await expect(practice.getByRole("status")).toHaveText("Lección 2 de 3");
  await advance.click();
  await expect(practice.getByRole("status")).toHaveText("Lección 3 de 3");
  await advance.click();
  await expect(practice.getByRole("status")).toHaveText("Lección 3 de 3 · Completada");
  await expect(practice).toHaveAttribute("data-practice-completed", "true");
  await expect(practice.getByRole("button", { name: "Práctica completada" })).toBeDisabled();

  await page.reload();
  const persistedPractice = page.getByRole("region", {
    name: "Práctica local: avanzar por lecciones",
  });

  await expect(persistedPractice).toHaveAttribute("data-progress-ready", "true");
  await expect(persistedPractice.getByRole("status")).toHaveText("Lección 3 de 3 · Completada");
  await expect(persistedPractice).toHaveAttribute("data-practice-completed", "true");

  await page.goto("http://127.0.0.1:4173/progreso");
  const overview = page.getByRole("region", { name: "Estado del recorrido" });

  await expect(overview).toHaveAttribute("data-progress-ready", "true");
  await expect(overview.locator(".app-progress-card")).toHaveCount(7);
  await expect(overview.locator('[data-module-id="dom-eventos-06"]')).toHaveAttribute(
    "data-progress-status",
    "completed",
  );

  await page.goto("http://127.0.0.1:4173/transferencia");
  const transfer = page.getByRole("region", { name: "Mover el progreso entre navegadores" });

  await expect(transfer).toHaveAttribute("data-transfer-ready", "true");
  await transfer.getByRole("button", { name: "Generar token" }).click();
  const exportedToken = transfer.locator("#exported-progress-token");

  await expect(exportedToken).toHaveValue(/CRITERIO1\./);
  await transfer.getByRole("button", { name: "Copiar token" }).click();
  await expect(transfer.getByRole("status")).toHaveText(
    /Token (copiado al portapapeles|seleccionado\. Presioná Ctrl\+C para copiarlo\.)/,
  );
  const token = await exportedToken.inputValue();

  await transfer.locator("#import-progress-token").fill(token);
  await transfer.getByRole("button", { name: "Importar y reemplazar" }).click();
  const conflictDialog = transfer.getByRole("dialog", {
    name: "¿Reemplazar el snapshot de este navegador?",
  });

  await expect(conflictDialog).toBeVisible();
  await expect(transfer.getByRole("status")).toHaveText(
    "Ya existe avance local. Confirmá si querés reemplazarlo por el token importado.",
  );
  await conflictDialog.getByRole("button", { name: "Cancelar" }).click();
  await expect(conflictDialog).toBeHidden();
  await expect(transfer.getByRole("status")).toHaveText("No se modificó el progreso local.");

  await page.goto("http://127.0.0.1:4173/modulos/dom-eventos-06");
  const resetPractice = page.getByRole("region", {
    name: "Práctica local: avanzar por lecciones",
  });

  await expect(resetPractice).toHaveAttribute("data-progress-ready", "true");
  await resetPractice.getByRole("button", { name: "Reiniciar" }).click();
  await expect(resetPractice.getByRole("status")).toHaveText("Lección 1 de 3");
  await expect(resetPractice).toHaveAttribute("data-practice-completed", "false");

  await page.reload();
  const clearedPractice = page.getByRole("region", {
    name: "Práctica local: avanzar por lecciones",
  });

  await expect(clearedPractice).toHaveAttribute("data-progress-ready", "true");
  await expect(clearedPractice.getByRole("status")).toHaveText("Lección 1 de 3");
  await expect(clearedPractice).toHaveAttribute("data-practice-completed", "false");

  await page.goto("http://127.0.0.1:4173/transferencia");
  const transferAfterReset = page.getByRole("region", {
    name: "Mover el progreso entre navegadores",
  });

  await expect(transferAfterReset).toHaveAttribute("data-transfer-ready", "true");
  await transferAfterReset.locator("#import-progress-token").fill(token);
  await transferAfterReset.getByRole("button", { name: "Importar y reemplazar" }).click();
  await expect(transferAfterReset.getByRole("status")).toHaveText(
    "Progreso importado en este navegador.",
  );

  await page.goto("http://127.0.0.1:4173/progreso");
  const importedOverview = page.getByRole("region", { name: "Estado del recorrido" });

  await expect(importedOverview).toHaveAttribute("data-progress-ready", "true");
  await expect(importedOverview.locator('[data-module-id="dom-eventos-06"]')).toHaveAttribute(
    "data-progress-status",
    "completed",
  );
});

test("bloquea la práctica si el snapshot local requiere migración", async ({ page }) => {
  await page.goto("http://127.0.0.1:4173/modulos/dom-eventos-06");
  await seedProgressSnapshot(page, { schemaVersion: 2 });
  await page.reload();

  const practice = page.getByRole("region", {
    name: "Práctica local: avanzar por lecciones",
  });

  await expect(practice).toHaveAttribute("data-progress-ready", "true");
  await expect(practice.getByRole("alert")).toHaveText(/requiere migración/);
  await expect(practice).toHaveAttribute("data-progress-error", "true");
  await expect(practice).toHaveAttribute("data-progress-advance-disabled", "true");
  await expect(practice.getByRole("button", { name: "Siguiente lección" })).toBeDisabled();

  await page.goto("http://127.0.0.1:4173/progreso");
  const overview = page.getByRole("region", { name: "Estado del recorrido" });

  await expect(overview).toHaveAttribute("data-progress-ready", "true");
  await expect(overview).toHaveAttribute("data-progress-error", "true");
  await expect(overview.getByRole("alert")).toHaveText(/requiere migración/);
  await expect(overview.locator(".app-progress-summary")).toHaveCount(0);
  await expect(overview.locator(".app-progress-card")).toHaveCount(0);

  await page.goto("http://127.0.0.1:4173/modulos/dom-eventos-06");
  const recoverablePractice = page.getByRole("region", {
    name: "Práctica local: avanzar por lecciones",
  });
  await expect(recoverablePractice).toHaveAttribute("data-progress-ready", "true");

  const reset = recoverablePractice.getByRole("button", { name: "Reiniciar" });

  await expect(reset).toBeEnabled();
  await reset.click();
  await expect(recoverablePractice.getByRole("alert")).toHaveCount(0);
  await expect(recoverablePractice.getByRole("status")).toHaveText("Lección 1 de 3");
  await expect(
    recoverablePractice.getByRole("button", { name: "Siguiente lección" }),
  ).toBeEnabled();
});

test("permite recuperar un snapshot ilegible desde transferencia", async ({ page }) => {
  await page.goto("http://127.0.0.1:4173/transferencia");
  await seedProgressSnapshot(page, { schemaVersion: 2 });
  await page.reload();

  const transfer = page.getByRole("region", { name: "Mover el progreso entre navegadores" });

  await expect(transfer).toHaveAttribute("data-transfer-ready", "true");
  await expect(transfer.getByRole("alert")).toHaveText(/requiere migración/);

  const token = await page.evaluate(() => {
    const snapshot = {
      schemaVersion: 1,
      courseId: "criterio-web",
      contentVersion: 1,
      updatedAt: "1970-01-01T00:00:00.000Z",
      modules: {},
    };
    const payload = btoa(JSON.stringify(snapshot))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/u, "");

    return `CRITERIO1.${payload}`;
  });

  await transfer.locator("#import-progress-token").fill(token);
  await transfer.getByRole("button", { name: "Importar y reemplazar" }).click();

  const recoveryDialog = transfer.getByRole("dialog", {
    name: "¿Reemplazar el snapshot que no se pudo leer?",
  });

  await expect(recoveryDialog).toBeVisible();
  await expect(transfer.getByRole("status")).toHaveText(
    "No se pudo leer el snapshot local. Confirmá si querés reemplazarlo por el token importado.",
  );
  await recoveryDialog.getByRole("button", { name: "Reemplazar progreso local" }).click();
  await expect(transfer.getByRole("status")).toHaveText(
    "Progreso importado. Reemplazó el snapshot local de este navegador.",
  );

  await page.goto("http://127.0.0.1:4173/progreso");
  const overview = page.getByRole("region", { name: "Estado del recorrido" });

  await expect(overview).toHaveAttribute("data-progress-ready", "true");
  await expect(overview.getByRole("alert")).toHaveCount(0);
  await expect(overview.locator(".app-progress-card")).toHaveCount(7);
});

test("abre el séptimo módulo desde el catálogo", async ({ page }) => {
  await page.goto("/modulos");

  await expect(page.locator(".app-module-card")).toHaveCount(7);
  await page
    .getByRole("link", {
      name: "Abrir Módulo 07 · Verificar antes de cerrar",
      exact: true,
    })
    .click();

  await expect(page).toHaveURL("http://127.0.0.1:4173/modulos/pruebas-07");
  await expect(
    page.getByRole("heading", {
      name: "Módulo 07 · Verificar antes de cerrar",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Módulos", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    page.getByRole("heading", {
      name: "Lección 01 · Del criterio a una afirmación verificable",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "En este módulo" }).getByRole("link", {
      name: "Lección 03 · Recorrer la experiencia completa",
    }),
  ).toHaveAttribute("href", "#leccion-03");
});
