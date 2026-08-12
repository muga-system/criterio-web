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
- Tipos estrictos y funciones puras para validar snapshots y derivar el estado de progreso.
- Transiciones puras e idempotentes para iniciar y completar lecciones y prácticas.
- Conexión de la isla React del Módulo 06 con las transiciones de progreso en memoria.
- Persistencia local del progreso mediante IndexedDB, con validación al cargar y limpieza al reiniciar.
- Vista global de progreso con estados derivados y enlaces a los siete módulos publicados.
- Registro local explícito del cierre de lecciones en los módulos sin práctica interactiva
  específica.
- Token portable `CRITERIO1.` con exportación, copia, validación e importación local del snapshot.
- Confirmación contextual antes de reemplazar progreso local durante una importación; la v1 no hace
  merge automático entre snapshots.
- Clasificación explícita de snapshots compatibles, pendientes de migración o inválidos antes de
  cargarlos o importarlos.
- Bloqueo de nuevas transiciones cuando la práctica no puede cargar su snapshot local y recuperación
  mediante reinicio explícito.
- El overview de progreso deja de mostrar un estado vacío ficticio cuando falla la lectura local.
- La transferencia permite recuperar un snapshot ilegible mediante una importación válida y
  confirmada explícitamente.

### Cambiado

- Inicio ahora ofrece un enlace directo al catálogo de módulos publicados.
- La shell incorpora un enlace de salto accesible hacia el workspace principal.
- Actualizado el copy de Inicio y Módulos para reflejar los contenidos publicados y el progreso
  local disponible.
- Alineada la página publicada del Módulo 06 con la isla React local y la persistencia ya
  implementadas.
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

- Actualización del README para reflejar persistencia IndexedDB, progreso global y token portable.
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
- Contrato pedagógico preliminar del Módulo 07: Verificar antes de cerrar.
- Publicación estática del contenido inicial para las tres lecciones y la práctica integradora del
  Módulo 07.
- Actualización del modelo pedagógico para reflejar los siete módulos publicados y el próximo límite
  de revisión de evidencia.
- Revisión de evidencia que mantiene las prácticas de los Módulos 01–05 y 07 fuera de interfaces
  interactivas, y reserva React para la práctica del Módulo 06.
- Actualización de la hoja de ruta pedagógica para reflejar el contrato de progreso, transferencia y
  recuperación ya implementado.
- Contrato v0 del modelo de evidencia y progreso local, previo a IndexedDB y la transferencia
  portable.

### Eliminado

- Entry point y router manual de Vite usados por la shell inicial.
