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
] as const;

export type ModuleSummary = (typeof moduleCatalog)[number];
