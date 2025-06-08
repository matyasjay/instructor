import AlertButton from "@/components/feature/alert-button";
import FormLayout from "@/components/layout/form";
import { ENDPOINTS } from "@/lib/endpoints";
import { createTemplateForm } from "@/lib/forms";
import { MUTATION_KEYS } from "@/lib/query";

export default function TemplateNew() {
  return (
    <AlertButton
      title="Create New Template"
      trigger="New Template"
      description="Fill in the details below then submit to create a new template."
      open
      content={
        <FormLayout
          form={createTemplateForm}
          endpoint={ENDPOINTS.CREATE_TEMPLATE}
          mutationKey={MUTATION_KEYS.CREATE_TEMPLATE}
        />
      }
      triggerVariant="default"
      className="ml-3"
    />
  );
}
