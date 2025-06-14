import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { STORAGE } from '@/lib/cookies';
import { REQUEST_KEY } from '../query';
import { authPost, normalizeObjectKeys } from '../utils';

type UseFetchProps<P = Record<string, unknown>> = {
  endpoint: Endpoint;
  params?: P;
};

function _fetch<P, R>(endpoint: Endpoint, params?: P) {
  const user = JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? '{}');
  return async function post() {
    const response = authPost<P, R>(
      endpoint,
      { ...(params ?? Object.create(null)), userId: user.id },
      { skipNormalize: true },
    );

    if ('error' in response) {
      throw response.error;
    }
    return response as Promise<R>;
  };
}

export default function useFetch<P = Record<string, unknown>, R = Record<string, unknown>>({
  params,
  endpoint,
}: UseFetchProps<P>): {
  isPending: boolean;
  response: Nullable<R | R[]>;
} {
  const [delayFinished, setDelayFinished] = useState(false);

  const {
    isPending: rawIsPending,
    data,
    mutate,
  } = useMutation<R>({
    mutationFn: _fetch<P, R>(endpoint, params),
    mutationKey: [REQUEST_KEY[endpoint]],
    onSuccess: (data) => {
      if (Object(data).error) {
        return [];
      }
      return data;
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayFinished(true);
    }, 200);

    mutate();

    return () => clearTimeout(timeout);
  }, []); // eslint-disable-line

  const response = Array.isArray(data) ? data.filter(Boolean).map<R>(normalizeObjectKeys) : normalizeObjectKeys(data);

  const isPending = rawIsPending || !delayFinished;

  return { isPending, response };
}
