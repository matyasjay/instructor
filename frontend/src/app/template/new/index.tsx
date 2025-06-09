import AlertButton from "@/components/feature/alert-button";
import FormLayout from "@/components/layout/form";
import { ENDPOINT } from "@/lib/endpoints";
import { createTemplateForm } from "@/lib/forms";

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
          endpoint={ENDPOINT.TEMPLATE_CREATE}
        />
      }
      triggerVariant="default"
      className="ml-3"
    />
  );
}
