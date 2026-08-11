# Módulo 02 · Estructurar antes de decorar

Estado: contrato pedagógico v0 con contenido inicial publicado.

Este documento define la unidad curricular y el contenido publicado a partir del modelo probado en
el Módulo 01. La ruta está disponible en `src/pages/modulos/html-semantico-02.md`.

## Identidad

- **Identificador:** `html-semantico-02`
- **Título:** Estructurar antes de decorar
- **Área:** HTML semántico
- **Prerrequisitos:** [Módulo 01 · Observar antes de construir](./modulo-01-observar-antes-de-construir.md)
- **Capacidad central:** construir una estructura HTML que pueda entenderse y recorrerse por su
  significado, sin depender de su apariencia visual.

## Propósito

Una interfaz no debería comunicar su estructura solamente mediante tamaños, colores o posiciones.
Este módulo introduce HTML semántico como una forma de expresar qué representa cada parte del
contenido y qué relación tiene con las demás.

El foco no será memorizar etiquetas. Será decidir qué estructura describe mejor un contenido y
comprobar que esa decisión sigue siendo comprensible antes de agregar CSS.

## Resultado de aprendizaje

Al terminar el módulo, el estudiante debería poder:

- distinguir significado estructural de apariencia visual;
- elegir elementos como `main`, `header`, `nav`, `article`, `section`, `aside` y `footer` según el
  contenido que representan;
- organizar títulos con una jerarquía que describa el documento, no el tamaño deseado;
- representar agrupaciones de contenido con párrafos y listas en lugar de simularlas con saltos de
  línea o elementos genéricos;
- inspeccionar una estructura HTML y explicar qué información comunica sin depender de CSS.

## Secuencia de lecciones

### 01 · Significado antes que apariencia

**Idea central:** el HTML describe contenido y relaciones; CSS define gran parte de su presentación.

El estudiante compara una estructura semántica con una estructura que usa elementos genéricos o
presentación para simular títulos, párrafos y listas.

**Práctica propuesta:** transformar una pieza de contenido visualmente descrita en una primera
estructura HTML, identificando qué decisiones todavía no dependen de CSS.

### 02 · Regiones y agrupaciones del documento

**Idea central:** las regiones del documento deben expresar el papel que cumplen y no solamente su
posición en pantalla.

El estudiante analiza un documento pequeño y decide cuándo corresponde usar `main`, `header`, `nav`,
`article`, `section`, `aside` o `footer`. La decisión deberá justificarse por el contenido que
agrupa.

**Práctica propuesta:** ordenar el esqueleto semántico de una página educativa con navegación,
contenido principal, unidades independientes y cierre.

### 03 · Títulos, texto y listas

**Idea central:** la jerarquía de títulos y la forma del contenido hacen visible cómo se recorre un
documento.

El estudiante organiza un título principal, subtítulos, párrafos y listas sin elegir niveles por
su tamaño visual ni usar elementos vacíos para producir separación.

**Práctica propuesta:** revisar una estructura defectuosa, detectar qué relación se perdió y
proponer una versión que pueda leerse por su jerarquía.

## Práctica integradora de cierre

Se presenta el pedido de una página educativa pequeña con una navegación, un contenido principal,
dos unidades relacionadas y una nota complementaria. El estudiante debe entregar:

1. un esquema de regiones del documento;
2. una estructura HTML inicial;
3. una justificación breve para cada elemento estructural elegido;
4. una jerarquía de títulos;
5. una verificación que permita revisar el significado sin mirar estilos.

La práctica no pedirá CSS ni JavaScript. La dificultad estará en explicar la estructura y detectar
cuándo un elemento se está usando para su apariencia en lugar de su significado.

## Criterio de finalización

El módulo se considera completo cuando:

- las tres lecciones obligatorias fueron recorridas;
- la estructura propuesta distingue regiones, agrupaciones y jerarquía de títulos;
- las decisiones no dependen de tamaños o posiciones visuales;
- la verificación permite explicar el documento sin recurrir a CSS;
- el estudiante puede reconocer al menos una consecuencia de usar una estructura genérica cuando
  existía un elemento semántico adecuado.

No se asignan puntos ni una calificación numérica en esta versión.

## Forma de contenido

La primera versión se publica como contenido estático de Astro, con ejemplos HTML y actividades de
revisión. No se agrega una isla React porque las prácticas actuales no requieren edición, validación
ni comparación dentro de la aplicación.

## Decisión de implementación v0

La práctica integradora permanece como actividad guiada de análisis y escritura fuera de la
aplicación. No se agrega una isla React ni persistencia porque el objetivo actual es comprobar si el
estudiante puede justificar una estructura HTML antes de convertirla en una herramienta editable.

La decisión se revisará cuando exista evidencia de que editar, comparar o validar la estructura
dentro de la aplicación mejora la comprensión o la verificación del criterio.

## Límites de esta definición

Este contrato no decide todavía:

- el texto definitivo de los ejemplos;
- si la práctica se resolverá fuera de la aplicación o con una futura herramienta local;
- el alcance de formularios, controles interactivos y estados de foco;
- el uso de ARIA más allá de los elementos HTML nativos;
- el criterio técnico para registrar progreso.

## Referencias de base

La selección inicial de elementos y la relación entre semántica y accesibilidad se contrastó con la
documentación de [MDN sobre estructuración de documentos](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents)
y [MDN sobre HTML y accesibilidad](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML).
