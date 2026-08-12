---
layout: ../../layouts/ModuleLayout.astro
---

# Módulo 06 · Conectar estado y representación

El DOM es una representación de un estado, no el lugar donde deberían quedar escondidas todas las
reglas de una aplicación. Los eventos aportan entradas; el modelo decide qué cambia; una función de
render vuelve a representar el resultado.

En este módulo vas a practicar una secuencia simple:

```text
estructura → evento → estado → render → verificación
```

Esta unidad conecta JavaScript y TypeScript con una interfaz real. La explicación usa herramientas
nativas del navegador; la práctica integradora se acompaña al final con una isla React local que
hace visible el mismo flujo sin reemplazar sus conceptos.

<h2 id="leccion-01">Lección 01 · El DOM como representación</h2>

### Idea principal

El DOM representa una estructura HTML que ya tiene significado. JavaScript puede seleccionar partes
concretas y actualizar su representación, pero el modelo de datos no debería depender de encontrar
un nodo arbitrario para saber qué está pasando.

Una vista puede declarar qué parte representa cada dato:

```html
<article data-module-id="orientacion-web-01">
  <h1 data-module-title>Observar antes de construir</h1>
  <p data-module-status>Contenido inicial</p>
</article>
```

La selección puede ser específica y comprobable:

```ts
const status = document.querySelector<HTMLElement>("[data-module-status]");

if (!status) {
  throw new Error("No se encontró el estado del módulo");
}

status.textContent = "En curso";
```

La actualización modifica la representación, pero no convierte ese texto en el modelo completo del
progreso. El estado debe seguir existiendo en una estructura que se pueda leer y verificar.

### Práctica breve

Para una vista educativa, identificá:

1. qué elemento representa el título;
2. qué elemento representa el estado;
3. qué elemento representa la acción;
4. qué dato debería existir fuera del DOM para poder volver a renderizar la vista.

Proponé un selector para cada elemento y explicá qué debería ocurrir si uno no existe.

### Verificación

La respuesta está encaminada si relaciona cada dato con un elemento concreto y no usa el contenido
actual del DOM como única fuente de verdad para el estado.

<h2 id="leccion-02">Lección 02 · Eventos y controles nativos</h2>

### Idea principal

Un evento es una entrada que debe procesarse desde un control que ya expresa su acción y que puede
usarse con teclado. Un botón no debería reemplazarse por un `div` con un `onclick` improvisado.

Este HTML declara una acción nativa:

```html
<button type="button" id="next-lesson">Siguiente lección</button>
```

El listener se conecta desde JavaScript o TypeScript:

```ts
const nextLessonButton = document.querySelector<HTMLButtonElement>("#next-lesson");

nextLessonButton?.addEventListener("click", handleNextLesson);
```

La acción también puede ejecutarse con teclado porque el elemento elegido ya tiene el comportamiento
interactivo correspondiente. Un handler inline mezclaría estructura y comportamiento, además de
volver más difícil localizar qué código responde al evento.

### Entender el objetivo del evento

Cuando hay más de un control, cada listener debe poder explicar qué acción recibe. El objeto del
evento aporta información sobre la entrada, pero no debería reemplazar el estado de la aplicación.

```ts
function handleAction(event: Event): void {
  const target = event.currentTarget;

  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  console.log(`Acción recibida: ${target.id}`);
}
```

El objetivo es reconocer el control que registró la acción y separar esa entrada de la función que
decidirá qué cambia.

### Práctica breve

Revisá estas alternativas para una acción de avance:

1. `<div onclick="advance()">Continuar</div>`;
2. `<button type="button" id="continue">Continuar</button>` con `addEventListener`;
3. un enlace que no tiene destino y solo depende de JavaScript.

Elegí la alternativa adecuada, justificá la decisión y proponé una verificación con teclado.

### Verificación

La decisión está encaminada si usa un control nativo, conecta el listener fuera del HTML y puede
explicar qué entrada recibe la función sin depender solamente del puntero.

<h2 id="leccion-03">Lección 03 · Estado, actualización y render</h2>

### Idea principal

Una interacción predecible puede describirse como entrada → actualización de estado → render de la
representación. El evento no debería contener todas las reglas ni modificar varios nodos sin una
decisión de estado reconocible.

Un estado mínimo puede ser explícito:

```ts
type ViewState = {
  currentLesson: number;
  totalLessons: number;
};

let state: ViewState = {
  currentLesson: 1,
  totalLessons: 3,
};
```

La representación se actualiza desde ese estado:

```ts
const progressLabel = document.querySelector<HTMLElement>("[data-progress-label]");

function render(nextState: ViewState): void {
  if (!progressLabel) {
    return;
  }

  progressLabel.textContent = `Lección ${nextState.currentLesson} de ${nextState.totalLessons}`;
}
```

La acción modifica el estado y vuelve a renderizar:

```ts
function advance(): void {
  if (state.currentLesson >= state.totalLessons) {
    return;
  }

  state = {
    ...state,
    currentLesson: state.currentLesson + 1,
  };

  render(state);
}
```

Si se recibe dos veces el mismo evento después de completar la última lección, la condición evita
que el estado supere su límite. La regla vive en la actualización, no en una serie de cambios
aislados del DOM.

### Práctica breve

Separá una interacción de avance en cuatro partes:

1. estado inicial;
2. listener que recibe la acción;
3. función que calcula el siguiente estado;
4. función que representa el resultado.

Describí qué debería pasar si se activa la acción una vez, dos veces y cuando ya se alcanzó el
último estado válido.

### Verificación

La estructura está encaminada si el estado se puede leer sin inspeccionar el DOM, si la actualización
es acotada y si la representación siempre se reconstruye a partir del resultado actual.

<h2 id="practica-integradora">Práctica integradora</h2>

### Situación

Una vista educativa tiene un indicador de avance y una acción para pasar a la siguiente lección. La
estructura HTML ya está definida, pero todavía no existe comportamiento en el navegador.

### Entrega

Completá esta ficha antes de escribir el código:

```text
Estado inicial:
Elemento que representa el estado:
Control nativo de la acción:
Evento que se procesa:
Actualización de estado:
Render del resultado:
Caso de límite:
Verificación con teclado:
```

Después escribí una implementación pequeña con `addEventListener`, un estado explícito y una
función de render. No uses handlers inline, no persistas el resultado y no conectes la práctica con
una red.

### Criterio de revisión

La ficha está completa cuando:

- la interacción usa un control nativo adecuado;
- el listener recibe una entrada identificable y actualiza un estado explícito;
- la representación refleja el estado sin duplicar las reglas en el DOM;
- la interacción funciona con teclado y no depende solo del puntero;
- la verificación cubre el estado inicial, una interacción y un evento repetido.

## Cierre

Conectar estado y representación significa poder explicar qué entrada recibió la interfaz, qué dato
cambió y por qué la vista refleja ese nuevo resultado. La isla React local muestra esa relación con
un estado explícito y una representación derivada, pero no reemplaza la necesidad de comprenderla.

La próxima etapa será revisar qué evidencia produce la práctica y si necesita una ampliación. La
persistencia del recorrido pertenece a la aplicación, no al problema que la práctica propone
resolver.
