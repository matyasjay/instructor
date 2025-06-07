import z from "zod";
import { ENDPOINTS } from "@/config/endpoints";
import { MUTATION_KEYS } from "@/config/query";
import useForm from "@/lib/hooks/useForm";

export default function NewTemplateForm() {
  return useForm({
    mutationKey: MUTATION_KEYS.CREATE_TEMPLATE,
    endpoint: ENDPOINTS.CREATE_TEMPLATE,
    schema: z.object({
      user: z.string(),
      name: z.string(),
      description: z.string(),
      template: z.string(),
      service: z.string(),
      input: z.string(),
      variable: z.string(),
    }),
  });
}
