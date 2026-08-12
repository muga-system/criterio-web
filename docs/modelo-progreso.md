# Modelo de evidencia y progreso local

Estado: contrato de datos v0 con validación, derivación, transiciones puras, persistencia local en
IndexedDB y token portable v1 para la práctica del Módulo 06.

Este documento define qué evidencia mínima debe conservar Criterio Web para reconstruir el estado
del recorrido sin convertir la lectura en una falsa señal de aprendizaje. La vista global de progreso
y la transferencia portable se apoyan en este contrato y su persistencia local.

## Objetivo

El progreso debe responder tres preguntas concretas:

1. ¿Qué lecciones fueron recorridas de forma explícita?
2. ¿La práctica integradora fue iniciada y verificada?
3. ¿Qué módulo puede considerarse completo según su criterio de finalización?

No se guardan puntos, rankings, rachas ni una puntuación numérica. La evidencia describe hechos del
recorrido; no intenta inferir comprensión a partir del tiempo que una página permaneció abierta o de
la posición del scroll.

## Principios

- **Evidencia explícita:** solo una acción o verificación definida por el producto puede cambiar un
  estado.
- **Estado derivable:** el estado del módulo se calcula a partir de lecciones y práctica para evitar
  dos fuentes de verdad que puedan contradecirse.
- **Identificadores estables:** se usan los `id` del catálogo y de las lecciones, no títulos que
  podrían cambiar por una decisión editorial.
- **Local-first:** el snapshot pertenece al navegador y no necesita una cuenta, un servidor ni una
  identidad externa.
- **Mínimo necesario:** no se guardan respuestas textuales, trazas de navegación, contenido de
  formularios ni datos personales en este contrato.
- **Versionado explícito:** el formato de datos y la versión del contenido viajan junto con la
  evidencia para poder detectar incompatibilidades futuras.

## Hechos que cuentan como evidencia

### Lección

Una lección puede tener uno de estos estados:

- `not_started`: no existe una acción explícita de inicio;
- `in_progress`: la persona inició la lección, pero todavía no confirmó su cierre;
- `completed`: la persona confirmó el cierre de la lección según la interfaz que se defina.

Abrir una ruta o desplazar el workspace no marca una lección como completada. Los módulos sin una
práctica interactiva específica ofrecen una acción local explícita para confirmar el cierre, sin
usar el scroll como medición implícita. El Módulo 06 registra esos cierres dentro de su práctica
integradora.

### Práctica integradora

La práctica conserva dos hechos independientes:

- `started`: la persona inició la práctica;
- `verified`: la verificación de cierre fue superada.

`verified` solo puede ser `true` después de `started`. Completar una práctica no significa que exista
una calificación: significa que la evidencia definida por el módulo fue verificada.

## Snapshot mínimo

El snapshot es un documento completo y reemplazable. Su forma conceptual es:

```json
{
  "schemaVersion": 1,
  "courseId": "criterio-web",
  "contentVersion": 1,
  "updatedAt": "2026-08-12T00:00:00.000Z",
  "modules": {
    "dom-eventos-06": {
      "lessons": {
        "leccion-01": "completed",
        "leccion-02": "completed",
        "leccion-03": "in_progress"
      },
      "practice": {
        "started": true,
        "verified": false
      }
    }
  }
}
```

El ejemplo no fija la API ni el almacenamiento. Fija el límite del dato que la aplicación necesita
para reconstruir el recorrido.

### Campos del documento

- `schemaVersion`: versión del formato del snapshot, independiente de la versión de la aplicación;
- `courseId`: identifica el recorrido al que pertenece la evidencia;
- `contentVersion`: identifica la versión del catálogo y de los criterios contra los que se obtuvo;
- `updatedAt`: fecha ISO de la última modificación del snapshot;
- `modules`: mapa indexado por el identificador estable del módulo;
- `lessons`: mapa de estados por identificador estable de lección;
- `practice`: hechos mínimos de la práctica integradora.

No se agrega un identificador de usuario o dispositivo. La transferencia portable debe poder moverse
entre navegadores sin asociarse a una identidad externa.

## Derivación del estado del módulo

El campo `status` no se guarda en el snapshot. Se deriva con estas reglas:

```text
not_started
└─ ninguna lección está in_progress o completed

in_progress
└─ existe cualquier evidencia, pero todavía no se cumple el criterio de finalización

external_practice_pending
└─ todas las lecciones obligatorias están completed
   y la práctica integradora ocurre fuera de la aplicación

completed
└─ todas las lecciones obligatorias están completed
   y practice.started es true
   y practice.verified es true
```

