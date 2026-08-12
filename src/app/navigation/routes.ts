export const appRoutes = [
  {
    id: "home",
    path: "/",
    label: "Inicio",
    eyebrow: "Punto de partida",
    title: "Inicio",
    description: "Un espacio de práctica guiada para aprender a tomar mejores decisiones web.",
    placeholderTitle: "Elegí un módulo para comenzar",
    placeholderDescription:
      "Recorré los siete módulos publicados, registrá el cierre de tus lecciones en este navegador y revisá tu avance desde Progreso.",
  },
  {
    id: "modules",
    path: "/modulos",
    label: "Módulos",
    eyebrow: "Recorrido educativo",
    title: "Módulos",
    description:
      "Explorá los siete módulos publicados para practicar cómo observar, construir y verificar decisiones web.",
    placeholderTitle: "Módulos publicados",
    placeholderDescription:
      "Elegí un módulo para leer sus lecciones y registrar el cierre explícito de cada una.",
  },
  {
    id: "progress",
    path: "/progreso",
    label: "Progreso",
    eyebrow: "Estado local",
    title: "Progreso",
    description:
      "Consultá el estado de avance local de tu recorrido y la evidencia registrada por cada módulo.",
    placeholderTitle: "Estado local del recorrido",
    placeholderDescription:
      "El avance se guarda en este navegador y se puede revisar módulo por módulo.",
  },
  {
    id: "transfer",
    path: "/transferencia",
    label: "Importar / Exportar",
    eyebrow: "Transferencia portable",
    title: "Importar / Exportar",
    description:
      "Transferí tu progreso entre entornos mediante un token portable validado localmente.",
    placeholderTitle: "Transferencia portable",
    placeholderDescription:
      "Exportá o importá tu snapshot local sin conectarte a ningún servicio externo.",
  },
] as const;

export type AppRoute = (typeof appRoutes)[number];
