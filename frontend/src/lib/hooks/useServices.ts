import { ENDPOINT } from "@/lib/endpoints";
import useFetch from "@/lib/hooks/useFetch";

export function useServices(scope: "all" | "user"): {
  isPending: boolean;
  services: Service[];
} {
  const { response, isPending } = useFetch<{ private: boolean }, Service>({
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
