export const PAGES = {
  PUBLIC: {
    LANDING: "/landing",
    SIGNUP: "/signup",
    LOGIN: "/login",
    SERVICES: "/explore",
  },
  PRIVATE: {
    DASHBOARD: "/app/dashboard",
    SERVICE_OWN: "/app/service/own",
    SERVICE_ALL: "/app/service/all",
    SERVICE_NEW: "/app/service/new",
  },
} as const;
