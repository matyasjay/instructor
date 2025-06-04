export const defaultOptions = {
  defaultOptions: {
    queries: {
      throwOnError: true,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60,
    },
  },
};

export const QUERY_KEYS = {
  ME: "instructor-me-get",
  USER: "instructor-user-get",
};

export const MUTATION_KEYS = {
  SIGNUP: "instructor-user-signup",
  LOGIN: "instructor-user-login",
  CREATE_SERVICE: "instructor-service-create",
  GET_SERVICES: "instructor-services-get",
};
