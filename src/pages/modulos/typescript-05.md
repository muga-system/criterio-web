---
layout: ../../layouts/ModuleLayout.astro
---

# Módulo 05 · Hacer visibles los contratos

JavaScript permite representar un comportamiento, pero muchas suposiciones quedan implícitas hasta
que el programa se ejecuta. TypeScript permite convertir parte de esas suposiciones en contratos
que el editor y el compilador pueden revisar.

En este módulo vas a practicar una secuencia simple:

```text
supuesto → tipo → narrowing → resultado → verificación
```

El foco no será agregar anotaciones a todo sin criterio. Será elegir dónde un tipo aclara una
decisión, cómo se representan estados válidos y cómo se comprueba un dato que todavía no conocemos.

<h2 id="leccion-01">Lección 01 · Tipos como contratos</h2>

### Idea principal

Un tipo útil declara qué forma necesita un dato y qué errores conviene detectar antes de ejecutar.
La anotación no reemplaza el razonamiento: lo hace visible para que el editor y el compilador puedan
ayudar a revisarlo.

Este objeto de JavaScript comunica una intención, pero no declara qué propiedades son obligatorias:

```js
const module = {
  id: "orientacion-web-01",
  title: "Observar antes de construir",
  lessons: [],
};
```

En TypeScript se puede nombrar ese contrato:

```ts
type Lesson = {
  id: string;
  title: string;
};

type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

const module: Module = {
  id: "orientacion-web-01",
  title: "Observar antes de construir",
  lessons: [],
};
```

Si falta `title` o si `lessons` recibe un valor que no es una colección de lecciones, el contrato deja
de cumplirse antes de ejecutar el programa.

### Inferencia y fronteras

TypeScript puede inferir tipos a partir de valores claros:

```ts
const lessonCount = 3;
const moduleTitle = "Observar antes de construir";
```

No hace falta anotar cada variable. La pregunta útil es dónde una anotación documenta una frontera o
evita una suposición importante: datos recibidos por una función, objetos compartidos entre módulos
o resultados que deben mantener una forma estable.

### Práctica breve

Tomá el modelo de un módulo educativo y definí tipos para:

1. un módulo;
2. una lección;
3. un resumen que solo muestre identidad, título y cantidad de lecciones.

Para cada propiedad, explicá por qué el tipo elegido representa una regla del problema y no solo una
decisión de sintaxis.

### Verificación

La respuesta está encaminada si otra persona puede reconocer qué forma debe tener cada dato y qué
error impediría construir un valor válido.

<h2 id="leccion-02">Lección 02 · Estados válidos y narrowing</h2>

### Idea principal

Una unión de literales puede representar un conjunto cerrado de estados. En lugar de aceptar
cualquier texto, el tipo declara qué valores forman parte del modelo:

```ts
type ProgressStatus = "not_started" | "in_progress" | "completed";

type Progress = {
  moduleId: string;
  status: ProgressStatus;
  completedLessons: number;
  totalLessons: number;
};
```

Un valor como `"paused"` no pertenece a este contrato. Si el dominio necesita ese estado, la
decisión debe incorporarse de forma explícita y revisar las funciones que lo utilizan.

### Reducir una unión

Una unión discriminada comparte una propiedad que permite reconocer qué variante está presente:

```ts
type SummaryResult =
  { status: "ok"; title: string; progress: ProgressStatus } | { status: "error"; message: string };

function describeSummary(result: SummaryResult): string {
  if (result.status === "ok") {
    return `${result.title}: ${result.progress}`;
  }

  return `No disponible: ${result.message}`;
}
```

Después de comprobar `result.status`, TypeScript puede estrechar la unión y permitir el acceso a
las propiedades correspondientes a esa variante.

### Práctica breve

Definí una unión de resultados para una función que calcula el estado de un módulo:

1. un resultado válido con título y estado;
2. un resultado de error con un mensaje;
3. una función que trate ambos casos sin usar `as` para forzar el acceso.

### Verificación

La decisión está encaminada si los estados inválidos no se esconden como strings arbitrarios y si la
función comprueba la variante antes de usar sus propiedades específicas.

<h2 id="leccion-03">Lección 03 · Fronteras desconocidas</h2>

### Idea principal

Un dato que llega desde fuera del programa no debe tratarse como confiable solo porque tiene una
forma que esperamos. `unknown` obliga a comprobar el valor antes de usarlo.

Una comprobación pequeña puede validar una estructura de progreso:

```ts
function isProgressStatus(value: unknown): value is ProgressStatus {
  return value === "not_started" || value === "in_progress" || value === "completed";
}

function isProgress(value: unknown): value is Progress {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.moduleId === "string" &&
    isProgressStatus(candidate.status) &&
    typeof candidate.completedLessons === "number" &&
    typeof candidate.totalLessons === "number"
  );
}
```

La aserción interna no convierte el dato en confiable por sí sola. La función devuelve `true` solo
después de revisar cada propiedad que el contrato necesita.

Usar `any` como atajo produciría el efecto contrario: permitiría acceder a propiedades sin comprobar
si existen y ocultaría el error que el contrato debía detectar.

### Práctica breve

Imaginá que una función recibe un valor desconocido. Escribí una lista de comprobaciones para aceptar
solo un progreso con:

1. un `moduleId` textual;
2. un estado perteneciente a la unión válida;
3. cantidades numéricas de lecciones;
4. valores que no representen cantidades negativas.

Explicá qué propiedad se rechazaría primero en cada caso inválido.

### Verificación

La estructura está encaminada si ningún dato externo se trata como una estructura conocida antes de
validarlo y si la función de validación deja claro qué contrato comprueba.

<h2 id="practica-integradora">Práctica integradora</h2>

### Situación

Existe un modelo JavaScript de módulos educativos con lecciones y estados de avance. Se necesita
convertirlo en un contrato TypeScript antes de conectarlo con una interfaz o con una transferencia de
datos.

### Entrega

Completá esta ficha antes de escribir el código:

```text
Tipo para módulo:
Tipo para lección:
Unión de estados válidos:
Forma del progreso:
Función principal:
Variante de resultado:
Dato unknown que debe validarse:
Error que el contrato debería detectar:
Verificación:
```

Después escribí los tipos, una función de resumen y una validación para el dato desconocido. No uses
`any` como forma de evitar una decisión y no conectes la solución con el DOM.

### Criterio de revisión

La ficha está completa cuando:

- los tipos describen los datos sin duplicar información innecesariamente;
- los estados válidos no aceptan cualquier texto;
- las funciones estrechan sus entradas antes de usar propiedades específicas;
- los datos desconocidos se validan antes de tratarlos como una estructura conocida;
- se puede explicar qué error previene cada contrato.

## Cierre

Hacer visibles los contratos significa convertir suposiciones en decisiones que el código puede
revisar. TypeScript no elimina la necesidad de pensar sobre los datos: ayuda a que una parte de ese
razonamiento quede presente antes de ejecutar.

La próxima etapa será estudiar cómo esos datos y contratos se conectan con el DOM y los eventos sin
perder el control sobre el estado.
