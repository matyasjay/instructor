import { z } from "zod";
import { ENDPOINTS } from "@/config/endpoints";
import { MUTATION_KEYS } from "@/config/query";
import useForm from "@/lib/hooks/useForm";

export default function SignupForm() {
  return useForm({
    schema: z.object({
      email: z.string().email(),
      name: z.string().min(5).max(30),
      password: z.string().min(8),
      password_confirm: z.string().min(8),
    }),
    endpoint: ENDPOINTS.SIGNUP,
    mutationKey: MUTATION_KEYS.SIGNUP,
  });
}
