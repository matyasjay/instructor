import z from "zod";
import AlertButton from "@/components/feature/alert-button";
import { ENDPOINTS } from "@/config/endpoints";
import { MUTATION_KEYS } from "@/config/query";
import { FormLayout } from "@/lib/hooks/useForm";

const schema = z.object({
  user: z.string(),
  name: z.string(),
  description: z.string(),
  template: z.string(),
  service: z.string(),
  input: z.string(),
  variable: z.string(),
});

export default function TemplateNew() {
  return (
    <AlertButton
      title="Create New Template"
      trigger="New Template"
      description="Fill in the details below then submit to create a new template."
      open
      content={
        <FormLayout
          schema={schema}
          endpoint={ENDPOINTS.CREATE_TEMPLATE}
          mutationKey={MUTATION_KEYS.CREATE_TEMPLATE}
        />
      }
      triggerVariant="default"
      className="ml-3"
    />
  );
}
