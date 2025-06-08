import { PlusIcon } from "lucide-react";
import AlertButton from "@/components/feature/alert-button";
import FormLayout from "@/components/layout/form";
import { Button } from "@/components/ui/button";
import { ENDPOINTS } from "@/lib/endpoints";
import { createServiceForm } from "@/lib/forms";
import { MUTATION_KEYS } from "@/lib/query";

export default function ServiceNew() {
  return (
    <AlertButton
      title="Create New Service"
      trigger={
        <Button className="cursor-pointer">
          <PlusIcon />
          New Service
        </Button>
      }
      triggerVariant="link"
      content={
        <FormLayout
          form={createServiceForm}
          endpoint={ENDPOINTS.CREATE_SERVICE}
          mutationKey={MUTATION_KEYS.CREATE_SERVICE}
        />
      }
      className="ml-3"
      description="Fill in the details below then submit to create a new service."
      width={200}
    />
  );
}
