# Criterio Web

Criterio Web es una aplicación educativa para aprender criterio web mediante práctica guiada.
El producto enseña HTML, CSS, JavaScript, TypeScript, DOM y pruebas construyendo una aplicación
que sostiene los mismos criterios que explica.

## Estado

La Fase 1 está completada: el repositorio tiene la base técnica, la configuración de calidad, los
tests automatizados iniciales y una shell HTML mínima. El contenido curricular, la navegación, la
persistencia y el motor de aprendizaje todavía no forman parte de esta fase.

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
| `npm run dev`           | Iniciar el servidor de desarrollo.                   |
| `npm run build`         | Crear el build de producción.                        |
| `npm run preview`       | Servir localmente el build.                          |
| `npm run check`         | Ejecutar formato, lint, typecheck, tests y build.    |
| `npm run test:e2e`      | Ejecutar el smoke E2E en Chromium, Firefox y WebKit. |
| `npm run test:browser`  | Ejecutar el proyecto de Vitest Browser Mode.         |
| `npm run test:coverage` | Ejecutar tests unitarios con cobertura.              |

## Estructura inicial

- `src/app/`: composición inicial de la aplicación y shell.
- `src/styles/`: capas CSS, tokens y estilos base.
- `e2e/`: recorridos end-to-end.
- `upload/`: material de planificación local; no forma parte de la aplicación.

La arquitectura se ampliará por capacidades en las fases siguientes. No se agregan features de
aprendizaje ni persistencia antes de cerrar la navegación y el shell accesible.

## Licencias

- Código: [MIT](./LICENSE).
- Contenidos didácticos: [CC BY-SA 4.0](./LICENSE-CONTENT.md).
