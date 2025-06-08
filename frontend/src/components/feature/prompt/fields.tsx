import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/utils";
import Template from "./template";

dayjs.extend(relativeTime);

export function mapKey(key: string) {
  const keyMap =
    {
      name: "",
      id: "",
      private: "Visibility",
      description: "Details",
      createdAt: "",
      updatedAt: "",
      users: "Owner",
      templates: "Templates",
      template: "Template",
      input: "Input",
    }[key] ?? "";
  return keyMap;
}

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
          Not available
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
    <Badge key={_user.id} className="bg-gray-600 px-2">
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
    : "Not available";
}

export function mapString(field: string, key: string) {
  return (
    {
      createdAt: `Created ${dayjs(field).fromNow()}`,
      updatedAt: `Last updated ${dayjs(field).fromNow()}`,
      templates: field.split(" ").map(capitalizeFirstLetter).join(" "),
      template: mapPrompt(field),
    }[key + ""] ??
    (field || "Not Available")
  );
}

export function mapBool(field: boolean, key: string) {
  const value = {
    private: {
      true: <EyeOffIcon width={20} />,
      false: <EyeIcon width={20} />,
    },
  }[key] ?? {
    true: "Yes",
    false: "No",
  };

  return value[String(field) as keyof typeof value];
}

export function mapField({ field, key }: { field: Field; key: string }) {
  const type: string = Array.isArray(field) ? "array" : typeof field;

  return (
    {
      ["string"]: () => mapString(field + "", key),
      ["boolean"]: () => mapBool(!!field, key),
      ["array"]: () => mapArray([...Object(field)], key),
    }[type] ?? (() => "Not Available")
  )();
}
