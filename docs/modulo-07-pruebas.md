# Módulo 07 · Verificar antes de cerrar

Estado: contenido inicial publicado como versión pedagógica v0.

Este documento define la unidad curricular que continúa el recorrido después de conectar estado,
eventos y representación. El módulo enseña a convertir un criterio de terminado en una verificación
observable, sin confundir cantidad de pruebas con evidencia útil.

## Identidad

- **Identificador:** `pruebas-07`.
- **Título:** Verificar antes de cerrar.
- **Área:** Pruebas.
- **Prerrequisitos:** [Módulo 06 · Conectar estado y representación](./modulo-06-dom-eventos.md).
- **Capacidad central:** diseñar pruebas que describan comportamiento observable, cubran límites
  relevantes y permitan detectar una regresión sin depender de una inspección manual ambigua.

## Propósito

Una prueba no existe para demostrar que el código tiene cierta forma interna. Existe para hacer
visible una expectativa que alguien pueda ejecutar, entender y volver a comprobar después de un
cambio.

El estudiante va a relacionar criterio, escenario, acción y resultado esperado. También va a
aprender a elegir el nivel de prueba adecuado: una función aislada, una interacción de navegador o
un recorrido completo. La elección debe responder al riesgo que se quiere verificar, no a una receta
del framework.

## Resultado de aprendizaje

Al terminar el módulo, el estudiante debería poder:

- convertir una decisión de producto en una afirmación verificable;
- distinguir preparación, acción y resultado esperado dentro de una prueba;
- elegir entre una prueba aislada, una prueba de navegador y una prueba end-to-end según el riesgo;
- cubrir el estado inicial, un caso esperado y un caso límite relevante;
- leer un fallo para localizar qué comportamiento dejó de cumplirse;
- mantener una prueba estable sin acoplarla a detalles visuales o internos innecesarios.

## Secuencia de lecciones

### 01 · Del criterio a una afirmación verificable

**Idea central:** una prueba empieza con un comportamiento que se puede observar y explicar, no con
una llamada al runner.

El estudiante transforma una frase vaga como “el avance funciona” en una afirmación concreta:
“cuando la persona activa Siguiente lección, el estado visible pasa de 1 de 3 a 2 de 3”. La prueba
debe dejar claro qué existe antes, qué acción ocurre y qué evidencia confirma el resultado.

**Práctica propuesta:** escribir tres afirmaciones para la práctica del Módulo 06: estado inicial,
avance normal y límite final.

**Verificación:** la afirmación está encaminada si otra persona puede ejecutarla sin preguntar qué
significa “funciona” ni inspeccionar la implementación para completar el escenario.

### 02 · Casos límite y aislamiento

**Idea central:** una prueba útil también declara qué no debe ocurrir cuando una entrada llega al
límite o cuando una dependencia no forma parte del escenario.

El estudiante compara un caso normal con un caso límite: avanzar desde la primera lección y volver a
activar la acción cuando la práctica ya está completa. Después reconoce qué parte puede verificarse
de forma aislada y qué comportamiento necesita un navegador real.

**Práctica propuesta:** describir el estado, la acción y el resultado de repetir la acción de avance
después de completar las tres lecciones, sin introducir una regla nueva en la prueba.

**Verificación:** la prueba está encaminada si comprueba una regla del comportamiento y no depende de
una espera arbitraria, del orden accidental de otros tests o de una clase visual que no expresa el
resultado.

### 03 · Recorrer la experiencia completa

**Idea central:** una prueba end-to-end verifica que las piezas conectadas siguen ofreciendo el
recorrido que la persona necesita, desde la ruta hasta la interacción y su resultado.

El estudiante diferencia una prueba de una función de actualización, una prueba de interacción en
el navegador y un smoke E2E. Cada nivel aporta evidencia distinta y tiene un costo diferente; no se
debe usar el recorrido más caro para cualquier afirmación pequeña.

**Práctica propuesta:** seleccionar qué afirmación del Módulo 06 debe cubrirse con una prueba de
navegador y cuál con un recorrido E2E, justificando qué riesgo cubre cada una.

**Verificación:** la elección está encaminada si explica qué integración quedaría sin comprobar al
bajar el nivel de la prueba y qué detalle sería innecesario comprobar al subirlo.

## Práctica integradora de cierre

Se entrega la práctica local del Módulo 06 con una interacción de avance y un indicador visible. El
estudiante debe diseñar una pequeña batería de pruebas que convierta su criterio de finalización en
evidencia ejecutable.

Debe entregar:

1. el comportamiento que se quiere proteger;
2. el escenario inicial y sus datos relevantes;
3. la acción que recibe la entrada;
4. el resultado observable esperado;
5. un caso límite y la regla que lo explica;
6. la justificación del nivel de prueba elegido;
7. una lectura breve del fallo posible y de la información que aportaría.

## Criterio de finalización

El módulo se considera completo cuando:

- cada prueba expresa un comportamiento observable y no solo un detalle de implementación;
- la preparación, la acción y la expectativa se pueden distinguir;
- existe cobertura del estado inicial, un avance y el límite de la práctica;
- la interacción se verifica con el nivel adecuado y conserva el uso por teclado cuando corresponde;
- una persona puede interpretar un fallo y relacionarlo con el criterio que dejó de cumplirse.

No se asignan puntos ni una calificación numérica en esta versión.

## Forma de contenido

La primera versión se publicará como contenido estático de Astro. Los ejemplos podrán usar Vitest
para comportamiento aislado y Playwright para interacción y recorridos, pero el concepto de prueba
debe permanecer entendible sin depender de la sintaxis de una herramienta.

La práctica no introducirá persistencia, transferencia portable, red ni un sistema de cobertura como
objetivo pedagógico. Esas capacidades se evaluarán después de definir qué evidencia del aprendizaje
necesita conservarse.

## Decisión de implementación v0

El contenido se publica como Markdown estático de Astro en
`src/pages/modulos/pruebas-07.md` y se incorpora al catálogo como el séptimo módulo. No agrega una
isla React, persistencia ni transferencia portable: primero se observa si la secuencia y la
evidencia propuesta son útiles.

## Límites de esta definición

Este contrato no decide todavía:

- una herramienta única para todos los niveles de prueba;
- métricas de cobertura, rankings o calificaciones;
- ejecución en CI o publicación de reportes;
- persistencia de resultados o transferencia portable;
- una interfaz React específica para practicar pruebas.

## Próximo paso

Revisar la evidencia que produzcan las prácticas y decidir qué capacidad interactiva merece una isla
React adicional. Las migraciones, los conflictos de reemplazo y la recuperación ante errores de
lectura ya están definidos en el contrato global de progreso, sin formar parte del objetivo
pedagógico de este módulo.
