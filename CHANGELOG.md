# Changelog

Todos los cambios relevantes del proyecto se documentan en este archivo.

El formato sigue la idea de Keep a Changelog. El trabajo que todavía no pertenece a una release se
registra en `Unreleased`.

## [Unreleased]

### Agregado

- Base Vite con TypeScript estricto y módulos ES.
- Configuración plana de ESLint con linting tipado.
- Prettier, Stylelint y scripts de validación.
- Vitest, Vitest Browser Mode y Playwright.
- Smoke E2E inicial para Chromium, Firefox y WebKit.

### Cambiado

- Migración de la shell y las rutas principales a Astro con integración React preparada para islas.
- Reemplazo de la shell HTML mínima por páginas Astro con navegación y vistas placeholder.

### Documentado

- Definición del modelo pedagógico inicial y del criterio de finalización de módulos.
- Contrato pedagógico preliminar del Módulo 01: Observar antes de construir.
- Decisión de mantener la práctica integradora del Módulo 01 como actividad estática en esta fase.
- Contrato pedagógico preliminar del Módulo 02: Estructurar antes de decorar.
- Publicación estática del contenido inicial para las tres lecciones y la práctica integradora del
  Módulo 01.
- Publicación estática del contenido inicial para las tres lecciones y la práctica integradora del
  Módulo 02.

### Eliminado

- Entry point y router manual de Vite usados por la shell inicial.
