import AlertButton from "@/components/feature/alert-button";
import NewTemplateForm from "@/components/form/new-template";

export default function ServiceNew() {
  return (
    <AlertButton
      open
      title="Create New Template"
      trigger="New Template"
      triggerVariant="default"
      content={<NewTemplateForm />}
      className="ml-3"
      description="Fill in the details below then submit to create a new template."
    />
  );
}
