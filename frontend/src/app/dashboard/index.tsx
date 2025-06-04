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
        <Accordion
          type="single"
          collapsible
          className="w-full justify-start"
          defaultValue="account_details"
        >
          <AccordionItem value="account_details">
            <AccordionTrigger className="cursor-pointer hover:no-underline bg-primary px-7">
              Account Details
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance bg-sidebar border-t-1 px-7 py-3 border-x-1 border-b-1">
              <table>
                <tbody>
                  {Object.entries(data).map(([key, value]) => (
                    <tr key={key + ""} className="h-10">
                      <td>{key + ""}</td>
                      <td>{value + ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default Dashboard;
