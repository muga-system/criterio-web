import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

const typedConfigs = tseslint.configs.recommendedTypeChecked.map((config) => ({
  ...config,
  files: ["**/*.{ts,tsx,mts,cts}"],
}));

export default tseslint.config(
  {
    ignores: ["coverage", "dist", "node_modules", "playwright-report", "test-results"],
  },
  eslint.configs.recommended,
  ...typedConfigs,
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
    },
  },
);
