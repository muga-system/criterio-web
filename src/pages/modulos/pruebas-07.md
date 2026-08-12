---
layout: ../../layouts/ModuleLayout.astro
---

# Módulo 07 · Verificar antes de cerrar

Una prueba no existe para demostrar que el código tiene cierta forma interna. Existe para hacer
visible una expectativa que alguien pueda ejecutar, entender y volver a comprobar después de un
cambio.

En este módulo vas a practicar una secuencia simple:

```text
criterio → escenario → acción → resultado → evidencia
```

El foco no será acumular pruebas ni perseguir un porcentaje aislado. Será aprender a elegir qué
comportamiento necesita protección, qué nivel de prueba aporta evidencia suficiente y cómo leer un
fallo para relacionarlo con el criterio que dejó de cumplirse.

<h2 id="leccion-01">Lección 01 · Del criterio a una afirmación verificable</h2>

### Idea principal

Una prueba empieza con un comportamiento que se puede observar y explicar, no con una llamada al
runner. La frase “el avance funciona” todavía no permite saber qué preparar, qué acción ejecutar ni
qué resultado esperar.

Una afirmación más precisa separa esas partes:

```text
Escenario: la práctica comienza en la lección 1 de 3.
Acción: la persona activa Siguiente lección.
Resultado: el estado visible pasa a Lección 2 de 3.
```

La afirmación no describe cómo se implementó el avance. Describe qué puede observar una persona y qué
evidencia debería permanecer cierta después de un cambio interno.

### Preparación, acción y expectativa

Una prueba legible permite reconocer tres momentos:

```ts
const practice = page.getByRole("region", {
  name: "Práctica local: avanzar por lecciones",
});

await expect(practice.getByRole("status")).toHaveText("Lección 1 de 3");
await practice.getByRole("button", { name: "Siguiente lección" }).click();
await expect(practice.getByRole("status")).toHaveText("Lección 2 de 3");
```

La primera afirmación comprueba el estado inicial. El click representa la entrada. La última
afirmación verifica el resultado observable. Si se cambia el mecanismo interno pero se mantiene ese
comportamiento, la prueba debería seguir siendo válida.

### Práctica breve

Escribí tres afirmaciones para la práctica del Módulo 06:

1. estado inicial;
2. avance normal;
3. límite final.

Para cada una indicá qué existe antes, qué acción ocurre y qué evidencia confirma el resultado.

### Verificación

La afirmación está encaminada si otra persona puede ejecutarla sin preguntar qué significa
“funciona” ni inspeccionar la implementación para completar el escenario.

<h2 id="leccion-02">Lección 02 · Casos límite y aislamiento</h2>

### Idea principal

Una prueba útil también declara qué no debe ocurrir cuando una entrada llega al límite. En la
práctica del Módulo 06, avanzar desde la primera lección y volver a activar la acción cuando la
práctica ya está completa no son el mismo caso.

El límite forma parte del contrato:

```ts
if (state.currentLesson >= state.totalLessons) {
  return;
}
```

La prueba no necesita conocer esta condición. Necesita verificar que, una vez completadas las tres
lecciones, la acción deja de estar disponible y el estado no avanza a una cuarta lección.

### Elegir qué aislar

Una función que calcula el siguiente estado puede verificarse sin levantar un navegador. La relación
entre un botón accesible, el estado visible y la ruta completa necesita una prueba de interacción.
Cada nivel responde una pregunta distinta:

| Nivel      | Pregunta principal                              | Evidencia típica                  |
| ---------- | ----------------------------------------------- | --------------------------------- |
| Aislado    | ¿La regla calcula el estado correcto?           | resultado de una función          |
| Navegador  | ¿La interacción actualiza la vista?             | texto, rol o estado accesible     |
| End-to-end | ¿El recorrido conectado funciona desde la ruta? | navegación e interacción completa |

Subir de nivel no vuelve automáticamente mejor a una prueba. Agrega integración y costo. Bajar de
nivel tampoco sirve si se pierde justamente la conexión que se quería proteger.

### Práctica breve

Describí el estado, la acción y el resultado de repetir la acción de avance después de completar las
tres lecciones. Explicá qué parte podría verificarse de forma aislada y qué parte necesitaría un
navegador real.

### Verificación

La prueba está encaminada si comprueba una regla del comportamiento y no depende de una espera
arbitraria, del orden accidental de otros tests o de una clase visual que no expresa el resultado.

<h2 id="leccion-03">Lección 03 · Recorrer la experiencia completa</h2>

### Idea principal

Una prueba end-to-end verifica que las piezas conectadas siguen ofreciendo el recorrido que la
persona necesita, desde la ruta hasta la interacción y su resultado.

El recorrido de este módulo puede expresarse así:

```text
/modulos → abrir Módulo 07 → leer la lección inicial → revisar la práctica de pruebas
```

Un smoke E2E no debería repetir cada detalle de todas las pruebas aisladas. Debería cubrir una
secuencia corta que detecte si una ruta dejó de existir, si el contenido principal no renderiza o si
un control esencial perdió su comportamiento.

### Estabilidad y significado

Una prueba estable busca señales que expresan el comportamiento: roles, nombres accesibles, títulos,
estados y URLs esperadas. Una clase CSS puede cambiar por una decisión visual sin que el recorrido
haya dejado de funcionar.

El selector debe ser suficientemente específico para evitar ambigüedad, pero no tan dependiente de
la estructura interna que cualquier refactor menor rompa la evidencia.

### Práctica breve

Elegí qué afirmación del módulo debe cubrirse con una prueba de navegador y cuál con un recorrido E2E.
Justificá qué riesgo cubre cada una y qué integración quedaría sin comprobar si bajaras el nivel.

### Verificación

La elección está encaminada si explica qué integración quedaría sin comprobar al bajar el nivel de
la prueba y qué detalle sería innecesario comprobar al subirlo.

<h2 id="practica-integradora">Práctica integradora</h2>

### Situación

La práctica local del Módulo 06 tiene una acción de avance y un indicador visible. El comportamiento
necesita una batería pequeña de pruebas que convierta su criterio de finalización en evidencia
ejecutable.

### Entrega

Completá esta ficha antes de escribir el código:

```text
Comportamiento que se quiere proteger:
Escenario inicial:
Acción que recibe la entrada:
Resultado observable esperado:
Caso límite:
Nivel de prueba elegido:
Fallo posible y evidencia que aportaría:
```

Después escribí las pruebas necesarias para cubrir el estado inicial, un avance y el límite de la
práctica. No agregues una espera arbitraria, no dependas de una clase visual que no exprese el
resultado y no conectes la práctica con una red o una persistencia.

### Criterio de revisión

La ficha está completa cuando:

- cada prueba expresa un comportamiento observable y no solo un detalle de implementación;
- la preparación, la acción y la expectativa se pueden distinguir;
- existe cobertura del estado inicial, un avance y el límite de la práctica;
- la interacción conserva el uso por teclado cuando corresponde;
- una persona puede interpretar un fallo y relacionarlo con el criterio que dejó de cumplirse.

## Cierre

Verificar antes de cerrar significa poder explicar qué comportamiento se protegió, qué riesgo cubre
cada prueba y qué información aporta un fallo. La herramienta ejecuta la comprobación, pero el
criterio decide qué vale la pena comprobar.

La próxima etapa será revisar qué evidencia de estas prácticas necesita conservarse antes de diseñar
la persistencia del progreso.
