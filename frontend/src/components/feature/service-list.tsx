import { CpuIcon, ThumbsDown, ThumbsUp, WrenchIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/lib/utils";

type ServiceListProps = {
  title: string;
  services: Service[];
};
function mapServices(services: Service[]) {
  return services.map((service) => (
    <AccordionItem value={service.name} key={service.name}>
      <AccordionTrigger className="cursor-pointer hover:no-underline bg-secondary px-7 font-bold [&[data-state=open]]:bg-primary ">
        {capitalizeFirstLetter(service.name)}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance bg-sidebar border-t-1 px-7 py-3 border-x-1 border-b-1">
        <table>
          <tbody>
            {Object.entries(service).map(([key, value]) =>
              key !== "id" ? (
                <tr className="h-10" key={key}>
                  <td className="w-[170px]">{capitalizeFirstLetter(key)}</td>
                  <td>
                    {typeof value === "boolean" ? (
                      value === true ? (
                        <ThumbsUp />
                      ) : (
                        <ThumbsDown />
                      )
                    ) : value === "" ? (
                      <em>No value</em>
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
        <Separator />
        <div className="flex gap-3 pb-[16px]">
          <Button variant="default" className="flex w-[300px] cursor-pointer">
            <CpuIcon />
            Start Service
          </Button>
          <Button variant="ghost" className="flex w-[300px] cursor-pointer">
            <WrenchIcon />
            Configure Service
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  ));
}

export default function ServiceList({ title, services }: ServiceListProps) {
  const list = services.length > 0 ? mapServices(services) : "Nothing to show";

  return (
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
