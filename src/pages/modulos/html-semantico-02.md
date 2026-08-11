---
layout: ../../layouts/ModuleLayout.astro
---

# Módulo 02 · Estructurar antes de decorar

Una interfaz no debería comunicar su estructura solamente mediante tamaños, colores o posiciones.
El HTML puede expresar qué representa cada parte del contenido y qué relación tiene con las demás.

En este módulo vas a practicar una secuencia simple:

```text
contenido → significado → estructura → verificación
```

El objetivo no es memorizar etiquetas. Es decidir qué estructura describe mejor un contenido y
comprobar que esa decisión sigue siendo comprensible antes de agregar CSS.

<h2 id="leccion-01">Lección 01 · Significado antes que apariencia</h2>

### Idea principal

El HTML describe contenido y relaciones. La apariencia visual puede cambiar sin que cambie el
significado del documento.

Un elemento genérico puede recibir estilos y parecer un título, pero no comunica necesariamente que
ese texto inicia una sección. Una estructura semántica hace explícita esa relación para quien lee el
código y para las herramientas que interpretan el documento.

### Comparar dos estructuras

Esta estructura usa presentación para simular contenido:

```html
<div class="titulo">Guía de práctica</div>
<br />
Leé estas indicaciones antes de empezar.
<br /><br />
1. Observar el pedido
<br />
2. Formular un criterio
<br />
3. Verificar la decisión
```

El problema no es solamente visual. La estructura no declara un título, un párrafo ni una lista.

Una alternativa expresa esas relaciones:

```html
<h1>Guía de práctica</h1>
<p>Leé estas indicaciones antes de empezar.</p>
<ol>
  <li>Observar el pedido</li>
  <li>Formular un criterio</li>
  <li>Verificar la decisión</li>
</ol>
```

El CSS podrá cambiar el tamaño, el espacio o la disposición sin obligar al HTML a fingir otra
estructura.

### Práctica breve

Revisá estos casos y respondé qué relación de contenido falta expresar:

1. un texto grande que funciona como título, pero está dentro de un `div`;
2. tres acciones separadas con `br`;
3. una frase que está escrita en un `span`, aunque funciona como párrafo.

Para cada caso, proponé el elemento HTML que mejor describe su función y explicá qué decisión
visual debería quedar para CSS.

### Verificación

La respuesta está encaminada si distingue la estructura del contenido de su apariencia y puede
explicar qué información se pierde cuando todo se representa con elementos genéricos.

<h2 id="leccion-02">Lección 02 · Regiones y agrupaciones</h2>

### Idea principal

Las regiones del documento deben expresar el papel que cumplen, no solamente su posición en la
pantalla. `main` representa el contenido dominante de la página; `nav` agrupa enlaces de navegación
importantes; `article` representa una pieza que puede entenderse por sí misma; `section` agrupa un
tema relacionado y debe tener un título; `aside` contiene información complementaria; `header` y
`footer` pueden delimitar una página o una pieza de contenido.

Un esqueleto posible para una página educativa es:

```html
<body>
  <header>
    <a href="/">Criterio Web</a>
  </header>

  <nav aria-label="Navegación principal">
    <a href="/modulos">Módulos</a>
    <a href="/progreso">Progreso</a>
  </nav>

  <main>
    <article>
      <header>
        <h1>Observar antes de construir</h1>
        <p>Una guía para formular decisiones web verificables.</p>
      </header>

      <section aria-labelledby="objetivo">
        <h2 id="objetivo">Objetivo</h2>
        <p>Separar el pedido del problema antes de elegir una solución.</p>
      </section>

      <aside>
        <h2>Recordatorio</h2>
        <p>Una preferencia visual todavía no es un criterio de aceptación.</p>
      </aside>
    </article>
  </main>

  <footer>
    <p>Criterio Web · Contenido educativo</p>
  </footer>
</body>
```

La elección no se justifica diciendo “va arriba” o “va al costado”. Se justifica explicando qué
contenido agrupa y qué relación tiene con el documento.

### Práctica breve

Ordená estas partes de una página educativa y asigná un elemento a cada una:

- enlaces para cambiar de sección;
- una unidad de contenido que podría compartirse por separado;
- una nota complementaria sobre el ejercicio;
- el contenido principal de la página;
- el cierre común del sitio.

Después escribí una razón para cada elección. Si una parte no necesita una región semántica propia,
explicá por qué.

### Verificación

La estructura está encaminada si una persona puede reconocer el contenido principal, la navegación,
la unidad independiente y la información complementaria sin mirar una captura ni una hoja de
estilos.

<h2 id="leccion-03">Lección 03 · Títulos, texto y listas</h2>

### Idea principal

La jerarquía de títulos describe cómo se organiza el documento. No se elige un nivel porque el texto
deba verse más grande o más pequeño. El tamaño y el espacio son decisiones de CSS.

Los párrafos expresan bloques de texto. Las listas expresan agrupaciones ordenadas o no ordenadas.
Usar saltos de línea para simular listas o títulos deja la relación dependiendo de la apariencia.

Esta estructura mezcla niveles y elige títulos por su tamaño visual:

```html
<h1>Guía de práctica</h1>
<h4>Objetivo</h4>
<p>...</p>
<h2>Pasos</h2>
<p>1. Observar</p>
<p>2. Decidir</p>
```

Una revisión posible es:

```html
<h1>Guía de práctica</h1>

<h2>Objetivo</h2>
<p>...</p>

<h2>Pasos</h2>
<ol>
  <li>Observar</li>
  <li>Decidir</li>
</ol>
```

La segunda estructura permite reconocer que “Objetivo” y “Pasos” son partes del mismo documento y
que los pasos forman una secuencia.

### Práctica breve

Revisá un fragmento de contenido que conozcas y registrá:

1. cuál es su título principal;
2. qué subtítulos pertenecen a cada sección;
3. qué frases deberían ser párrafos;
4. qué grupos deberían ser listas y si su orden importa.

No cambies el tamaño visual de nada. Primero describí la relación del contenido y después proponé
los elementos HTML.

### Verificación

La estructura está encaminada si se puede leer la jerarquía de títulos y las agrupaciones sin
depender de estilos, saltos de línea o elementos vacíos.

<h2 id="practica-integradora">Práctica integradora</h2>

### Situación

Hay que preparar la estructura de una página educativa para una práctica guiada. La página tendrá
una navegación principal, un contenido central, dos unidades relacionadas y una nota complementaria.
Todavía no se definieron colores, tamaños ni distribución visual.

### Entrega

Completá esta ficha antes de escribir el HTML:

```text
Contenido principal:
Enlaces de navegación:
Unidad independiente:
Agrupaciones temáticas:
Información complementaria:
Jerarquía de títulos:
Verificación sin CSS:
```

Después escribí una estructura HTML inicial y justificá cada elemento estructural elegido. La
justificación debe hablar del contenido que representa, no de su ubicación en pantalla.

### Criterio de revisión

La ficha está completa cuando:

- distingue navegación, contenido principal y contenido complementario;
- usa una agrupación temática con un título que explique su propósito;
- organiza los títulos por relación y no por tamaño visual;
- representa párrafos y listas con elementos que expresan esas relaciones;
- propone una verificación que pueda hacerse sin depender de CSS.

## Cierre

El HTML semántico no es una colección de nombres para reemplazar `div`. Es una forma de hacer
explícita la estructura de un contenido antes de decidir cómo se verá.

La próxima etapa será comprobar qué decisiones de presentación puede resolver CSS sin romper la
estructura que acabás de construir.
