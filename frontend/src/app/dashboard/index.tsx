import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  PlusCircleIcon,
  CpuIcon,
  WrenchIcon,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useServices } from "@/lib/hooks/useServices";
import { Separator } from "@/components/ui/separator";
import NewServiceForm from "@/components/forms/new-service";
import { STORAGE } from "@/config/cookies";

function Dashboard() {
  const services = useServices();
  const user = JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? "{}");

  delete user.id;
  delete user.password;
  delete user.passwordhash;

  return (
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
                  {Object.entries(user).map(([key, value]) => (
                    <tr key={key + ""} className="h-10">
                      <td>{capitalizeFirstLetter(key + "")}</td>
                      <td>{value + ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                variant="outline"
                className="flex ml-auto w-full cursor-pointer"
              >
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
                defaultValue={services.user[0]?.name}
              >
                {services.user.map((service) => (
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
                                <td className="w-[170px]">
                                  {capitalizeFirstLetter(key)}
                                </td>
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
                            ) : null,
                          )}
                        </tbody>
                      </table>
                      <Separator />
                      <div className="flex gap-3 pb-[16px]">
                        <Button
                          variant="default"
                          className="flex w-[300px] cursor-pointer"
                        >
                          <CpuIcon />
                          Start Service
                        </Button>
                        <Button
                          variant="ghost"
                          className="flex w-[300px] cursor-pointer"
                        >
                          <WrenchIcon />
                          Configure Service
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex w-full mx-auto cursor-pointer"
                >
                  <PlusCircleIcon />
                  Add New Service
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex justify-between w-full items-center">
                    Create New Service
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                  </AlertDialogTitle>
                  <Separator />
                </AlertDialogHeader>
                <NewServiceForm />
                <AlertDialogFooter></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default Dashboard;
