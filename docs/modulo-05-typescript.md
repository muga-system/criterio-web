# Módulo 05 · Hacer visibles los contratos

Estado: contrato pedagógico v0 con contenido inicial publicado.

Este documento define la unidad curricular y el contenido publicado después de JavaScript explícito.
La ruta está disponible en `src/pages/modulos/typescript-05.md`.

## Identidad

- **Identificador:** `typescript-05`
- **Título:** Hacer visibles los contratos
- **Área:** TypeScript
- **Prerrequisitos:** [Módulo 04 · Hacer explícito el comportamiento](./modulo-04-javascript-navegador.md)
- **Capacidad central:** expresar con tipos qué datos y estados son válidos para que una decisión
  incorrecta sea detectable antes de ejecutar.

## Propósito

JavaScript permite representar un comportamiento, pero muchas suposiciones quedan implícitas hasta
que el programa se ejecuta. TypeScript permite convertir parte de esas suposiciones en contratos
que el editor y el compilador pueden revisar.

El foco no será agregar anotaciones a todo sin criterio. Será elegir dónde un tipo aclara una
decisión, cómo se representan estados válidos y cómo se comprueba un dato que todavía no conocemos.

## Resultado de aprendizaje

Al terminar el módulo, el estudiante debería poder:

- distinguir inferencia útil de una frontera que necesita una anotación explícita;
- describir objetos y funciones con tipos que representen sus responsabilidades;
- restringir estados con uniones de literales en lugar de aceptar cualquier string;
- estrechar una unión mediante una propiedad discriminante o una condición verificable;
- tratar datos desconocidos como `unknown` hasta comprobar su forma;
- reconocer cuándo `any` oculta un contrato que debería hacerse visible.

## Secuencia de lecciones

### 01 · Tipos como contratos

**Idea central:** un tipo útil declara qué forma necesita un dato y qué errores conviene detectar
antes de ejecutar.

El estudiante compara inferencia y anotaciones explícitas, describe objetos y funciones, y decide
qué frontera del programa necesita un contrato visible.

**Práctica propuesta:** transformar el modelo de un módulo educativo del Módulo 04 en tipos para
módulos, lecciones y progreso.

### 02 · Estados válidos y narrowing

**Idea central:** una unión puede representar un conjunto cerrado de estados; una condición debe
reducir ese conjunto antes de acceder a datos específicos.

El estudiante trabaja con uniones de literales y uniones discriminadas. La decisión se expresa con
una propiedad que permita al código reconocer qué variante tiene delante.

**Práctica propuesta:** modelar un resultado de avance con estados válidos y escribir una función
que trate cada estado sin aceptar valores inventados.

### 03 · Fronteras desconocidas

**Idea central:** un dato que llega desde fuera del programa no debe tratarse como confiable solo
porque tiene una forma que esperamos.

El estudiante diferencia un valor conocido en tiempo de compilación de un dato `unknown` que debe
validarse antes de usarlo. También reconoce por qué `any` puede silenciar justamente el error que se
quería detectar.

**Práctica propuesta:** definir una comprobación pequeña para aceptar o rechazar un objeto recibido
como dato desconocido, sin conectar todavía la solución con una red o una interfaz.

## Práctica integradora de cierre

Se entrega el modelo JavaScript de un módulo educativo con lecciones y estados de avance. El
estudiante debe convertirlo en un contrato TypeScript que describa datos válidos y una función de
resumen.

Debe entregar:

1. tipos para módulo, lección y progreso;
2. una unión de estados válidos;
3. una función con entradas y resultado explícitos;
4. una decisión de narrowing para tratar variantes;
5. un caso de dato `unknown` y una validación antes de usarlo;
6. una explicación de qué error dejaría de pasar inadvertido.

La práctica no pedirá DOM, eventos, persistencia, genéricos avanzados ni un framework. La dificultad
estará en convertir supuestos del JavaScript en contratos que se puedan revisar.

## Criterio de finalización

El módulo se considera completo cuando:

- los tipos describen los datos sin duplicar información innecesariamente;
- los estados válidos no aceptan cualquier texto;
- las funciones estrechan sus entradas antes de usar propiedades específicas;
- los datos desconocidos se validan antes de tratarlos como una estructura conocida;
- el estudiante puede explicar qué error previene cada contrato.

No se asignan puntos ni una calificación numérica en esta versión.

## Forma de contenido

La primera versión se publica como contenido estático de Astro, con ejemplos TypeScript,
comparaciones con JavaScript y ejercicios de contratos. No se agrega una isla React porque las
prácticas actuales no requieren edición, compilación ni validación dentro de la aplicación.

## Decisión de implementación v0

La práctica integradora permanece como actividad guiada de análisis y escritura fuera de la
aplicación. No se agrega una isla React ni persistencia porque el objetivo actual es comprobar si el
estudiante puede expresar contratos antes de convertirlos en una herramienta ejecutable.

La decisión se revisará cuando exista evidencia de que editar, compilar o validar TypeScript dentro
de la aplicación mejora la comprensión o la verificación del criterio.

## Límites de esta definición

Este contrato no decide todavía:

- la configuración final del compilador para cada tipo de práctica;
- tipos específicos del DOM y de eventos;
- genéricos avanzados, tipos condicionales o inferencia compleja;
- validación completa de esquemas externos;
- persistencia local o transferencia portable;
- la interfaz local para resolver prácticas.

## Referencias de base

La selección inicial de principios se contrastó con la documentación oficial de [TypeScript sobre
tipos cotidianos](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html),
[narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html),
[tipos de objetos](https://www.typescriptlang.org/docs/handbook/2/objects.html) y
[funciones](https://www.typescriptlang.org/docs/handbook/2/functions.html).
