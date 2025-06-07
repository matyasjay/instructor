export const ENDPOINTS = {
  TEMPLATE: "/template",

  LOGIN: "/user/login",
  SIGNUP: "/user/create",

  ME: "/auth/me",
  CURRENT_USER: "/auth/user/current",
  CREATE_SERVICE: "/auth/service/create",
  CREATE_TEMPLATE: "/auth/template/create",
  GET_SERVICES_ALL: "/auth/service/all",
  GET_SERVICES_USER: "/auth/service/user",
} as const;
