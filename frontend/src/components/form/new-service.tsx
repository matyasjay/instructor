import { z } from "zod";
import { ENDPOINTS } from "@/config/endpoints";
import { MUTATION_KEYS } from "@/config/query";
import useForm from "@/lib/hooks/useForm";

export default function NewServiceForm() {
  return useForm({
    mutationKey: MUTATION_KEYS.CREATE_SERVICE,
    endpoint: ENDPOINTS.CREATE_SERVICE,
    schema: z.object({
      service: z.string(),
      name: z.string().min(5).max(30),
      private: z.boolean(),
      description: z.string().min(10).max(150).optional(),
      user: z.string().optional(),
    }),
  });
}
