---
layout: ../../layouts/ModuleLayout.astro
---

# Módulo 03 · Componer sin pelear con la estructura

CSS no debería utilizarse para corregir una estructura HTML que no expresa el contenido. Primero se
debe conservar el significado; después se puede decidir cómo distribuir, espaciar y presentar ese
contenido en distintos contextos.

En este módulo vas a practicar una secuencia simple:

```text
estructura → cascada → composición → adaptación → verificación
```

El objetivo no es memorizar propiedades aisladas. Es elegir una forma de composición, reconocer sus
límites y verificar que el contenido siga siendo legible cuando cambia el contexto.

<h2 id="leccion-01">Lección 01 · Cascada y conflictos</h2>

### Idea principal

Cuando varias declaraciones pueden aplicar sobre un mismo elemento, CSS resuelve el conflicto según
las reglas de la cascada. En términos prácticos importan el contexto de la declaración, la
especificidad del selector y el orden en que aparecen reglas equivalentes.

La solución no debería ser acumular selectores cada vez más difíciles de leer. Primero conviene
revisar si la estructura, el selector y el lugar de la declaración expresan correctamente la
intención.

### Comparar reglas

Estas reglas compiten por el mismo color:

```css
p {
  color: #555;
}

.notice {
  color: #0369a1;
}

p.notice {
  color: #7c2d12;
}
```

Un párrafo con `class="notice"` recibe la última regla porque su selector es más específico que el
selector de clase y que el selector de elemento. La pregunta útil no es solamente “¿cuál gana?”, sino
“¿la diferencia de especificidad representa una decisión que queremos mantener?”.

`!important` modifica el orden normal de resolución y puede esconder el origen del conflicto. En una
hoja propia no debe ser la salida habitual para corregir una regla que no se entiende.

### Práctica breve

Revisá este fragmento:

```css
.card p {
  color: #222;
}

main .module-list article.card p {
  color: #555;
}

.card p {
  color: #111 !important;
}
```

Respondé:

1. qué declaración termina aplicándose;
2. qué selector agrega complejidad innecesaria;
3. qué cambiarías para que la intención sea clara sin `!important`.

### Verificación

La respuesta está encaminada si explica el conflicto por las reglas de la cascada y propone una
corrección que reduzca excepciones en lugar de sumar otra capa de especificidad.

<h2 id="leccion-02">Lección 02 · Flujo, Flexbox y Grid</h2>

### Idea principal

El flujo normal es el punto de partida: los elementos se ubican según su tipo y el espacio
disponible. Cuando la relación necesita una composición explícita, la herramienta debe corresponder
al problema.

- **Flexbox:** composición principalmente en una dimensión, una fila o una columna.
- **Grid:** composición en dos dimensiones, con filas y columnas relacionadas.
- **Flujo normal:** contenido que puede seguir su orden natural sin una distribución especial.

Una barra de acciones puede necesitar Flexbox:

```css
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
```

Una lista de módulos puede necesitar Grid:

```css
.module-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1rem;
}
```

Ninguna técnica es automáticamente mejor. La decisión depende de si se está componiendo una
relación lineal o una matriz de contenido.

### Práctica breve

Elegí el punto de partida más adecuado para cada caso y justificá la elección:

1. una fila de acciones que puede pasar a otra línea;
2. una grilla de tarjetas con columnas que se adaptan al ancho;
3. un artículo con párrafos que deben seguir su orden de lectura.

Después anotá una consecuencia de la técnica elegida. Por ejemplo, una fila flexible puede envolver
sus elementos, mientras que una grilla puede cambiar la cantidad de columnas.

### Verificación

La decisión está encaminada si relaciona la herramienta con la estructura del problema y no con una
preferencia de sintaxis. También debe reconocer qué ocurre cuando el espacio disponible disminuye.

<h2 id="leccion-03">Lección 03 · Composición responsive</h2>

### Idea principal

Una composición responsive conserva el acceso al contenido y sus relaciones a medida que cambia el
contexto de pantalla. No consiste en reducir todo hasta que entre: consiste en revisar qué relación
debe mantenerse y qué distribución puede cambiar.

Un ancho rígido puede provocar desbordes:

```css
.workspace {
  width: 960px;
}
```

Una base más flexible limita el crecimiento sin imponer un ancho único:

```css
.workspace {
  width: min(100%, 60rem);
  margin-inline: auto;
  padding-inline: 1rem;
}
```

Una media query puede cambiar la relación cuando el contenido lo necesita:

```css
.page-layout {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 48rem) {
  .page-layout {
    grid-template-columns: minmax(0, 1fr) 16rem;
  }
}
```

La verificación no debería limitarse a un viewport amplio. También debe detectar desplazamiento
horizontal, texto cortado, controles inaccesibles o relaciones que dejaron de entenderse.

### Práctica breve

Revisá una interfaz a 320 px, 768 px y un ancho amplio. Registrá:

1. si aparece desplazamiento horizontal;
2. si algún texto o acción queda oculto;
3. si las columnas siguen ayudando a leer o deberían cambiar;
4. cuál es el mínimo cambio de CSS que preservaría el contenido.

No empieces agregando breakpoints. Primero describí qué se rompe y por qué.

### Verificación

La composición está encaminada si conserva la lectura, no depende de una posición fija y puede
explicar qué cambia entre anchos sin ocultar información como primera solución.

<h2 id="practica-integradora">Práctica integradora</h2>

### Situación

Una página educativa tiene una estructura HTML correcta, pero su CSS presenta tres problemas:

- una regla muy específica impide ajustar el color de una nota;
- la lista de módulos usa tarjetas con ancho rígido;
- en una pantalla angosta aparece desplazamiento horizontal.

### Entrega

Completá esta ficha antes de editar la hoja de estilos:

```text
Conflicto de cascada:
Regla que debería expresar la intención:
Relación de layout necesaria:
Composición elegida:
Problema responsive observable:
Cambio mínimo propuesto:
Trade-off principal:
Verificación en dos anchos:
```

Después proponé una versión CSS que conserve la estructura HTML y explicá por qué cada cambio
responde al problema observado.

### Criterio de revisión

La ficha está completa cuando:

- explica un conflicto de cascada sin resolverlo directamente con `!important`;
- elige flujo normal, Flexbox o Grid según la relación que necesita componer;
- reemplaza al menos un ancho rígido por una composición adaptable;
- reconoce una consecuencia de la solución elegida;
- propone una verificación en al menos dos anchos de pantalla.

## Cierre

Componer con CSS no consiste en empujar elementos hasta que una captura se vea bien. Consiste en
preservar la estructura, entender qué reglas compiten y elegir una distribución que pueda responder
al contenido y al contexto.

La próxima etapa será comprobar cómo JavaScript puede agregar comportamiento sin ocultar el estado
ni convertir la interfaz en una secuencia de efectos implícitos.
