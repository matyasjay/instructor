import z from "zod";
import AlertButton from "@/components/feature/alert-button";
import { ENDPOINTS } from "@/config/endpoints";
import { MUTATION_KEYS } from "@/config/query";
import { FormLayout } from "@/lib/hooks/useForm";

const schema = z.object({
  service: z.string(),
  name: z.string().min(5).max(30),
  private: z.boolean(),
  description: z.string().min(10).max(150).optional(),
  user: z.string().optional(),
});

export default function ServiceNew() {
  return (
    <AlertButton
      open
      title="Create New Service"
      trigger="New Service"
      triggerVariant="default"
      content={
        <FormLayout
          schema={schema}
          endpoint={ENDPOINTS.CREATE_SERVICE}
          mutationKey={MUTATION_KEYS.CREATE_SERVICE}
        />
      }
      className="ml-3"
      description="Fill in the details below then submit to create a new service."
    />
  );
}
