import { WrenchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type TemplateProps = {
  template: Template;
  mapField: (props: { field: Field; key: string }) => React.ReactNode;
};

export default function Template({
  template: {
    id: _id,
    name: _name,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    ...template
  },
  mapField,
}: TemplateProps) {
  return (
    <div className="flex flex-col relative" key={_id}>
      <div className="font-extrabold capitalize w-full flex items-center">
        <h1>{_name}</h1>
        <Button variant="ghost" className="cursor-pointer font-bold ml-auto">
          <WrenchIcon />
          Configure
        </Button>
      </div>
      <div className="w-full mt-2">
        {Object.entries(template).map(([key, field]) => (
          <div key={key} className="flex relative">
            {mapField({ field, key })}
          </div>
        ))}
      </div>
    </div>
  );
}