Si el catálogo declara una lección obligatoria nueva, un snapshot anterior no debe marcar el módulo
como `completed` hasta que esa lección tenga evidencia. La aplicación debe comparar el snapshot con
el catálogo actual, no confiar en un estado guardado de una versión anterior.

Cuando todas las lecciones de un módulo con práctica externa están completas, el estado se deriva
como `external_practice_pending`. Esto indica que la aplicación no puede verificar el cierre de la
práctica sin inventar evidencia local.

Las transiciones locales de práctica solo están habilitadas para módulos con práctica interactiva.
Un módulo externo no puede iniciar ni verificar su práctica mediante el contrato de progreso.

## Invariantes que debe validar la implementación

Antes de persistir o importar un snapshot, la aplicación deberá rechazar o normalizar datos que
violen estas reglas:

- `schemaVersion` y `contentVersion` son números enteros positivos;
- `courseId` coincide con `criterio-web`;
- cada `moduleId` pertenece al catálogo conocido o se conserva como dato no migrado explícito;
- cada `lessonId` pertenece al módulo correspondiente;
- los estados de lección pertenecen a `not_started`, `in_progress` o `completed`;
- `practice.verified` no puede ser `true` si `practice.started` es `false`;
- `updatedAt` es una fecha ISO válida;
- no se aceptan propiedades necesarias con tipos arbitrarios o valores negativos.

La validación debe ocurrir en la frontera de entrada, especialmente antes de importar un token
portable. No se debe usar `any` para convertir un dato externo en un snapshot confiable.

## Compatibilidad y migración

`schemaVersion` cambia cuando cambia la forma del snapshot. `contentVersion` cambia cuando cambia el
catálogo o el criterio de finalización que da sentido a la evidencia.

Una versión de contenido nueva puede conservar módulos y lecciones conocidos, pero no debe ocultar
que una evidencia quedó obsoleta. La futura interfaz deberá distinguir entre:

- snapshot compatible y utilizable;
- snapshot válido pero pendiente de migración;
- snapshot inválido que no puede incorporarse.

La migración debe ser una transformación explícita y comprobable. No se resolverá descartando campos
desconocidos de forma silenciosa.

La implementación actual ya clasifica la entrada en tres estados: `compatible` cuando puede usarse
sin transformación, `migration_required` cuando declara una versión positiva distinta de la actual,
e `invalid` cuando no cumple la forma o las invariantes del contrato. La v1 no registra migradores
porque todavía no existe una versión histórica que transformar: los snapshots de versión futura se
rechazan sin modificar el almacenamiento local.

Una práctica con un error de progreso bloquea nuevas transiciones para no sobrescribir evidencia
incompatible por accidente. `Reiniciar` funciona como recuperación explícita y elimina el snapshot
local solo después de una acción intencional.

La vista global es de solo lectura: si no puede cargar el snapshot, conserva el error visible y no
presenta el snapshot vacío inicial como si fuera el estado real del recorrido.

## Token portable v1

El formato textual actual es `CRITERIO1.<payload-base64url>`. El payload es el JSON UTF-8 del
snapshot validado, codificado en base64url para poder copiarlo como una sola línea.

- `CRITERIO1` identifica el producto y la versión del formato del token;
- el snapshot conserva `schemaVersion`, `courseId`, `contentVersion`, `updatedAt` y `modules`;
- exportar no modifica el progreso local;
- importar valida prefijo, decodificación y snapshot antes de proponer un reemplazo local;
- si ya existe evidencia local, la interfaz pide confirmación contextual y cancelar conserva el
  snapshot actual;
- si el snapshot local no se puede leer, una importación válida puede recuperarlo solo después de
  una confirmación contextual;
- la v1 no hace merge automático: confirmar reemplaza el snapshot local completo por el importado;
- el token no está cifrado ni firmado y no debe tratarse como un secreto.

## Límites de este contrato

Este documento no decide todavía:

- cómo se registra la evidencia específica de cada futura práctica interactiva.

## Próximo paso

Las transiciones puras para registrar inicio y cierre de lecciones y práctica están definidas en
`src/app/progress/progress-model.ts`, conectadas al registro genérico
`src/components/LessonProgressNavigator.tsx` y a la práctica del Módulo 06, persistidas por
`src/app/progress/progress-store.ts` y transferibles desde `src/app/progress/progress-transfer.ts`.
El siguiente bloque podrá revisar migraciones concretas cuando cambie el contrato y evaluar si una
futura versión necesita merge explícito entre snapshots válidos.
