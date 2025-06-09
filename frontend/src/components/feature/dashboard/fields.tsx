import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import Template from "@/components/feature/dashboard/template";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/utils";

dayjs.extend(relativeTime);

export function mapTemplates(template: Field) {
  const _template = Object(template);
  return (
    <Template key={_template.id} template={_template} mapField={mapField} />
  );
}

export function mapPrompt(prompt: string | undefined) {
  return (
    <div className="block w-full mt-3" key={prompt}>
      {!prompt ? (
        <span className="block w-full rich-text bg-sidebar p-3 py-5 border-x-1 border-y-1 border-white/30">
          &nbsp;
        </span>
      ) : (
        <span
          className="block w-full rich-text bg-sidebar p-3 py-5 border-x-1 border-y-1 border-white/30"
          dangerouslySetInnerHTML={{
            __html: prompt.replace(/(\$[\w]+)/g, "<strong>$1</strong>"),
          }}
        />
      )}
    </div>
  );
}

export function mapUsers(user: Field) {
  const _user = Object(user);
  return (
    <Badge key={_user.id} className="bg-primary/40 px-2 rounded-none">
      {_user.name}
    </Badge>
  );
}

export function mapArray(fields: Field[], key: string) {
  return fields.length > 0
    ? fields.map(
        {
          templates: mapTemplates,
          users: mapUsers,
        }[key] ?? (() => <></>),
      )
    : null;
}

export function mapString(field: string, key: string) {
  return (
    <div className="w-full">
      {{
        createdAt: `Created ${dayjs(field).fromNow()}`,
        updatedAt: `Updated ${dayjs(field).fromNow()}`,
        templates: field.split(" ").map(capitalizeFirstLetter).join(" "),
        template: mapPrompt(field),
      }[key + ""] ??
        field ??
        null}
    </div>
  );
}

export function mapBool(field: boolean, key: string) {
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

export function mapField({ field, key }: { field: Field; key: string }) {
  const type: string = Array.isArray(field) ? "array" : typeof field;

  return (
    {
      ["string"]: () => mapString(field + "", key),
      ["boolean"]: () => mapBool(!!field, key),
      ["array"]: () => mapArray([...Object(field)], key),
    }[type] ?? (() => null)
  )();
}
