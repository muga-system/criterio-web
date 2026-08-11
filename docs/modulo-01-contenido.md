# Módulo 01 · Contenido inicial

Estado: borrador pedagógico v0.

Este documento desarrolla el contrato de [Observar antes de construir](./modulo-01-observar-antes-de-construir.md)
sin convertirlo todavía en una ruta de la aplicación.

## Apertura

Construir para la web no empieza escribiendo código. Empieza entendiendo qué se intenta resolver,
qué información está disponible y cómo se va a reconocer un resultado correcto.

En este módulo vas a practicar una secuencia simple:

```text
pedido → problema → evidencia → criterio → decisión → verificación
```

La secuencia no pretende volver burocrático un trabajo pequeño. Sirve para evitar dos errores
frecuentes: resolver otra cosa distinta de la que hacía falta y declarar terminado un cambio sin
comprobarlo.

## Lección 01 · Del pedido al problema

### Idea principal

Una petición suele expresar una solución imaginada, no necesariamente el problema que la origina.

Por ejemplo:

> “Hacé el botón más grande.”

Eso indica una posible solución visual, pero todavía no explica qué está fallando. Puede ocurrir
que el botón no se encuentre, que el texto tenga poco contraste, que no se entienda la acción o
que solamente se esté mirando desde un viewport demasiado pequeño.

### Separar tres cosas

- **Pedido:** lo que alguien solicita.
- **Síntoma:** lo que se observa que no funciona o genera confusión.
- **Problema:** la situación que necesita resolverse para alcanzar el objetivo.

No siempre se puede conocer el problema después de una sola frase. En ese caso, la decisión correcta
es formular una pregunta concreta en vez de inventar una explicación.

### Práctica breve

Para cada pedido, completá la ficha:

```text
Pedido:
Síntoma observable:
Problema posible:
Pregunta que falta responder:
```

Pedidos de práctica:

1. “Que la página cargue más rápido.”
2. “Poné un menú hamburguesa.”
3. “El formulario tiene que ser más moderno.”

### Verificación

La respuesta está encaminada si no convierte automáticamente el pedido en código. Debe distinguir
lo observado de lo supuesto y dejar visible qué información falta.

## Lección 02 · Evidencia y criterio

### Idea principal

Una preferencia puede orientar una conversación, pero no alcanza como criterio técnico. Para decidir
necesitamos evidencia: algo que otra persona pueda observar, medir o comprobar.

Ejemplo:

- Preferencia: “Quiero que se vea mejor.”
- Evidencia: “En una pantalla de 320 px, el texto del botón ocupa dos líneas y desplaza la acción
  fuera del primer bloque visible.”
- Criterio: “La acción debe poder identificarse y activarse sin desplazamiento horizontal en 320 px.”

El criterio conecta el problema con una comprobación posible.

### Separar observaciones y supuestos

Una observación describe algo que se puede verificar. Un supuesto es una explicación todavía no
confirmada.

```text
Observación: el enlace no tiene un texto visible.
Supuesto: nadie lo encuentra porque el color es incorrecto.
Pregunta: ¿el problema continúa si se agrega un texto claro manteniendo el color?
```

### Práctica breve

Elegí una pantalla conocida y registrá:

1. dos observaciones;
2. un supuesto que no debería tratarse como hecho;
3. una restricción del contexto;
4. un criterio que pueda verificarse.

### Verificación

El criterio es útil si otra persona puede imaginar cómo revisarlo sin tener que adivinar qué quiso
decir quien lo escribió.

## Lección 03 · Decisión y verificación

### Idea principal

Una decisión técnica no necesita ser definitiva para ser buena. Necesita ser explícita, acotada y
acompañada por la forma en que se comprobará.

Una ficha de decisión mínima contiene:

```text
Problema:
Criterio:
Decisión:
Consecuencia principal:
Verificación:
```

La consecuencia principal obliga a reconocer el costo o límite de la alternativa elegida. No todas
las soluciones optimizan lo mismo.

### Ejemplo

Problema: una acción importante se confunde con texto secundario.

Criterio: la acción debe reconocerse como interactiva y conservar foco visible con teclado.

Decisión: usar un elemento de acción nativo con texto explícito y un estado de foco distinguible.

Consecuencia principal: la interfaz tendrá más estructura visible y habrá que revisar sus estados
normal, hover, foco y deshabilitado.

Verificación: recorrer la acción con teclado y revisar que su propósito y foco sean identificables.

### Práctica breve

Elegí una de estas alternativas para el ejemplo anterior:

- una acción nativa con texto visible;
- una tarjeta completa que funcione como acción;
- un ícono sin texto.

Justificá la elección con el criterio, escribí una consecuencia y proponé una verificación. La
actividad no busca adivinar una respuesta única: busca que la decisión sea defendible y comprobable.

## Práctica integradora

### Situación

Una pantalla de aprendizaje tiene una acción para continuar. Algunas personas dicen que “no se
encuentra”, pero todavía no hay observaciones detalladas.

### Entrega

Completá esta ficha sin saltar directamente a una solución visual:

```text
Pedido recibido:
Problema que se intenta resolver:
Evidencia que falta observar:
Restricciones conocidas:
Criterio de decisión:
Solución inicial:
Consecuencia principal:
Verificación de cierre:
```

### Criterio de revisión

La ficha está completa cuando:

- distingue el pedido del problema;
- identifica evidencia que todavía falta;
- declara al menos una restricción;
- formula un criterio observable;
- reconoce una consecuencia de la decisión;
- propone una verificación relacionada con el criterio.

## Cierre

El criterio web no consiste en acumular herramientas. Consiste en poder explicar qué se está
resolviendo, por qué una decisión encaja con el problema y cómo se va a comprobar el resultado.

La próxima etapa será aplicar esta forma de pensar a una estructura concreta: HTML semántico.

## Decisión de implementación

Este borrador no necesita React. Puede publicarse como contenido estático de Astro. Una isla React
solo tendría sentido si la ficha se convierte en una práctica interactiva con validación, estado
local o recuperación del trabajo del estudiante.
