import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { EyeOffIcon, EyeIcon, WrenchIcon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

dayjs.extend(relativeTime);

export default function mapServiceField(
  field: Nullable<ServiceResponse[keyof ServiceResponse]> = [],
  key: string,
) {
  return {
    id: () => field,
    name: () => field,
    description: () => field,
    templates: () =>
      Object(field)
        .toReversed()
        .map(
          ({ id, name, template, description, input, updatedAt }: Template) => (
            <div className="flex flex-col relative" key={id}>
              <div className="capitalize w-full flex items-center bg-secondary border-x-1 border-white/20 p-2">
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
                <div className="px-4 pt-2 pb-4 w-full">
                  <p>{description}</p>
                  <div className="block w-full mt-3">
                    <h3 className="block font-bold p-2 uppercase tracking-widest border-x-1 border-t-1 border-white/30 mt-4 bg-primary/20">
                      Prompt
                    </h3>
                    {!template ? (
                      <span className="block w-full rich-text bg-sidebar p-3 py-5 border-x-1 border-b-1 border-white/30">
                        &nbsp;
                      </span>
                    ) : (
                      <span
                        className="block w-full rich-text bg-sidebar p-3 py-5 border-x-1 border-b-1 border-white/30"
                        dangerouslySetInnerHTML={{
                          __html: template.replace(
                            /(\$[\w]+)/g,
                            "<strong>$1</strong>",
                          ),
                        }}
                      />
                    )}
                  </div>
                  <h3 className="block font-bold p-2 uppercase tracking-widest border-x-1 border-t-1 border-white/30 mt-4 bg-primary/20">
                    Inputs
                  </h3>
                  <div className="border-x-1 border-b-1 border-white/30 p-2 flex flex-col gap-4">
                    {input.input.split(";").map((inputValue) => {
                      const [key, value] = inputValue.split("=");
                      return (
                        <div
                          key={key}
                          className="font-bold font-mono text-accent-foreground w-[200px] flex justify-between"
                        >
                          ${key}
                          <span className="text-white">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ),
        ),
    users: () =>
      Object(field).map((user: User) => (
        <Badge
          key={user.id}
          className="bg-primary/20 px-2 rounded-none ml-2 font-mono"
        >
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
    error: () => null,
  }[key as keyof ServiceResponse]();
}
