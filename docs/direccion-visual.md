# Dirección visual

## Intención

Criterio Web conserva una base oscura, técnica y editorial, pero incorpora una capa visual más
cercana y memorable para personas que todavía no trabajan profesionalmente en desarrollo web. Las
imágenes pixel-art funcionan como señales de orientación: presentan una capacidad concreta sin
reemplazar el contenido ni convertir la interfaz en un tablero decorativo.

La referencia visual inicial está en `C:\Users\dicor\OneDrive\Escritorio\PIXELES`. Los PNG se
incorporan tal como fueron entregados, con sus fondos originales. Cuando existan versiones sin
fondo, pueden reemplazar los archivos homónimos dentro de `public/assets/pixeles/` sin cambiar el
catálogo ni la composición de las vistas.

## Criterios de uso

- Un recurso visual debe estar asociado a una idea, módulo o recorrido reconocible.
- El texto sigue siendo la fuente principal de información y conserva contraste y jerarquía.
- Los marcos, líneas y espacios respetan la shell oscura y la composición rectangular existente.
- No se aplican degradados, sombras brillantes ni filtros para compensar el fondo original.
- Las imágenes decorativas deben tener `alt` descriptivo cuando aportan contexto; nunca se usan
  como único medio para comunicar una instrucción.
- El CSS propio conserva la estructura de la shell, el workspace, el scrollbar y los estados de
  accesibilidad. Tailwind se incorpora gradualmente para composición y utilidades puntuales.

## Mapa inicial de assets

| Archivo                       | Uso actual                 |
| ----------------------------- | -------------------------- |
| `plantilla-narrativa-uno.png` | Escena principal de Inicio |
| `modulo-01-documentacion.png` | Módulo 01                  |
| `modulo-02-html.png`          | Módulo 02                  |
| `modulo-03-css.png`           | Módulo 03                  |
| `modulo-04-javascript.png`    | Módulo 04                  |
| `modulo-05-typescript.png`    | Módulo 05                  |
| `modulo-06-dom.png`           | Módulo 06                  |
| `modulo-07-pruebas.png`       | Módulo 07                  |

El resto de las muestras queda reservado para futuras vistas, lecciones y estados donde su
contenido visual aporte información específica.
