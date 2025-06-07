import AlertButton from "@/components/feature/alert-button";
import NewServiceForm from "@/components/form/new-service";

export default function ServiceNew() {
  return (
    <AlertButton
      open
      title="Create New Service"
      trigger="New Service"
      triggerVariant="default"
      content={<NewServiceForm />}
      className="ml-3"
      description="Fill in the details below then submit to create a new service."
    />
  );
}
