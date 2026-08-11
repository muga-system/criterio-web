# AGENTS.md

## Proyecto

Este repositorio corresponde a `CRITERIO-WEB`.

El objetivo de este archivo es mantener una forma de trabajo consistente entre sesiones, evitando que cada agente interprete el proyecto desde cero o introduzca decisiones incompatibles con el sistema existente.

El repositorio es la fuente de verdad técnica.

---

## 1. Regla principal

Antes de modificar código:

1. inspeccionar la estructura del repositorio,
2. leer la documentación relevante,
3. revisar `package.json` y configuraciones,
4. revisar `git status`,
5. revisar la rama actual,
6. entender el bloque de trabajo que ya existe.

No empezar a escribir código sin comprender primero el contexto inmediato.

No reconstruir el proyecto desde cero.

No cambiar arquitectura válida por preferencia personal.

No ampliar alcance sin necesidad.

---

## 2. Forma de avanzar

Trabajar en bloques pequeños pero lógicos.

Cada bloque debe tener:

* un objetivo concreto,
* una superficie de cambio limitada,
* una condición clara de terminado,
* una verificación proporcional al riesgo.

Evitar microcambios aislados que no constituyan una unidad real de trabajo.

Evitar también cambios grandes que mezclen múltiples responsabilidades.

Preferir una secuencia como:

1. entender,
2. modificar,
3. verificar,
4. revisar diff,
5. commit.

---

## 3. No reemplazar archivos innecesariamente

No reescribir archivos completos cuando el cambio puede realizarse de forma localizada.

Mantener intactas las partes que no forman parte del objetivo actual.

No hacer limpieza lateral, refactors secundarios o cambios cosméticos aprovechando una tarea distinta.

Si se detecta deuda técnica no bloqueante, señalarla sin modificarla automáticamente.

---

## 4. Arquitectura

Respetar la arquitectura existente.

Antes de crear:

* una abstracción,
* un servicio,
* un hook,
* un helper,
* una capa,
* un componente,
* un módulo,
* una dependencia,

comprobar primero si el proyecto ya posee una solución equivalente.

No introducir patrones únicamente porque sean habituales en otros proyectos.

Cada abstracción debe justificar su existencia mediante una necesidad real del sistema.

---

## 5. Imports

Usar imports explícitos por archivo.

No crear barrel files usados únicamente para reexportar módulos.

Evitar estructuras como:

`index.ts`
`index.tsx`

si su única función es ocultar la procedencia real de los imports.

La dependencia entre archivos debe poder entenderse leyendo el código.

---

## 6. Rutas y estructura del repo

Cuando se indiquen archivos o modificaciones, usar siempre la ruta real dentro del repositorio.

No inventar nuevas rutas si existe una ubicación canónica para esa responsabilidad.

Antes de crear un archivo nuevo, verificar que realmente sea necesario.

Mantener la estructura existente salvo que una tarea explícita requiera cambiarla.

---

## 7. TypeScript

Si el proyecto usa TypeScript:

* mantener tipado estricto,
* evitar `any`,
* evitar casts innecesarios,
* no silenciar errores,
* no duplicar tipos del mismo dominio,
* preferir tipos derivados de fuentes reales,
* modelar estados inválidos de forma explícita.

Corregir el origen de un error de tipos antes de recurrir a un workaround.

---

## 8. Frontend

Mantener el estado lo más local posible.

Evitar:

* contexts globales innecesarios,
* efectos encadenados,
* estado duplicado,
* props derivadas almacenadas como estado,
* callbacks y objetos recreados sin necesidad cuando produzcan renders problemáticos,
* lógica compleja dentro del render.

El render debería mostrar información ya preparada, no convertirse en el lugar donde se resuelve toda la lógica.

Separar claramente:

* datos,
* decisiones,
* transformación,
* render.

---

## 9. Backend y datos

Evitar patrones N+1.

No usar estructuras como:

`for -> await query`

cuando pueda resolverse mediante operaciones batch, joins, `IN`, agregaciones, transacciones u otra estrategia equivalente.

Reducir roundtrips innecesarios.

Mantener contratos claros entre capas.

No mezclar acceso a datos, lógica de negocio y transformación de salida cuando puedan mantenerse separados de forma simple.

---

## 10. Manejo de errores

No ocultar errores.

Evitar:

* `catch {}` vacío,
* fallbacks silenciosos,
* convertir errores en `undefined` sin contexto,
* mensajes genéricos cuando existe información útil.

Distinguir claramente:

* error interno,
* error de validación,
* estado esperado,
* mensaje mostrado al usuario.

Corregir causas antes que síntomas.

---

## 11. UI

Antes de introducir una solución visual nueva, revisar el sistema existente.

Mantener consistencia en:

* tipografía,
* espaciado,
* jerarquía,
* colores,
* bordes,
* componentes,
* tokens,
* comportamiento responsive.

No introducir decoración gratuita.

Evitar por defecto:

* gradientes,
* glassmorphism,
* sombras arbitrarias,
* border-radius innecesario,
* animaciones sin función,
* efectos visuales que compitan con el contenido.

La interfaz debe priorizar claridad, legibilidad y estructura.

Si CRITERIO-WEB ya posee una identidad visual documentada, esa identidad tiene prioridad sobre cualquier preferencia genérica.

