# Criterio Web

Criterio Web es una aplicación educativa para aprender criterio web mediante práctica guiada.
El producto enseña HTML, CSS, JavaScript, TypeScript, DOM y pruebas construyendo una aplicación
que sostiene los mismos criterios que explica.

## Estado

La Fase 1 está completada: el repositorio tiene la base técnica, la configuración de calidad, los
tests automatizados iniciales, una shell Astro con navegación principal y el contenido estático
inicial de los Módulos 01, 02, 03, 04 y 05. La persistencia, las prácticas interactivas y el motor de
aprendizaje todavía no forman parte de esta fase.

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
- `src/components/`: componentes Astro y futuras islas React.
- `src/layouts/`: shell y layout compartido de la aplicación.
- `src/pages/`: páginas Astro de la shell y contenido publicado de los módulos.
- `src/styles/`: capas CSS, tokens y estilos base.
- `docs/`: decisiones pedagógicas y documentación que no resulta evidente leyendo el código.
- `e2e/`: recorridos end-to-end.

Astro renderiza las páginas y el contenido estático, incluido el Módulo 01 publicado como Markdown.
React queda integrado para futuras islas interactivas, que se agregarán únicamente cuando una
capacidad necesite estado o comportamiento de cliente. La arquitectura se ampliará por capacidades
en las fases siguientes.

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
