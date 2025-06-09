import { Separator } from "@radix-ui/react-separator";
import { TrashIcon, WrenchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mapString } from "./fields";

type TemplateProps = {
  template: Template;
  mapField: (props: { field: Field; key: string }) => React.ReactNode;
};

export default function Template({
  template: { id, name, createdAt: _, updatedAt, ...template },
  mapField,
}: TemplateProps) {
  return (
    <div className="flex flex-col relative mb-4" key={id}>
      <div className="capitalize w-full flex items-center bg-secondary border-x-1 border-t-1 border-white/20 p-2">
        <div className="flex flex-col ml-auto bg-secondary w-full justify-center h-full p-2">
          <h1 className="font-bold mr-auto">{name}</h1>
          <span className="text-xs italic">
            {mapString(updatedAt + "", "updatedAt")}
          </span>
        </div>
        <Button variant="outline" className="w-30 cursor-pointer rounded-none">
          <WrenchIcon />
          Configure
        </Button>
        <Button
          variant="outline"
          className="w-30 cursor-pointer rounded-none text-destructive hover:text-destructive"
        >
          <TrashIcon className="text-destructive" />
          Remove
        </Button>
      </div>
      <div className="w-full border-x-1 border-b-1 border-white/20">
        <Separator className="border-b-1 border-white/20 mb-2 w-full" />
        <div className="px-4 py-2">
          {Object.entries(template).map(([key, field]) => (
            <div key={key} className="flex relative">
              {mapField({ field, key })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
