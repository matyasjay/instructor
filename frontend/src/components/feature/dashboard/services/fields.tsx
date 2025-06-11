import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { EyeOffIcon, EyeIcon, WrenchIcon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

dayjs.extend(relativeTime);

export default function mapServiceField(
  field: ServiceResponse[keyof ServiceResponse],
  key: string,
) {
  return {
    id: () => field,
    name: () => field,
    description: () => field,
    templates: () =>
      Object(field).map(
        ({ id, name, template, description, updatedAt }: Template) => (
          <div className="flex flex-col relative mb-4" key={id}>
            <div className="capitalize w-full flex items-center bg-secondary border-x-1 border-t-1 border-white/20 p-2">
              <div className="flex flex-col ml-auto bg-secondary w-full justify-center h-full p-2">
                <h1 className="font-bold mr-auto">{name}</h1>
                <span className="text-xs italic">
                  {`Updated ${dayjs(updatedAt).fromNow()}`}
                </span>
              </div>
              <Button
                variant="outline"
                className="w-30 cursor-pointer rounded-none"
              >
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
                        __html: template.replace(
                          /(\$[\w]+)/g,
                          "<strong>$1</strong>",
                        ),
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ),
      ),
    users: () =>
      Object(field).map((user: User) => (
        <Badge key={user.id} className="bg-primary/40 px-2 rounded-none">
          {user.name}
        </Badge>
      )),
    createdAt: () => `Created ${dayjs(field + "").fromNow()}`,
    updatedAt: () => `Updated ${dayjs(field + "").fromNow()}`,
    private: () =>
      ({
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
      })[field + ""],
  }[key as keyof ServiceResponse]();
}
