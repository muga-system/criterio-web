# Módulo 03 · Componer sin pelear con la estructura

Estado: contrato pedagógico v0 con contenido inicial publicado.

Este documento define la unidad curricular y el contenido publicado después de HTML semántico. La
ruta está disponible en `src/pages/modulos/css-composicion-03.md`.

## Identidad

- **Identificador:** `css-composicion-03`
- **Título:** Componer sin pelear con la estructura
- **Área:** CSS y composición
- **Prerrequisitos:** [Módulo 02 · Estructurar antes de decorar](./modulo-02-html-semantico.md)
- **Capacidad central:** componer una interfaz legible y adaptable explicando cómo se relacionan la
  cascada, el layout y el contexto de pantalla.

## Propósito

CSS no debería utilizarse para corregir una estructura HTML que no expresa el contenido. Primero se
debe conservar el significado; después se puede decidir cómo distribuir, espaciar y presentar ese
contenido en distintos contextos.

El módulo introduce la cascada, el flujo normal, Flexbox, Grid y la composición responsive como
herramientas para tomar decisiones, no como recetas aisladas.

## Resultado de aprendizaje

Al terminar el módulo, el estudiante debería poder:

- explicar por qué una declaración gana a otra cuando existen conflictos de cascada;
- mantener selectores simples y evitar usar `!important` como solución habitual;
- reconocer cuándo el flujo normal alcanza y cuándo conviene una composición con Flexbox o Grid;
- diferenciar una distribución de una dimensión de una distribución de filas y columnas;
- adaptar una composición a distintos anchos sin ocultar contenido ni depender de una posición fija;
- verificar legibilidad, desbordes y relaciones entre contenido y presentación en más de un viewport.

## Secuencia de lecciones

### 01 · Cascada y conflictos

**Idea central:** el resultado de una regla CSS depende del origen, la capa, la importancia, la
especificidad y el orden de las declaraciones que compiten.

El estudiante compara reglas sencillas, identifica por qué una declaración prevalece y aprende a
reducir la complejidad de los selectores antes de agregar excepciones.

**Práctica propuesta:** resolver un conflicto de estilos manteniendo selectores de baja complejidad
y explicando qué regla debe cambiar.

### 02 · Flujo, Flexbox y Grid

**Idea central:** la herramienta de layout debe corresponder a la relación que se quiere componer.

El estudiante parte del flujo normal, prueba una distribución de una dimensión con Flexbox y una
composición de filas y columnas con Grid. La elección se justifica por la relación entre los
elementos, no por la preferencia de una técnica.

**Práctica propuesta:** componer una cabecera, una lista de módulos y un bloque complementario con
dos alternativas de layout y explicar qué cambia en cada una.

### 03 · Composición responsive

**Idea central:** una composición responsive conserva el acceso al contenido y sus relaciones a
medida que cambia el contexto de pantalla.

El estudiante detecta anchos rígidos, desbordes y dependencias de una única pantalla. Después ajusta
la composición con unidades relativas, límites razonables y cambios de layout cuando el contenido lo
requiere.

**Práctica propuesta:** revisar una interfaz a 320 px, 768 px y un ancho amplio, registrar qué se
rompe y proponer el mínimo cambio de CSS que preserve la lectura.

## Práctica integradora de cierre

Se entrega una estructura HTML semántica de una página educativa y una hoja de estilos inicial con
conflictos de cascada, tamaños rígidos y una distribución que se rompe al reducir el viewport. El
estudiante debe entregar:

1. un diagnóstico separado para cascada, layout y responsive;
2. una decisión de composición para cada región relevante;
3. una propuesta CSS que conserve la estructura HTML;
4. una explicación del principal trade-off de la solución;
5. una verificación en al menos dos anchos de pantalla.

La práctica no pedirá JavaScript ni una biblioteca de componentes. La dificultad estará en sostener
la relación entre contenido, composición y contexto sin acumular excepciones.

## Criterio de finalización

El módulo se considera completo cuando:

- explica al menos un conflicto de cascada sin apelar directamente a `!important`;
- elige entre flujo normal, Flexbox y Grid según la relación que necesita componer;
- conserva el contenido visible y legible en los anchos definidos;
- identifica al menos un trade-off de la composición elegida;
- propone una verificación que revise el resultado y no solo la presencia de declaraciones CSS.

No se asignan puntos ni una calificación numérica en esta versión.

## Forma de contenido

La primera versión se publica como contenido estático de Astro, con ejemplos de HTML y CSS,
comparaciones de layout y fichas de verificación. No se agrega una isla React porque las prácticas
actuales no requieren edición, comparación ni validación dentro de la aplicación.

## Decisión de implementación v0

La práctica integradora permanece como actividad guiada de análisis y escritura fuera de la
aplicación. No se agrega una isla React ni persistencia porque el objetivo actual es comprobar si el
estudiante puede explicar una decisión de composición antes de convertirla en una herramienta
editable.

La decisión se revisará cuando exista evidencia de que editar, comparar o validar CSS dentro de la
aplicación mejora la comprensión o la verificación del criterio.

## Límites de esta definición

Este contrato no decide todavía:

- los tokens visuales definitivos del producto;
- una metodología completa de diseño responsive;
- animaciones, transiciones o microinteracciones;
- el uso de un framework CSS;
- la interfaz local para resolver prácticas;
- el criterio técnico para registrar progreso.

## Referencias de base

La selección inicial de principios se contrastó con la documentación de [MDN sobre conflictos y
cascada](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts),
[MDN sobre introducción al layout CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction),
[MDN sobre la relación entre Grid y otros métodos de layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Relationship_with_other_layout_methods)
y [MDN sobre media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries).
