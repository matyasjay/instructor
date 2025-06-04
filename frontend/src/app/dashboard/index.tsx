import { PlusCircleIcon, CpuIcon, WrenchIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config/query";
import { fetchUser } from "@/lib/hooks/useUser";
import { useEffect } from "react";
import { PAGES } from "@/config/pages";
import { useLoaderData, useNavigate } from "react-router";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useServices } from "@/lib/hooks/useServices";
import { Separator } from "@/components/ui/separator";

function Dashboard() {
  const services = useServices();

  const { data, isPending } = useQuery({
    queryFn: fetchUser,
    queryKey: [QUERY_KEYS.USER],
  });

  const navigate = useNavigate();
  const { authenticated } = useLoaderData();

  useEffect(() => {
    if (authenticated === false) {
      navigate(PAGES.PUBLIC.LOGIN);
    }
  }, [authenticated]);

  return isPending ? null : (
    <div className="flex flex-col w-full gap-3.5 mx-auto justify-top items-start min-h-10/12 px-9">
      <div className="w-full justify-center pt-4">
        <h1 className="flex scroll-m-20 text-lg font-semibold tracking-tight mb-4">
          Dashboard
        </h1>
      </div>
      <div className="flex flex-col w-full items-top">
        <Accordion
          type="multiple"
          className="w-full justify-start"
          value={["account_details", "account_services"]}
        >
          <AccordionItem value="account_details" className="border-1 mb-3">
            <AccordionTrigger className="hover:no-underline bg-sidebar px-7 font-bold [&>svg]:hidden">
              User Details
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance bg-sidebar px-7 py-3">
              <table>
                <tbody>
                  {Object.entries(data).map(([key, value]) => (
                    <tr key={key + ""} className="h-10">
                      <td>{capitalizeFirstLetter(key + "")}</td>
                      <td>{value + ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button variant="outline" className="flex ml-auto w-full">
                <WrenchIcon />
                Change User Details
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="account_services" className="border-1 mb-3">
            <AccordionTrigger className="hover:no-underline bg-sidebar px-7 font-bold [&>svg]:hidden">
              Service Information
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance bg-sidebar px-7 py-3 w-full border-b-1">
              <Accordion
                type="single"
                className="mb-2"
                defaultValue={services[0]?.name}
              >
                {services.map((service) => (
                  <AccordionItem value={service.name}>
                    <AccordionTrigger className="cursor-pointer hover:no-underline bg-accent px-7 font-bold [&[data-state=open]]:bg-primary ">
                      {capitalizeFirstLetter(service.name)}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance bg-sidebar border-t-1 px-7 py-3 border-x-1 border-b-1">
                      <table>
                        <tbody>
                          {Object.entries(service).map(([key, value]) => (
                            <tr className="h-10" key={key}>
                              <td>{capitalizeFirstLetter(key)}</td>
                              <td>{value}</td>
                              <td></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Separator />
                      <div className="flex gap-3">
                        <Button
                          variant="default"
                          className="flex w-[50%] ml-auto"
                        >
                          <CpuIcon />
                          Start Service
                        </Button>
                        <Button
                          variant="secondary"
                          className="flex w-[50%] ml-auto"
                        >
                          <WrenchIcon />
                          Configure Service
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button
                variant="outline"
                className="flex w-full mx-auto"
                onClick={() => navigate(PAGES.PRIVATE.SERVICE_NEW)}
              >
                <PlusCircleIcon />
                Add New Service
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default Dashboard;
