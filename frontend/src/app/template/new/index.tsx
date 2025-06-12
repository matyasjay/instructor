import { PlusIcon } from "lucide-react";
import AlertButton from "@/components/feature/alert-button";
import FormLayout from "@/components/layout/form";
import { Button } from "@/components/ui/button";
import { ENDPOINT } from "@/lib/endpoints";
import { createTemplateForm } from "@/lib/forms";

export default function TemplateNew() {
  return (
    <AlertButton
      title="Create New Template"
      trigger={
        <Button className="cursor-pointer rounded-none" variant="outline">
          <PlusIcon />
          New Template
        </Button>
      }
      description="Fill in the details below then submit to create a new template."
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
