# Criterio Web

Criterio Web es una aplicación educativa para aprender criterio web mediante práctica guiada.
El producto enseña HTML, CSS, JavaScript, TypeScript, DOM y pruebas construyendo una aplicación
que sostiene los mismos criterios que explica.

## Estado

La Fase 1 está completada: el repositorio tiene la base técnica, la configuración de calidad, los
tests automatizados iniciales y una shell Astro con navegación principal y vistas placeholder.
El contenido curricular, la persistencia y el motor de aprendizaje todavía no forman parte de esta
fase.

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
| `npm run check`         | Ejecutar formato, lint, Astro check, tests y build.  |
| `npm run test:e2e`      | Ejecutar el smoke E2E en Chromium, Firefox y WebKit. |
| `npm run test:browser`  | Ejecutar el proyecto de Vitest Browser Mode.         |
| `npm run test:coverage` | Ejecutar tests unitarios con cobertura.              |

## Estructura inicial

- `src/app/navigation/`: modelo de rutas y etiquetas de navegación.
- `src/components/`: componentes Astro y futuras islas React.
- `src/layouts/`: shell y layout compartido de la aplicación.
- `src/pages/`: páginas Astro correspondientes a las rutas principales.
- `src/styles/`: capas CSS, tokens y estilos base.
- `e2e/`: recorridos end-to-end.

Astro renderiza las páginas y el contenido estático. React queda integrado para futuras islas
interactivas, que se agregarán únicamente cuando una capacidad necesite estado o comportamiento de
cliente. La arquitectura se ampliará por capacidades en las fases siguientes.

## Licencias

- Código: [MIT](./LICENSE).
- Contenidos didácticos: [CC BY-SA 4.0](./LICENSE-CONTENT.md).
