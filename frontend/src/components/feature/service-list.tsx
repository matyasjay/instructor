import { CpuIcon, CopyIcon, WrenchIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useServices } from "@/lib/hooks/useServices";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Spinner } from "../ui/skeleton";

type ServiceListProps = {
  title: string;
  type: "all" | "user";
  public?: boolean;
};

function mapProperty([key, value = ""]: [
  string,
  AggregatedService[keyof AggregatedService],
]) {
  const property =
    {
      ["boolean"]: value === true ? "Yes" : "No",
      ["string"]: !value ? (
        "Not available"
      ) : value instanceof Date ? (
        value.toISOString()
      ) : Array.isArray(value) ? (
        <ul>
          {value.length === 0 ? (
            <li>Not available</li>
          ) : (
            value.map((entry) => <li key={entry.id}>{entry.name}</li>)
          )}
        </ul>
      ) : (
        value
      ),
      ["object"]: Array.isArray(value) ? (
        <ul>
          {value.length === 0 ? (
            <li>Not available</li>
          ) : (
            value.map((entry) => <li key={entry.id}>{entry.name}</li>)
          )}
        </ul>
      ) : Object.values(value).length === 0 ? (
        "Not available"
      ) : (
        JSON.stringify(value)
      ),
      ["number"]: "number",
      ["symbol"]: "symbol",
      ["bigint"]: "bigint",
      ["function"]: "function",
      ["undefined"]: "Not available",
    }[typeof value] ?? "";

  return key !== "id" ? (
    <tr className="h-10" key={key}>
      <td className="w-[170px]">{capitalizeFirstLetter(key)}</td>
      <td>{property}</td>
    </tr>
  ) : null;
}

function mapServices(services: AggregatedService[], isPublic?: boolean) {
  return services.map((service) => (
    <AccordionItem value={service.name} key={service.name}>
      <AccordionTrigger className="cursor-pointer hover:no-underline bg-secondary px-7 font-bold [&[data-state=open]]:bg-primary ">
        {capitalizeFirstLetter(service.name)}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance bg-sidebar border-t-1 px-7 py-3 border-x-1 border-b-1">
        <table>
          <tbody>{Object.entries(service).map(mapProperty)}</tbody>
        </table>
        <Separator />
        <div className="flex gap-3 pb-[16px]">
          <Button variant="default" className="flex w-[300px] cursor-pointer">
            <CpuIcon />
            Start Service
          </Button>
          {isPublic ? (
            <Button variant="ghost" className="flex w-[300px] cursor-pointer">
              <CopyIcon />
              Copy Service
            </Button>
          ) : (
            <Button variant="ghost" className="flex w-[300px] cursor-pointer">
              <WrenchIcon />
              Configure Service
            </Button>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  ));
}

export default function ServiceList({ title, type }: ServiceListProps) {
  const { services, isPending } = useServices(type);

  const list =
    services.length > 0
      ? mapServices(services, type === "all")
      : "Nothing to show";

  return isPending ? (
    <Spinner />
  ) : (
    <Accordion type="single" defaultValue="services_container">
      <AccordionItem value="services_container" className="border-1 mb-3">
        <AccordionTrigger className="hover:no-underline bg-sidebar px-7 font-bold [&>svg]:hidden">
          {title}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance bg-sidebar px-7 py-3 w-full border-b-1">
          <Accordion
            type="single"
            className="mb-2"
            defaultValue={services[0]?.name}
          >
            {list}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
