import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { STORAGE } from "@/config/cookies";
import { ENDPOINTS } from "@/config/endpoints";
import { MUTATION_KEYS } from "@/config/query";
import { authPost, normalizeObjectKeys } from "../utils";

const defaultServicesState = {
  all: [],
  user: [],
};

export async function fetchServices() {
  const user = JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? "{}");

  const allServicesPromise = authPost(
    ENDPOINTS.GET_SERVICES_ALL,
    { id: user.id },
    { skipNormalize: true },
  );

  const userServicesPromise = authPost(
    ENDPOINTS.GET_SERVICES_USER,
    { id: user.id },
    { skipNormalize: true },
  );

  const [allServices, userServices] = await Promise.all([
    allServicesPromise,
    userServicesPromise,
  ]);

  return {
    all: allServices,
    user: userServices,
  };
}

export function useServices(): Services {
  const [services, setServices] = useState<Services>(defaultServicesState);

  const mutation = useMutation({
    mutationFn: fetchServices,
    mutationKey: [MUTATION_KEYS.GET_SERVICES],
    onSuccess: (data) => {
      setServices(data);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []); // eslint-disable-line

  return Object.entries(services).reduce(
    (acc, [name, service]) => ({
      ...acc,
      [name]: service?.map(normalizeObjectKeys) ?? [],
    }),
    Object.create(null),
  );
}
