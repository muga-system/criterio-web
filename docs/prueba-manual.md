# Prueba manual de la primera versión

Esta guía sirve para recorrer Criterio Web de principio a fin y comprobar la experiencia que cubre
la primera versión. El producto es estático y local-first: no requiere una cuenta, un backend ni una
conexión para guardar el avance.

## Preparación

1. Usar Node.js `24.14.0` y npm `11` o superior.
2. Instalar dependencias con `npm ci`.
3. Ejecutar `npm run verify` para pasar formato, lint, tipos, tests, build, accesibilidad y smoke E2E.
4. Iniciar la app con `npm run dev` y abrir la URL local que informe Astro.

Si Playwright informa que falta un navegador en una instalación nueva, ejecutar una vez
`npx playwright install` y repetir `npm run verify`.

## Recorrido principal

### 1. Inicio

- Confirmar que la shell muestra Inicio como sección activa.
- Usar el enlace de salto para llevar el foco al workspace.
- Activar **Explorar módulos** y comprobar que abre el catálogo.
- Volver a Inicio y comprobar que **Ver mi progreso** abre el estado local.
- En un viewport angosto, verificar que no aparece scroll horizontal del navegador y que el workspace
  conserva su desplazamiento interno.

### 2. Catálogo y módulos estáticos

- Confirmar que el catálogo muestra los siete módulos.
- Abrir el Módulo 01 desde su tarjeta.
- Usar la navegación interna para saltar a una lección.
- Leer una lección y activar **Marcar como completada**.
- Recargar la página y comprobar que el cierre continúa registrado.
- Repetir el cierre para las tres lecciones del Módulo 01.
- Ir a Progreso y comprobar que el módulo figura como **Práctica externa pendiente**: la app no debe
  inventar una verificación que ocurre fuera de ella.

### 3. Práctica local del Módulo 06

- Abrir el Módulo 06 desde el catálogo.
- Avanzar por sus tres estados con **Siguiente lección**.
- Confirmar el estado final **Completada**.
- Recargar y comprobar que la práctica conserva el estado en IndexedDB.
- Activar **Reiniciar** y confirmar que vuelve a la primera lección.

### 4. Progreso y reinicio

- Abrir Progreso y revisar el resumen y las siete tarjetas.
- Activar **Reiniciar progreso local**.
- Cancelar la confirmación y verificar que no cambió el estado.
- Repetir la acción y confirmar el reinicio.
- Recargar Progreso y comprobar que todos los módulos vuelven a **Sin iniciar**.

### 5. Transferencia portable

- Recorrer al menos una lección o la práctica del Módulo 06.
- Abrir Importar / Exportar y generar un token.
- Copiarlo o seleccionarlo manualmente.
- Probar la importación en un perfil o contexto de navegador limpio.
- Volver a probarla cuando ya existe avance local: la app debe pedir confirmación y permitir cancelar
  sin reemplazar el snapshot.
- Recordar que el token es portable pero no está cifrado ni firmado; no es un secreto.

## Resultado esperado

La primera versión queda lista para probar cuando las rutas son navegables, el workspace es el único
espacio de desplazamiento, el avance se conserva tras recargar, el reinicio permite repetir el flujo,
la transferencia reemplaza solo después de confirmar y `npm run verify` termina sin errores.
