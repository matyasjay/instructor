import { PlusCircleIcon, WrenchIcon } from "lucide-react";
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

function Dashboard() {
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
        <Accordion type="multiple" className="w-full justify-start">
          <AccordionItem
            value="account_details"
            className="border-x-1 border-y-0 mb-3"
          >
            <AccordionTrigger className="cursor-pointer hover:no-underline bg-sidebar px-7 font-bold">
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
          <AccordionItem
            value="account_services"
            className="border-x-1 border-y-0 mb-3"
          >
            <AccordionTrigger className="cursor-pointer hover:no-underline bg-sidebar px-7 font-bold">
              Service Information
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance bg-sidebar px-7 py-3">
              <table>
                <tbody>
                  {Object.entries({
                    "service-1": {
                      name: "Service 1",
                    },
                    "service-2": {
                      name: "Service 2",
                    },
                  }).map(([serviceName, service]) => (
                    <tr key={serviceName + ""} className="h-10">
                      <td>
                        <Accordion
                          type="multiple"
                          className="w-full justify-start mb-2"
                        >
                          <AccordionItem value={serviceName}>
                            <AccordionTrigger className="cursor-pointer hover:no-underline bg-accent px-7 font-bold">
                              {capitalizeFirstLetter(serviceName)}
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance bg-sidebar border-t-1 px-7 py-3 border-x-1 border-b-1">
                              <table>
                                <tbody>
                                  {Object.values(service).map(
                                    ([key, value]) => (
                                      <tr className="h-10" key={key}>
                                        <td>{capitalizeFirstLetter(key)}</td>
                                        <td>{value}</td>
                                        <td>
                                          <Button
                                            variant="outline"
                                            className="flex ml-auto"
                                          >
                                            <WrenchIcon />
                                            Configure
                                          </Button>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button variant="outline" className="flex w-full mx-auto">
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
