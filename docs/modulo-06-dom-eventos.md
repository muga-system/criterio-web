# Módulo 06 · Conectar estado y representación

Estado: contrato pedagógico v0 con contenido inicial publicado e isla React local experimental.

Este documento define la unidad curricular y el contenido publicado después de TypeScript. La ruta
está disponible en `src/pages/modulos/dom-eventos-06.md`.

## Identidad

- **Identificador:** `dom-eventos-06`
- **Título:** Conectar estado y representación
- **Área:** DOM y eventos
- **Prerrequisitos:** [Módulo 05 · Hacer visibles los contratos](./modulo-05-typescript.md)
- **Capacidad central:** construir una interacción pequeña que lea eventos, actualice un estado
  explícito y vuelva a representar el resultado con controles nativos accesibles.

## Propósito

El DOM es una representación de un estado, no el lugar donde deberían quedar escondidas todas las
reglas de una aplicación. Los eventos aportan entradas; el modelo decide qué cambia; una función de
render vuelve a representar el resultado.

Esta unidad conecta las decisiones de JavaScript y TypeScript con una interfaz real. También incorpora
una primera isla React local para hacer visible ese flujo, pero el contrato se mantiene independiente
del framework para que el estudiante pueda entender primero el comportamiento del navegador.

## Resultado de aprendizaje

Al terminar el módulo, el estudiante debería poder:

- seleccionar elementos del DOM con un propósito claro;
- conectar eventos mediante `addEventListener` en lugar de handlers inline;
- distinguir el elemento que recibe un evento del elemento que representa la acción;
- usar controles nativos y conservar su interacción con teclado;
- separar estado, actualización y representación en funciones reconocibles;
- verificar que una interacción cambia el estado y que la interfaz refleja el nuevo resultado.

## Secuencia de lecciones

### 01 · El DOM como representación

**Idea central:** el DOM representa una estructura que ya tiene significado; JavaScript debe
seleccionar y actualizar partes concretas sin reconstruir el modelo dentro de nodos arbitrarios.

El estudiante relaciona elementos semánticos con sus responsabilidades y practica selecciones que
fallan de forma visible cuando el elemento esperado no existe.

**Práctica propuesta:** identificar qué elemento representa cada dato de una vista educativa y
definir la mínima operación de actualización necesaria.

### 02 · Eventos y controles nativos

**Idea central:** un evento es una entrada que debe procesarse desde un control que ya expresa su
acción y que puede usarse con teclado.

El estudiante conecta `addEventListener` a botones, enlaces y formularios nativos, reconoce el
objetivo del evento y evita transformar un `div` en un control improvisado.

**Práctica propuesta:** conectar una acción de avance a un botón nativo y verificar la interacción
con puntero y teclado sin handlers inline.

### 03 · Estado, actualización y render

**Idea central:** una interacción predecible puede describirse como entrada → actualización de estado
→ render de la representación.

El estudiante separa el dato actual de la función que lo modifica y de la función que actualiza la
interfaz. La práctica deberá poder explicar qué ocurre cuando se recibe dos veces el mismo evento.

**Práctica propuesta:** construir una vista local de avance que muestre un estado explícito y se
actualice después de una acción, sin persistir todavía el resultado.

## Práctica integradora de cierre

Se entrega una vista educativa con una acción para avanzar y un indicador de estado. El estudiante
debe conectar una representación HTML con un estado local y hacer que una interacción actualice la
vista.

Debe entregar:

1. el estado que la vista necesita representar;
2. el control nativo que recibe la acción;
3. el listener y la entrada que procesa;
4. la función que actualiza el estado;
5. la función que representa el nuevo resultado;
6. una verificación con teclado, evento repetido y estado inicial.

La práctica no pedirá persistencia, transferencia portable, red ni un componente complejo. La isla
experimental demuestra el flujo con un modelo pequeño y verificable, sin convertir todavía ese
estado en progreso del producto.

## Criterio de finalización

El módulo se considera completo cuando:

- la interacción usa un control nativo adecuado y no un elemento genérico con handler inline;
- el listener recibe una entrada identificable y actualiza un estado explícito;
- la representación refleja el estado sin duplicar reglas en el DOM;
- la interacción funciona con teclado y no depende solo del puntero;
- la verificación cubre el estado inicial, una interacción y un evento repetido.

No se asignan puntos ni una calificación numérica en esta versión.

## Forma de contenido

La primera versión se publica como contenido estático de Astro, con ejemplos de DOM y eventos. La
práctica integradora se acompaña de una isla React experimental que mantiene separado el estado de la
representación y no introduce persistencia.

## Decisión de implementación v0

El contenido explicativo permanece estático en Astro. La práctica integradora se implementa en
`src/components/PracticeNavigator.tsx` y se monta con `client:load` desde
`src/layouts/ModuleLayout.astro`. Usa estado local de React para avanzar entre tres lecciones,
actualiza la representación desde ese estado y se reinicia al recargar la página. No persiste datos,
no exporta progreso y no produce todavía un estado de finalización del producto. Esta decisión queda
abierta a revisión después de observar la práctica y definir la evidencia pedagógica que deberá
conservarse.

## Límites de esta definición

Este contrato no decide todavía:

- el esquema de estado que se persistirá;
- IndexedDB, exportación o tokens portables;
- eventos complejos, delegación avanzada o asincronía;
- accesibilidad avanzada más allá de controles y HTML nativos;
- la interfaz local definitiva para resolver prácticas.

## Referencias de base

La selección inicial de principios se contrastó con la documentación de [MDN sobre eventos](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events),
[MDN sobre `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
y [MDN sobre el objeto Event](https://developer.mozilla.org/en-US/docs/Web/API/Event).
