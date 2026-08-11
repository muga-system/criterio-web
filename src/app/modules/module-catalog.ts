export const moduleCatalog = [
  {
    id: "orientacion-web-01",
    path: "/modulos/orientacion-web-01",
    title: "Módulo 01 · Observar antes de construir",
    summary:
      "Aprender a separar pedido, problema, evidencia, criterio, decisión y verificación antes de escribir código.",
    lessonCount: 3,
    status: "Contenido inicial",
  },
] as const;

export type ModuleSummary = (typeof moduleCatalog)[number];
