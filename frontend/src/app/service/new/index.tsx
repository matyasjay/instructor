import { PlusIcon } from "lucide-react";
import AlertButton from "@/components/feature/alert-button";
import FormLayout from "@/components/layout/form";
import { Button } from "@/components/ui/button";
import { ENDPOINT } from "@/lib/endpoints";
import { createServiceForm } from "@/lib/forms";

export default function ServiceNew() {
  return (
    <AlertButton
      title="Create New Service"
      trigger={
        <Button className="cursor-pointer rounded-none">
          <PlusIcon />
          New Service
        </Button>
      }
      triggerVariant="link"
      content={
        <FormLayout
          form={createServiceForm}
          endpoint={ENDPOINT.SERVICE_CREATE}
        />
      }
      className="ml-3"
      description="Fill in the details below then submit to create a new service."
      width={200}
    />
  );
}
