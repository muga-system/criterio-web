import { expect, test } from "@playwright/test";

test("muestra la shell inicial de Criterio Web", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Criterio Web");
  await expect(page.getByRole("heading", { name: "Criterio Web" })).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("Fase 1: base técnica preparada.");
});
