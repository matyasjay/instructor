import { WrenchIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { STORAGE } from "@/lib/cookies";
import { capitalizeFirstLetter } from "@/lib/utils";

function Account() {
  const user = JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? "{}");

  delete user.id;
  delete user.password;
  delete user.passwordHash;

  return (
    <Accordion
      type="multiple"
      className="w-full justify-start p-8"
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
    </Accordion>
  );
}

export default Account;
