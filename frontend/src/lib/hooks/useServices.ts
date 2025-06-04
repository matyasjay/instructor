import { STORAGE } from "@/config/cookies";
import { authPost, normalizeObjectKeys } from "../utils";
import { ENDPOINTS } from "@/config/endpoints";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "@/config/query";
import { useEffect, useState } from "react";

type Service = {
  id: string;
  name: string;
};

export async function fetchServices() {
  const user = JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? "{}");
  const result = await authPost(
    ENDPOINTS.GET_SERVICES,
    { id: user.id },
    { skipNormalize: true }
  );
  return result;
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);

  const mutation = useMutation({
    mutationFn: fetchServices,
    mutationKey: [MUTATION_KEYS.GET_SERVICES],
    onSuccess: (data) => {
      setServices(data);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  return services.map(normalizeObjectKeys);
}
