import { z } from "zod";
import { ENDPOINTS } from "@/config/endpoints";
import { MUTATION_KEYS } from "@/config/query";
import useForm from "@/lib/hooks/useForm";

export default function LoginForm() {
  return useForm({
    schema: z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
    endpoint: ENDPOINTS.LOGIN,
    mutationKey: MUTATION_KEYS.LOGIN,
  });
}
