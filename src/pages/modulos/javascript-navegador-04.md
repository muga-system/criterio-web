---
layout: ../../layouts/ModuleLayout.astro
---

# Módulo 04 · Hacer explícito el comportamiento

JavaScript no debería aparecer como una colección de instrucciones pegadas a la interfaz. Antes de
manipular elementos del navegador, necesitás poder representar una situación, declarar qué datos
intervienen, decidir qué casos son válidos y separar cada transformación en una función
comprensible.

En este módulo vas a practicar una secuencia simple:

```text
situación → datos → decisión → función → verificación
```

El DOM, los eventos y la persistencia quedan fuera de esta unidad. Primero vamos a construir un
modelo de comportamiento que pueda verificarse sin mirar una interfaz.

<h2 id="leccion-01">Lección 01 · Datos que representan una situación</h2>

### Idea principal

El código se vuelve más verificable cuando los datos representan el problema con una forma que se
puede explicar. Un valor simple puede ser suficiente para una decisión puntual; un objeto puede
nombrar propiedades relacionadas; un array puede representar una colección ordenada.

Esta estructura obliga a recordar qué significa cada posición:

```js
const module = ["orientacion-web-01", "Observar antes de construir", 3];
```

Una estructura con nombres hace visible la misma información:

```js
const module = {
  id: "orientacion-web-01",
  title: "Observar antes de construir",
  lessonCount: 3,
};
```

Si el módulo además tiene lecciones, el array puede vivir en una propiedad cuyo nombre explica la
relación:

```js
const module = {
  id: "orientacion-web-01",
  title: "Observar antes de construir",
  lessons: [
    { id: "leccion-01", title: "Del pedido al problema" },
    { id: "leccion-02", title: "Evidencia y criterio" },
  ],
};
```

La forma de los datos también declara límites. `lessons` representa una colección; `title` representa
un texto; `id` representa una identidad estable. Esas decisiones permiten escribir funciones que
reciban información entendible.

### Práctica breve

Elegí una situación pequeña y escribí su modelo de datos:

1. una lista de módulos;
2. una persona que debe recorrerlos;
3. una lección con un estado de avance.

Para cada propiedad, explicá por qué tiene ese nombre, qué tipo de valor contiene y qué cambiaría si
la información dejara de ser suficiente.

### Verificación

La respuesta está encaminada si otra persona puede entender qué representa cada dato sin conocer el
orden en que fue escrito ni interpretar posiciones sin nombre.

<h2 id="leccion-02">Lección 02 · Decisiones y casos límite</h2>

### Idea principal

Una condición debe declarar qué diferencia entre un caso y otro, incluidos los casos que no son los
esperados. Antes de escribir `if`, conviene enumerar los casos que el comportamiento debe reconocer.

Una clasificación simple de avance puede expresarse así:

```js
function getModuleStatus(completedLessons, totalLessons) {
  if (totalLessons <= 0 || completedLessons <= 0) {
    return "not_started";
  }

  if (completedLessons >= totalLessons) {
    return "completed";
  }

  return "in_progress";
}
```

La función separa tres resultados observables. También hace explícito qué ocurre si no hay lecciones
o si todavía no se completó ninguna. Las reglas pueden cambiar, pero no deberían quedar escondidas
en una combinación difícil de explicar.

### Recorrer datos sin perder la intención

Cuando una colección necesita transformarse, la operación debe hacer visible qué se obtiene:

```js
const modules = [
  { id: "orientacion-web-01", title: "Observar antes de construir" },
  { id: "html-semantico-02", title: "Estructurar antes de decorar" },
];

const moduleTitles = modules.map((module) => module.title);
```

El resultado de `moduleTitles` es una nueva colección de títulos. No modifica la lista original ni
depende del DOM.

### Práctica breve

Definí el resultado esperado para estos casos antes de escribir código:

1. cero lecciones completadas;
2. una parte de las lecciones completadas;
3. todas las lecciones completadas;
4. un módulo sin lecciones configuradas.

Después escribí una función que cubra esos casos y explicá qué condición corresponde a cada uno.

### Verificación

La decisión está encaminada si los casos límite aparecen en la explicación y si cada resultado puede
comprobarse con datos de entrada concretos.

<h2 id="leccion-03">Lección 03 · Funciones y estado explícito</h2>

### Idea principal

Una función es más fácil de verificar cuando tiene una responsabilidad clara, recibe datos
identificables y devuelve un resultado observable. Leer datos, decidir un estado y construir un
resumen pueden ser responsabilidades distintas.

Una función puede recibir un objeto y devolver otro resultado sin modificar el original:

```js
function summarizeModule(module) {
  const status = getModuleStatus(module.completedLessons, module.totalLessons);

  return {
    id: module.id,
    title: module.title,
    status,
  };
}
```

El estado también debe ser explícito. Si una práctica representa dos lecciones completadas de tres,
esa información puede estar en un objeto:

```js
const progress = {
  moduleId: "orientacion-web-01",
  completedLessons: 2,
  totalLessons: 3,
};
```

Una actualización puede producir un nuevo valor:

```js
const nextProgress = {
  ...progress,
  completedLessons: 3,
};
```

El objetivo no es prohibir toda mutación en cualquier programa. Es poder reconocer qué dato cambió,
por qué cambió y qué función produjo el siguiente resultado.

### Práctica breve

Tomá una secuencia de instrucciones que mezcle datos, decisiones y resultados. Separala en:

1. una función que clasifique el estado;
2. una función que construya un resumen;
3. un objeto que represente el estado actual;
4. un resultado esperado para un caso normal y uno límite.

No conectes ninguna parte con el DOM ni con eventos.

### Verificación

La estructura está encaminada si cada función tiene una responsabilidad que se puede nombrar y si
el resultado se puede verificar sin ejecutar efectos sobre una interfaz.

<h2 id="practica-integradora">Práctica integradora</h2>

### Situación

Hay una lista de módulos educativos con sus lecciones y estados iniciales. Se necesita producir un
resumen verificable para cada módulo antes de decidir cómo mostrarlo en la interfaz.

### Entrega

Completá esta ficha antes de escribir el código:

```text
Datos que hay que representar:
Colecciones y objetos necesarios:
Estados posibles:
Caso normal:
Caso vacío:
Caso límite:
Función de transformación:
Resultado esperado:
Verificación:
```

Después escribí un modelo de datos y una función que produzca un resumen para cada módulo. El
resultado debe poder inspeccionarse con datos de entrada concretos y no debe modificar el DOM.

### Criterio de revisión

La ficha está completa cuando:

- la forma de los datos se puede explicar sin recurrir a posiciones ambiguas;
- las decisiones cubren casos normales y límites relevantes;
- las funciones tienen responsabilidades acotadas y resultados verificables;
- el estado está representado por datos explícitos;
- la verificación permite detectar un resultado incorrecto sin mirar una interfaz.

## Cierre

Hacer explícito el comportamiento significa poder explicar qué datos existen, qué decisión se toma,
qué función produce el resultado y cómo se comprobará. Esa claridad será necesaria cuando el
comportamiento tenga que conectarse con una interfaz real.

La próxima etapa será estudiar cómo el DOM y los eventos conectan un modelo con una representación
interactiva sin ocultar el estado.
