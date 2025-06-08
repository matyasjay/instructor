import AlertButton from "@/components/feature/alert-button";
import FormLayout from "@/components/layout/form";
import { ENDPOINTS } from "@/config/endpoints";
import { MUTATION_KEYS } from "@/config/query";
import { createServiceForm } from "@/lib/forms";

export default function ServiceNew() {
  return (
    <AlertButton
      open
      title="Create New Service"
      trigger="New Service"
      triggerVariant="default"
      content={
        <FormLayout
          form={createServiceForm}
          endpoint={ENDPOINTS.CREATE_SERVICE}
          mutationKey={MUTATION_KEYS.CREATE_SERVICE}
        />
      }
      className="ml-3"
      description="Fill in the details below then submit to create a new service."
    />
  );
}
