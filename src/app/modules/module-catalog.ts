export const moduleCatalog = [
  {
    id: "orientacion-web-01",
    path: "/modulos/orientacion-web-01",
    title: "Módulo 01 · Observar antes de construir",
    summary:
      "Aprender a separar pedido, problema, evidencia, criterio, decisión y verificación antes de escribir código.",
    lessonCount: 3,
    status: "Contenido inicial",
    lessons: [
      { id: "leccion-01", title: "Lección 01 · Del pedido al problema" },
      { id: "leccion-02", title: "Lección 02 · Evidencia y criterio" },
      { id: "leccion-03", title: "Lección 03 · Decisión y verificación" },
      { id: "practica-integradora", title: "Práctica integradora" },
    ],
  },
  {
    id: "html-semantico-02",
    path: "/modulos/html-semantico-02",
    title: "Módulo 02 · Estructurar antes de decorar",
    summary:
      "Aprender a expresar regiones, jerarquías y relaciones del contenido con HTML semántico antes de aplicar estilos.",
    lessonCount: 3,
    status: "Contenido inicial",
    lessons: [
      { id: "leccion-01", title: "Lección 01 · Significado antes que apariencia" },
      { id: "leccion-02", title: "Lección 02 · Regiones y agrupaciones" },
      { id: "leccion-03", title: "Lección 03 · Títulos, texto y listas" },
      { id: "practica-integradora", title: "Práctica integradora" },
    ],
  },
  {
    id: "css-composicion-03",
    path: "/modulos/css-composicion-03",
    title: "Módulo 03 · Componer sin pelear con la estructura",
    summary:
      "Aprender a aplicar cascada, layout y responsive sin trasladar al CSS las responsabilidades del HTML.",
    lessonCount: 3,
    status: "Contenido inicial",
    lessons: [
      { id: "leccion-01", title: "Lección 01 · Cascada y conflictos" },
      { id: "leccion-02", title: "Lección 02 · Flujo, Flexbox y Grid" },
      { id: "leccion-03", title: "Lección 03 · Composición responsive" },
      { id: "practica-integradora", title: "Práctica integradora" },
    ],
  },
  {
    id: "javascript-navegador-04",
    path: "/modulos/javascript-navegador-04",
    title: "Módulo 04 · Hacer explícito el comportamiento",
    summary:
      "Aprender a representar datos, tomar decisiones y organizar funciones antes de conectar JavaScript con la interfaz.",
    lessonCount: 3,
    status: "Contenido inicial",
    lessons: [
      { id: "leccion-01", title: "Lección 01 · Datos que representan una situación" },
      { id: "leccion-02", title: "Lección 02 · Decisiones y casos límite" },
      { id: "leccion-03", title: "Lección 03 · Funciones y estado explícito" },
      { id: "practica-integradora", title: "Práctica integradora" },
    ],
  },
  {
    id: "typescript-05",
    path: "/modulos/typescript-05",
    title: "Módulo 05 · Hacer visibles los contratos",
    summary:
      "Aprender a expresar datos y estados válidos con TypeScript para detectar errores antes de ejecutar.",
    lessonCount: 3,
    status: "Contenido inicial",
    lessons: [
      { id: "leccion-01", title: "Lección 01 · Tipos como contratos" },
      { id: "leccion-02", title: "Lección 02 · Estados válidos y narrowing" },
      { id: "leccion-03", title: "Lección 03 · Fronteras desconocidas" },
      { id: "practica-integradora", title: "Práctica integradora" },
    ],
  },
  {
    id: "dom-eventos-06",
    path: "/modulos/dom-eventos-06",
    title: "Módulo 06 · Conectar estado y representación",
    summary:
      "Aprender a conectar un modelo explícito con el DOM y eventos nativos sin perder el control del estado.",
    lessonCount: 3,
    status: "Contenido inicial",
    lessons: [
      { id: "leccion-01", title: "Lección 01 · El DOM como representación" },
      { id: "leccion-02", title: "Lección 02 · Eventos y controles nativos" },
      { id: "leccion-03", title: "Lección 03 · Estado, actualización y render" },
      { id: "practica-integradora", title: "Práctica integradora" },
    ],
  },
] as const;

export type ModuleSummary = (typeof moduleCatalog)[number];
