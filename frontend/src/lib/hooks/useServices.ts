import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { STORAGE } from "@/config/cookies";
import { ENDPOINTS } from "@/config/endpoints";
import { MUTATION_KEYS } from "@/config/query";
import { authPost, normalizeObjectKeys } from "../utils";

export async function fetchService(service: "all" | "user") {
  const user = JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? "{}");

  const endpoint = {
    ["all"]: ENDPOINTS.GET_SERVICES_ALL,
    ["user"]: ENDPOINTS.GET_SERVICES_USER,
  }[service];

  const result = await authPost<{ id: string }, AggregatedService[]>(
    endpoint,
    { id: user.id },
    { skipNormalize: true }
  );

  return result;
}

export function useServices(scope: "all" | "user"): AggregatedService[] {
  const [services, setServices] = useState<AggregatedService[]>(Array(0));

  const mutation = useMutation({
    mutationFn: fetchService,
    mutationKey: [MUTATION_KEYS.GET_SERVICES],
    onSuccess: (data) => {
      if (Array.isArray(data)) {
        setServices(data);
      }
    },
  });

  useEffect(() => {
    mutation.mutate(scope);
  }, []); // eslint-disable-line

  return services?.map(normalizeObjectKeys);
}
