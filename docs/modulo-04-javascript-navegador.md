# Módulo 04 · Hacer explícito el comportamiento

Estado: contrato pedagógico v0 con contenido inicial publicado.

Este documento define la unidad curricular y el contenido publicado después de CSS y composición. La
ruta está disponible en `src/pages/modulos/javascript-navegador-04.md`.

## Identidad

- **Identificador:** `javascript-navegador-04`
- **Título:** Hacer explícito el comportamiento
- **Área:** JavaScript en el navegador
- **Prerrequisitos:** [Módulo 03 · Componer sin pelear con la estructura](./modulo-03-css-composicion.md)
- **Capacidad central:** modelar un comportamiento pequeño con datos, decisiones y funciones cuyo
  resultado pueda explicarse y verificarse.

## Propósito

JavaScript no debería aparecer como una colección de instrucciones pegadas a la interfaz. Antes de
manipular elementos del navegador, el estudiante necesita poder representar una situación, declarar
qué datos intervienen, decidir qué casos son válidos y separar cada transformación en una función
comprensible.

El foco será el comportamiento explícito. El DOM, los eventos y la persistencia se reservarán para
unidades posteriores, cuando ya exista un modelo que conectar con la interfaz.

## Resultado de aprendizaje

Al terminar el módulo, el estudiante debería poder:

- distinguir valores simples de estructuras de datos compuestas;
- elegir entre un array y un objeto según la información que necesita representar;
- formular condiciones para casos normales, alternativos y límites;
- recorrer datos sin ocultar qué transformación se está realizando;
- escribir funciones con entradas, resultado y responsabilidad acotada;
- identificar qué estado existe y qué cambios lo transforman sin depender de efectos implícitos.

## Secuencia de lecciones

### 01 · Datos que representan una situación

**Idea central:** el código se vuelve más verificable cuando los datos representan el problema con
una forma que se puede explicar.

El estudiante compara valores simples, objetos con propiedades y arrays de elementos. También
reconoce cuándo una estructura mezcla responsabilidades o fuerza a interpretar posiciones sin
nombre.

**Práctica propuesta:** modelar una lista pequeña de módulos educativos y decidir qué información
pertenece al módulo y qué información pertenece a cada lección.

### 02 · Decisiones y casos límite

**Idea central:** una condición debe declarar qué diferencia entre un caso y otro, incluidos los
casos que no son los esperados.

El estudiante trabaja con `if`, `else`, comparaciones y recorridos. La práctica debe evitar
condiciones largas que mezclen lectura de datos, decisión y transformación en una sola expresión.

**Práctica propuesta:** clasificar un conjunto de unidades como no iniciadas, en curso o completas
con reglas explícitas y casos límite.

### 03 · Funciones y estado explícito

**Idea central:** una función es más fácil de verificar cuando tiene una responsabilidad clara,
recibe datos identificables y devuelve un resultado observable.

El estudiante separa una transformación de sus datos de entrada y reconoce qué valor representa el
estado actual. La unidad no conectará todavía ese estado con el DOM ni con eventos.

**Práctica propuesta:** convertir una secuencia de instrucciones mezcladas en funciones pequeñas y
proponer una forma de verificar cada resultado.

## Práctica integradora de cierre

Se entrega una lista de módulos educativos con lecciones y estados iniciales. El estudiante debe
proponer un modelo de datos y una función que produzca un resumen verificable para cada módulo, sin
modificar el DOM.

Debe entregar:

1. la forma de los datos elegida y su justificación;
2. las reglas para clasificar el estado;
3. una función de transformación con entradas y resultado claros;
4. al menos un caso normal, un caso vacío y un caso límite;
5. una verificación de los resultados esperados.

La práctica no pedirá eventos, selectores, `localStorage`, IndexedDB ni llamadas de red. La
dificultad estará en hacer explícito el modelo antes de conectarlo con una interfaz.

## Criterio de finalización

El módulo se considera completo cuando:

- la forma de los datos se puede explicar sin recurrir a posiciones ambiguas;
- las decisiones cubren casos normales y límites relevantes;
- las funciones tienen responsabilidades acotadas y resultados verificables;
- el estado está representado por datos explícitos y no por efectos laterales ocultos;
- la verificación permite detectar un resultado incorrecto sin mirar una interfaz.

No se asignan puntos ni una calificación numérica en esta versión.

## Forma de contenido

La primera versión se publica como contenido estático de Astro, con ejemplos de JavaScript, tablas
de datos y ejercicios de razonamiento. No se agrega una isla React porque las prácticas actuales no
requieren ejecución, comparación ni validación dentro de la aplicación.

## Decisión de implementación v0

La práctica integradora permanece como actividad guiada de análisis y escritura fuera de la
aplicación. No se agrega una isla React ni persistencia porque el objetivo actual es comprobar si el
estudiante puede modelar un comportamiento antes de conectarlo con una interfaz.

La decisión se revisará cuando exista evidencia de que ejecutar, comparar o validar JavaScript dentro
de la aplicación mejora la comprensión o la verificación del criterio.

## Límites de esta definición

Este contrato no decide todavía:

- la conexión entre JavaScript y el DOM;
- el modelo de eventos y sus estados de interacción;
- TypeScript y sus contratos de tipos;
- persistencia local o transferencia de datos;
- asincronía, red o módulos de servidor;
- la interfaz local para resolver prácticas.

## Referencias de base

La selección inicial de principios se contrastó con la documentación de [MDN sobre la introducción a
JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction),
[MDN sobre la visión general del lenguaje](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Language_overview)
y [MDN sobre funciones](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).
