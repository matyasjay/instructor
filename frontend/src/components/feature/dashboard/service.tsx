import { mapField } from "./fields";

type ServiceProps = {
  service: AggregatedService;
};

export default function Service({
  service: {
    id: _id,
    name: _name,
    private: _private,
    users: _users,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    ...service
  } = Object.create(null),
}: ServiceProps) {
  return Object.entries(service).map(([key, field]) => {
    const verticalSpace =
      {
        ["description"]: "4",
      }[key] ?? "0";

    const title =
      {
        ["templates"]: "Templates",
        ["description"]: "Description",
      }[key] ?? "";

    return !field || (Array.isArray(field) && !field.length) ? null : (
      <div key={key} className="flex flex-col">
        <div className={`w-full text-left px-5 pb-${verticalSpace}`}>
          <h2 className="font-bold text-lg text-primary/90 border-b-1 mb-4 border-primary/50">
            {title}
          </h2>
          {mapField({ field, key })}
        </div>
      </div>
    );
  });
}
