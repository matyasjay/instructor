import { mapField, mapKey } from "./fields";

type ServiceProps = {
  service: Service;
};

export default function Service({
  service: { id: _id, name: _name, ...service } = Object.create(null),
}: ServiceProps) {
  return Object.entries(service).map(([key, field]) =>
    !mapKey(key) ? null : (
      <div key={key} className="flex">
        <div className="w-40 text-right p-5 pr-5 font-bold m-0">
          {mapKey(key)}
        </div>
        <div className="w-full text-left p-5">{mapField({ field, key })}</div>
      </div>
    ),
  );
}
