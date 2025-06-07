import AlertButton from "@/components/feature/alert-button";

export default function Template() {
  return (
    <AlertButton
      open
      title="Create New Template"
      trigger="New Template"
      triggerVariant="default"
      content={""}
      className="ml-3"
      description="Fill in the details below then submit to create a new template."
    />
  );
}
