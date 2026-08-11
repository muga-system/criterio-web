# Modelo pedagógico inicial

Estado: definición base para la siguiente fase de Criterio Web.

Este documento define la estructura de aprendizaje antes de crear contenidos concretos o rutas
individuales de módulos. El código y los contenidos futuros deben respetar este límite hasta que
una decisión posterior lo modifique explícitamente.

## Objetivo

Criterio Web enseña a tomar decisiones web fundamentadas mediante práctica guiada. No busca solo
transmitir sintaxis: cada concepto debe relacionarse con un problema, una decisión y una forma de
verificar el resultado.

## Principios

1. **Comprender antes de automatizar.** Cada práctica debe explicar qué problema resuelve y por
   qué una solución es adecuada.
2. **Teoría breve, práctica concreta.** La explicación introduce lo necesario para actuar; la
   práctica demuestra si el concepto fue comprendido.
3. **Criterio antes que receta.** El contenido debe enseñar a elegir entre alternativas, reconocer
   consecuencias y justificar una decisión.
4. **Resultado verificable.** Cada unidad debe terminar con una comprobación observable, no solo
   con la lectura de una pantalla.
5. **Progresión explícita.** Los módulos deben declarar sus prerrequisitos y no depender de
   conocimientos implícitos.
6. **Local-first.** El avance pertenece al navegador del usuario. La transferencia futura será
   portable y no dependerá de un backend para funcionar.

## Jerarquía de aprendizaje

La primera versión utilizará tres niveles, sin agregar capas innecesarias:

```text
Criterio Web
└── Módulo
    └── Lección
        ├── Concepto
        ├── Ejemplo guiado
        ├── Práctica
        └── Verificación
```

### Módulo

Un módulo reúne una capacidad web coherente. Debe declarar:

- identificador estable;
- título y descripción;
- problema o capacidad que trabaja;
- objetivos de aprendizaje;
- prerrequisitos;
- orden de las lecciones;
- práctica integradora de cierre;
- criterio de finalización.

Un módulo no debe ser solamente una colección de temas relacionados. Tiene que conducir a una
capacidad que el estudiante pueda aplicar y verificar.

### Lección

Una lección trabaja una decisión o concepto acotado. Su estructura base será:

1. **Situación.** Qué problema aparece y por qué importa.
2. **Concepto.** Explicación clara del principio involucrado.
3. **Ejemplo guiado.** Aplicación visible sobre un caso pequeño.
4. **Práctica.** Tarea que el estudiante debe resolver o completar.
5. **Verificación.** Comprobación del resultado y explicación del criterio usado.
6. **Cierre.** Qué debería poder reconocer o hacer el estudiante después.

No todas las lecciones necesitarán una interfaz React. El contenido explicativo y los ejemplos
estáticos deben permanecer en Astro; React se reservará para prácticas que necesiten estado,
interacción o validación en el navegador.

## Criterio de finalización

La lectura de una lección no marca por sí sola un módulo como completado.

De forma inicial, un módulo podrá considerarse completado cuando:

1. sus lecciones obligatorias estén recorridas;
2. la práctica integradora de cierre haya sido realizada;
3. la verificación de cierre haya sido superada.

El sistema no definirá todavía puntos, ranking ni recompensas. Primero se debe probar que el modelo
de aprendizaje y la evidencia de comprensión son útiles.

## Estado de avance

El futuro modelo de progreso comenzará con tres estados simples:

- `not_started`: el estudiante todavía no inició el módulo;
- `in_progress`: existe avance, pero falta completar el criterio de cierre;
- `completed`: el criterio de cierre fue verificado.

El estado deberá poder reconstruirse desde datos locales y exportarse junto con una versión del
modelo de contenidos. No se implementa persistencia en este bloque.

## Orden curricular inicial

Este orden es una hipótesis de trabajo alineada con el objetivo del repositorio y deberá validarse
cuando se escriban los primeros contenidos:

1. **Orientación web.** Cómo observar un problema web y formular una decisión.
2. **HTML semántico.** Estructura, significado, jerarquía y accesibilidad básica.
3. **CSS y composición.** Cascada, layout, responsive y relación entre estructura y presentación.
4. **JavaScript en el navegador.** Datos, decisiones, funciones y comportamiento explícito.
5. **TypeScript.** Contratos, estados válidos y errores detectables antes de ejecutar.
6. **DOM y eventos.** Relación entre estado, interacción y representación de la interfaz.
7. **Pruebas.** Verificación de comportamiento, regresiones y criterios de terminado.

El orden podrá cambiar si las prácticas demuestran que un prerrequisito está mal ubicado. El primer
módulo se publica como prueba del modelo; las rutas siguientes esperan la revisión de esta unidad.

## Límites de esta definición

Este documento no decide todavía:

- el contenido textual de cada módulo;
- la cantidad final de lecciones;
- el formato exacto de los ejercicios;
- el esquema técnico de IndexedDB;
- el formato final del token portable;
- la interfaz React de las prácticas.

Esas decisiones deben derivarse de los primeros contenidos y no anticiparse mediante abstracciones
de código.

## Siguiente bloque

Revisar el contrato del [Módulo 01 · Observar antes de construir](./modulo-01-observar-antes-de-construir.md).
Después se podrá escribir su contenido y decidir si la primera práctica necesita una isla React.