---

## 12. Dependencias

No instalar dependencias sin necesidad.

Antes de agregar una:

1. comprobar si el proyecto ya resuelve el problema,
2. comprobar si el framework o runtime ya ofrece la capacidad,
3. evaluar el coste de mantenimiento,
4. comprobar compatibilidad con el stack actual.

No cambiar de package manager.

Usar el package manager definido por el repositorio.

Si el proyecto usa `pnpm`, mantener `pnpm`.

---

## 13. Versiones y stack

No asumir versiones.

Leerlas desde el repositorio.

No actualizar automáticamente:

* framework,
* runtime,
* TypeScript,
* paquetes principales,
* base de datos,
* tooling.

Las actualizaciones mayores o migraciones deben ser tareas explícitas.

---

## 14. Verificación

La verificación debe ser proporcional al cambio.

No ejecutar builds completos después de cada cambio menor si no aportan información útil.

Ejemplos:

### Cambio visual localizado

Revisar el resultado y ejecutar únicamente los checks relevantes.

### Cambio de lógica

Ejecutar tests o verificaciones relacionadas con el flujo afectado.

### Cambio estructural

Ejecutar typecheck, lint, tests y build cuando corresponda.

### Dependencias, configuración o infraestructura

Realizar verificaciones completas antes de cerrar el bloque.

Evitar checks redundantes por rutina.

---

## 15. Git

Git forma parte del proceso de desarrollo.

Antes de cerrar cada bloque lógico:

1. `git status`
2. `git --no-pager diff`
3. revisar exactamente qué cambió
4. `git add` únicamente de los archivos intencionales
5. `git commit`
6. `git push` cuando corresponda

No hacer commits por cada microcambio.

Agrupar cambios que representen una unidad coherente de trabajo.

No mezclar tareas distintas en un mismo commit.

---

## 16. Commits

Usar Conventional Commits.

Los mensajes deben tener tipo técnico y descripción en español.

Ejemplos:

* `feat: agregar filtro por estado`
* `fix: corregir cálculo de totales`
* `refactor: simplificar carga de criterios`
* `docs: actualizar arquitectura del proyecto`
* `style: ajustar jerarquía visual`
* `chore: actualizar configuración del entorno`
* `test: cubrir validación de formulario`

No usar mensajes vagos como:

* `cambios`
* `fix`
* `updates`
* `cosas`
* `final`

---

## 17. Seguridad

Nunca exponer ni commitear:

* tokens,
* contraseñas,
* API keys,
* cookies,
* credenciales,
* archivos `.env` reales,
* secretos.

No debilitar controles de seguridad para resolver errores rápidamente.

Si se detecta un secreto dentro del repositorio, señalarlo antes de continuar con cambios relacionados.

---

## 18. Documentación

La documentación debe preservar conocimiento que no resulte evidente leyendo el código.

Actualizar documentación cuando cambie:

* arquitectura,
* comportamiento importante,
* instalación,
* configuración,
* contratos,
* decisiones permanentes.

No crear documentación redundante.

Si existe una fuente de verdad, actualizarla en lugar de duplicarla.

---

## 19. Comunicación durante el trabajo

Ser directo.

Antes de un cambio relevante, explicar brevemente:

* qué problema se está resolviendo,
* cuál es la causa,
* qué archivos se tocarán,
* por qué esa solución encaja con el sistema.

No explicar cada línea obvia.

No generar largas introducciones antes de cambios pequeños.

Si se detectan problemas adicionales, clasificarlos como:

* bloqueante,
* deuda técnica,
* mejora opcional.

No resolver automáticamente los dos últimos si están fuera del alcance actual.

---

## 20. Continuidad entre sesiones

Al comenzar una sesión:

1. revisar estado del repo,
2. leer documentación necesaria,
3. identificar trabajo pendiente,
4. entender los últimos commits relevantes.

Al terminar un bloque:

1. verificar comportamiento,
2. revisar diff,
3. crear commit,
4. indicar brevemente el siguiente paso lógico.

El objetivo es que otra sesión pueda continuar sin reconstruir mentalmente todo el proyecto.

---

## 21. Qué evitar

No:

* reescribir el proyecto completo,
* cambiar arquitectura por preferencia,
* introducir abstracciones prematuras,
* crear archivos innecesarios,
* duplicar lógica,
* ocultar errores,
* usar `any` como solución rápida,
* crear N+1 queries,
* instalar paquetes triviales,
* cambiar el stack sin necesidad,
* modificar archivos no relacionados,
* hacer refactors laterales sin permiso,
* hacer commits gigantes,
* inventar requerimientos,
* asumir comportamientos no presentes en el código,
* priorizar documentación desactualizada sobre el comportamiento real sin verificar.

---

## 22. Criterio de decisión

Una modificación debería aportar una mejora concreta en al menos una de estas dimensiones:

* claridad,
* simplicidad,
* trazabilidad,
* estabilidad,
* rendimiento,
* mantenibilidad,
* capacidad de evolución.

Si aumenta la complejidad sin una ganancia concreta, no implementarla.

---

## 23. Principio operativo

Primero entender la estructura.

Después definir el límite.

Después modificar.

Después verificar.

Después cerrar el bloque con Git.

No corregir problemas estructurales al final si pueden evitarse desde el diseño inicial.
