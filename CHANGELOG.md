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
- Integración de `@lucide/astro` para la iconografía de interfaz.

### Cambiado

- Migración de la shell y las rutas principales a Astro con integración React preparada para islas.
- Reemplazo de la shell HTML mínima por páginas Astro con navegación y vistas placeholder.
- Shell fijada al viewport con sidebar estable y desplazamiento interno del workspace.
- Reemplazo del scrollbar nativo por un control propio con track, thumb, flechas y arrastre.
- Ajuste de los extremos del scrollbar con iconos tipo Lucide y ocultamiento automático cuando no
  hay overflow.
- Continuidad de la línea del track desde el extremo superior hasta el inferior del scrollbar.
- Ajuste del thumb para tocar la línea, separadores para las zonas de control y botones cuadrados.
- Extensión del thumb al ancho completo del track para eliminar el espacio lateral restante.
- Reemplazo de los SVG manuales del scrollbar por componentes `ChevronUp` y `ChevronDown` de Lucide.

### Documentado

- Definición del modelo pedagógico inicial y del criterio de finalización de módulos.
- Contrato pedagógico preliminar del Módulo 01: Observar antes de construir.
- Decisión de mantener la práctica integradora del Módulo 01 como actividad estática en esta fase.
- Contrato pedagógico preliminar del Módulo 02: Estructurar antes de decorar.
- Publicación estática del contenido inicial para las tres lecciones y la práctica integradora del
  Módulo 01.
- Publicación estática del contenido inicial para las tres lecciones y la práctica integradora del
  Módulo 02.
- Decisión de mantener la práctica integradora del Módulo 02 como actividad estática en esta fase.
- Contrato pedagógico preliminar del Módulo 03: Componer sin pelear con la estructura.
- Publicación estática del contenido inicial para las tres lecciones y la práctica integradora del
  Módulo 03.
- Decisión de mantener la práctica integradora del Módulo 03 como actividad estática en esta fase.
- Contrato pedagógico preliminar del Módulo 04: Hacer explícito el comportamiento.
- Publicación estática del contenido inicial para las tres lecciones y la práctica integradora del
  Módulo 04.
- Decisión de mantener la práctica integradora del Módulo 04 como actividad estática en esta fase.
- Contrato pedagógico preliminar del Módulo 05: Hacer visibles los contratos.
- Publicación estática del contenido inicial para las tres lecciones y la práctica integradora del
  Módulo 05.
- Decisión de mantener la práctica integradora del Módulo 05 como actividad estática en esta fase.
- Contrato pedagógico preliminar del Módulo 06: Conectar estado y representación.
- Publicación estática del contenido inicial para las tres lecciones y la práctica integradora del
  Módulo 06.
- Decisión de mantener la práctica integradora del Módulo 06 como actividad estática en esta fase y
  reservarla como candidata para una isla React.
- Primera isla React experimental para la práctica local del Módulo 06, con estado efímero y
  navegación verificable entre sus tres lecciones.

### Eliminado

- Entry point y router manual de Vite usados por la shell inicial.
