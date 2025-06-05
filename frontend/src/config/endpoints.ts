export const ENDPOINTS = {
  ME: "/private/me",
  USER: "/user",
  CURRENT_USER: "/private/user/current",
  SIGNUP: "/user/create",
  TEMPLATE: "/template",
  CREATE_SERVICE: "/private/service/create",
  GET_SERVICES_ALL: "/private/service/all",
  GET_SERVICES_USER: "/private/service/user",
} as const;
