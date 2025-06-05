import { useServices } from "@/lib/hooks/useServices";

function ServiceOwn() {
  const services = useServices();

  return (
    <div className="flex flex-col w-full gap-3.5 mx-auto min-h-10/12 px-9">
      <div className="w-full pt-4">
        <h1 className="flex scroll-m-20 text-lg font-semibold tracking-tight mb-4">
          Own Services
        </h1>
      </div>
      {services.user.map(({ name, id, description, private: isPrivate }) => (
        <div key={name}>
          {id} - {name}
          {description ? ` - ${description}` : ""}
          {isPrivate ? ` Private` : ""}
        </div>
      ))}
    </div>
  );
}

export default ServiceOwn;
