import { ENDPOINT } from '@/lib/endpoints';

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

export const REQUEST_KEY: Record<Endpoint, string> = {
  [ENDPOINT.SERVICE_CREATE]: 'instructor-service-create',
  [ENDPOINT.SERVICE_GET]: 'instructor-service-get',
  [ENDPOINT.TEMPLATE_CREATE]: 'instructor-template-create',
  [ENDPOINT.TEMPLATE_GET]: 'instructor-template-get',
  [ENDPOINT.USER_GET]: 'instructor-user-get',
  [ENDPOINT.USER_LOGIN]: 'instructor-user-login',
  [ENDPOINT.USER_CREATE]: 'instructor-user-signup',
} as const;
