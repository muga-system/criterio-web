export const appRoutes = [
  {
    id: "home",
    path: "/",
    label: "Inicio",
    eyebrow: "Punto de partida",
    title: "Inicio",
    description: "Un espacio de práctica guiada para aprender a tomar mejores decisiones web.",
    placeholderTitle: "La ruta de aprendizaje empieza acá",
    placeholderDescription:
      "Más adelante vas a encontrar la orientación inicial, el contexto del sistema y el próximo paso sugerido.",
  },
  {
    id: "modules",
    path: "/modulos",
    label: "Módulos",
    eyebrow: "Recorrido educativo",
    title: "Módulos",
    description:
      "Explorá los contenidos educativos disponibles cuando la estructura pedagógica esté definida.",
    placeholderTitle: "Todavía no hay módulos publicados",
    placeholderDescription:
      "Esta vista queda preparada para recibir el listado de módulos sin anticipar rutas ni contenidos específicos.",
  },
  {
    id: "progress",
    path: "/progreso",
    label: "Progreso",
    eyebrow: "Estado local",
    title: "Progreso",
    description:
      "Consultá el estado de avance local de tu recorrido cuando esa lógica esté disponible.",
    placeholderTitle: "El progreso todavía no se registra",
    placeholderDescription:
      "La persistencia y los indicadores de avance se incorporarán después de definir el modelo de aprendizaje.",
  },
  {
    id: "transfer",
    path: "/transferencia",
    label: "Importar / Exportar",
    eyebrow: "Transferencia portable",
    title: "Importar / Exportar",
    description:
      "Transferí tu progreso entre entornos mediante un token portable cuando se implemente esa capacidad.",
    placeholderTitle: "La transferencia todavía no está disponible",
    placeholderDescription:
      "Esta vista reservará el espacio para importar o exportar el progreso sin conectarse todavía a ningún servicio externo.",
  },
] as const;

export type AppRoute = (typeof appRoutes)[number];
