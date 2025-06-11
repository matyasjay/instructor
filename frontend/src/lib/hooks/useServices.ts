import { ENDPOINT } from "@/lib/endpoints";
import useFetch from "@/lib/hooks/useFetch";

export function useServices(scope: "all" | "user"): {
  isPending: boolean;
  services: ServiceResponse[];
} {
  const { response, isPending } = useFetch<
    { private: boolean },
    ServiceResponse
  >({
    endpoint: ENDPOINT.SERVICE_GET,
    params: {
      private: scope === "user",
    },
  });

  const services = Array.isArray(response)
    ? response?.sort((a, b) => a.name.localeCompare(b.name))
    : [];

  return { isPending, services };
}
