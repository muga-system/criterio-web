# Criterio Web

Criterio Web es una aplicación educativa para aprender criterio web mediante práctica guiada.
El producto enseña HTML, CSS, JavaScript, TypeScript, DOM y pruebas construyendo una aplicación
que sostiene los mismos criterios que explica.

## Estado

La Fase 1 está completada: el repositorio tiene la base técnica, la configuración de calidad, los
tests automatizados iniciales, una shell Astro con navegación principal, el contenido estático
inicial de los Módulos 01, 02, 03, 04, 05, 06 y 07, el progreso local persistido en IndexedDB, una
vista global de avance y la transferencia portable del snapshot. El motor de aprendizaje todavía
no forma parte de esta fase.

## Requisitos

- Node.js `24.14.0`.
- npm `11` o superior.

La versión de Node se encuentra fijada en `.nvmrc` y en `package.json`.

## Instalación

```bash
npm ci
```

## Scripts

| Comando                 | Propósito                                            |
| ----------------------- | ---------------------------------------------------- |
| `npm run dev`           | Iniciar el servidor de desarrollo de Astro.          |
| `npm run build`         | Ejecutar Astro check y crear el build de producción. |
| `npm run preview`       | Servir localmente el build de Astro.                 |
| `npm run typecheck`     | Ejecutar Astro check sin crear el build.             |
| `npm run check`         | Ejecutar formato, lint, Astro check, tests y build.  |
| `npm run test:e2e`      | Ejecutar el smoke E2E en Chromium, Firefox y WebKit. |
| `npm run test:browser`  | Ejecutar el proyecto de Vitest Browser Mode.         |
| `npm run test:coverage` | Ejecutar tests unitarios con cobertura.              |

## Estructura actual

- `src/app/navigation/`: modelo de rutas y etiquetas de navegación.
- `src/app/modules/`: catálogo mínimo de módulos publicados.
- `src/app/progress/`: contrato, persistencia IndexedDB y token portable del progreso.
- `src/components/`: componentes Astro y futuras islas React.
- `src/layouts/`: shell y layout compartido de la aplicación.
- `src/pages/`: páginas Astro de la shell y contenido publicado de los módulos.
- `src/styles/`: capas CSS, tokens y estilos base.
- `docs/`: decisiones pedagógicas y documentación que no resulta evidente leyendo el código.
- `e2e/`: recorridos end-to-end.

Astro renderiza las páginas y el contenido estático, incluido el contenido de los siete módulos
publicados como Markdown. React se usa en el registro local de lecciones, la práctica del Módulo 06,
la vista global de progreso y la transferencia portable, montados como islas con estado de cliente.
El avance se guarda localmente en IndexedDB y puede moverse mediante el token `CRITERIO1.` sin
backend ni sincronización remota. Las futuras islas se agregarán únicamente cuando una capacidad
necesite estado o comportamiento de cliente.

La iconografía de interfaz usa `@lucide/astro` con imports explícitos por icono. Las nuevas piezas
visuales deben reutilizar Lucide cuando exista un icono adecuado, manteniendo el sistema visual
sobrio y evitando SVG manuales duplicados.

## Recorrido inicial

La pantalla de Inicio presenta el recorrido recomendado: elegir un módulo, leer y cerrar sus
lecciones, revisar la evidencia local y transferir el snapshot si hace falta cambiar de entorno.
El catálogo y las páginas de los siete módulos contienen el material publicado; Progreso muestra el
estado derivado y Importar / Exportar permite moverlo sin backend.

La primera versión no califica respuestas ni transforma las prácticas externas en formularios. La
interfaz registra cierres explícitos de lecciones y reserva la interacción local para la práctica del
Módulo 06, donde el criterio pedagógico necesita observar estado, eventos y representación.

## Versionado y releases

El proyecto se encuentra en desarrollo previo a su primera release y mantiene la versión `0.0.0`
en `package.json`.

Los cambios se registran primero en `CHANGELOG.md`, dentro de `Unreleased`. Cuando exista un hito
publicable:

1. actualizar la versión de `package.json` y `package-lock.json`,
2. mover las entradas correspondientes de `Unreleased` a una versión fechada,
3. crear un commit de release,
4. crear un tag anotado con formato `vX.Y.Z`,
5. publicar `main` y el tag en `origin`.

No se crean tags para cada commit. Se reservan para versiones o hitos que puedan identificarse y
recuperarse de forma estable.

## Licencias

- Código: [MIT](./LICENSE).
- Contenidos didácticos: [CC BY-SA 4.0](./LICENSE-CONTENT.md).
