# Dirección visual

## Intención

Criterio Web usa una base oscura, técnica y editorial con una gramática pixel-art transversal. La
estética no depende solamente de las ilustraciones: también aparece en la geometría de la shell,
los marcos, la navegación, los controles, los estados y el scrollbar custom. El resultado busca ser
más cercano y memorable para personas que todavía no trabajan profesionalmente en desarrollo web,
sin quitarle rigor al contenido.

La referencia visual inicial está en `C:\Users\dicor\OneDrive\Escritorio\PIXELES`. Los PNG se
incorporan tal como fueron entregados, con sus fondos originales. Cuando existan versiones sin
fondo, pueden reemplazar los archivos homónimos dentro de `public/assets/pixeles/` sin cambiar el
catálogo ni la composición de las vistas. Como referencia de composición se observó
[`muga-electric`](https://muga-electric.vercel.app/): se toma su uso de marcos rectos, doble borde,
rayado exterior, etiquetas y sombras duras, pero no su paleta ni su temática.

## Criterios de uso

- Un recurso visual debe estar asociado a una idea, módulo o recorrido reconocible.
- El texto sigue siendo la fuente principal de información y conserva contraste y jerarquía.
- La interfaz usa superficies rectangulares, marcos por capas, esquinas cuadradas, pequeños
  escalones de 4 px y sombras desplazadas sin desenfoque. Los paneles pueden sumar un segundo
  borde desplazado con rayas diagonales en el espesor exterior, como una carcasa de terminal retro.
  No se usan biseles diagonales en las esquinas para representar el pixel art.
- La paleta combina azul noche, azul técnico, coral de acción, verde de validación y amarillo de
  advertencia; cada color debe conservar una función comprensible.
- Las líneas de separación, los badges de HUD, los puntos de control, los botones con sombra dura y
  la tipografía monoespaciada para labels construyen ambiente de juego/terminal sin competir con el
  contenido.
- No se aplican degradados, sombras brillantes, bordes redondeados ni filtros para compensar el
  fondo original de los PNG.
- Las imágenes decorativas deben tener `alt` descriptivo cuando aportan contexto; nunca se usan
  como único medio para comunicar una instrucción.
- Los focus states, los estados disabled y el contraste se mantienen visibles dentro de la misma
  gramática visual.
- El CSS propio conserva la estructura de la shell, el workspace y el scrollbar. Tailwind se
  incorpora gradualmente para composición y utilidades puntuales, usando los tokens compartidos.

## Mapa inicial de assets

| Archivo                                | Uso actual                            |
| -------------------------------------- | ------------------------------------- |
| `plantilla-narrativa-uno.png`          | Escena principal de Inicio            |
| `mapa-ruta.png`                        | Mapa de nodos del recorrido en Inicio |
| `modulo-01-documentacion.png`          | Módulo 01                             |
| `modulo-02-html.png`                   | Módulo 02                             |
| `modulo-03-css.png`                    | Módulo 03                             |
| `modulo-04-javascript.png`             | Módulo 04                             |
| `modulo-05-typescript.png`             | Módulo 05                             |
| `modulo-06-dom.png`                    | Módulo 06                             |
| `modulo-07-pruebas.png`                | Módulo 07                             |
| `progreso-validacion-persistencia.png` | Vista Progreso                        |
| `transferencia-publicacion.png`        | Vista Importar / Exportar             |

El resto de las muestras queda reservado para futuras vistas, lecciones y estados donde su
contenido visual aporte información específica.
