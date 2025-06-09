import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { EyeOffIcon, EyeIcon, WrenchIcon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/lib/utils";

dayjs.extend(relativeTime);

function mapTemplate(field: Field) {
  const { id, name, template, description, updatedAt } = Object(
    field,
  ) as Template;

  return (
    <div className="flex flex-col relative mb-4" key={id}>
      <div className="capitalize w-full flex items-center bg-secondary border-x-1 border-t-1 border-white/20 p-2">
        <div className="flex flex-col ml-auto bg-secondary w-full justify-center h-full p-2">
          <h1 className="font-bold mr-auto">{name}</h1>
          <span className="text-xs italic">
            {`Updated ${dayjs(updatedAt).fromNow()}`}
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
        <div className="px-4 py-2 w-full">
          <p>{description}</p>
          <div className="block w-full mt-3">
            {!template ? (
              <span className="block w-full rich-text bg-sidebar p-3 py-5 border-x-1 border-y-1 border-white/30">
                &nbsp;
              </span>
            ) : (
              <span
                className="block w-full rich-text bg-sidebar p-3 py-5 border-x-1 border-y-1 border-white/30"
                dangerouslySetInnerHTML={{
                  __html: template.replace(/(\$[\w]+)/g, "<strong>$1</strong>"),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapUsers(user: Field) {
  const _user = Object(user);
  return (
    <Badge key={_user.id} className="bg-primary/40 px-2 rounded-none">
      {_user.name}
    </Badge>
  );
}

function mapArray(fields: Field[], key: string) {
  return fields.length > 0
    ? fields.map(
        {
          templates: mapTemplate,
          users: mapUsers,
        }[key] ?? (() => <></>),
      )
    : null;
}

function mapString(field: string, key: string) {
  return (
    <div className="w-full">
      {{
        createdAt: `Created ${dayjs(field).fromNow()}`,
        updatedAt: `Updated ${dayjs(field).fromNow()}`,
        templates: field.split(" ").map(capitalizeFirstLetter).join(" "),
      }[key + ""] ??
        field ??
        null}
    </div>
  );
}

function mapBool(field: boolean, key: string) {
  const value = {
    private: {
      true: (
        <div className="flex items-center">
          <Button
            variant="outline"
            className="w-30 cursor-pointer rounded-none m-0"
          >
            <EyeOffIcon width={20} />
            Private
          </Button>
        </div>
      ),
      false: (
        <div className="flex items-center ">
          <Button
            variant="outline"
            className="w-30 cursor-pointer rounded-none m-0"
          >
            <EyeIcon width={20} />
            Public
          </Button>
        </div>
      ),
    },
  }[key] ?? {
    true: "Yes",
    false: "No",
  };

  return value[(field + "") as keyof typeof value];
}

export default function mapServiceField(field: Field, key: string) {
  const type: string = Array.isArray(field) ? "array" : typeof field;

  return (
    {
      ["string"]: () => mapString(field + "", key),
      ["boolean"]: () => mapBool(!!field, key),
      ["array"]: () => mapArray([...Object(field)], key),
    }[type] ?? (() => null)
  )();
}
