import { AlertDialogTriggerProps } from "@radix-ui/react-alert-dialog";
import { Separator } from "../ui/separator";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type PopupProps = {
  title: string;
  content: React.ReactNode;
  trigger: React.ReactNode;
  description?: string;
  cancel?: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>["variant"];
};

export default function ButtonWithPopup({
  title,
  content,
  trigger,
  cancel = "Cancel",
  description = "",
  variant = "default",
  className,
  id,
}: PopupProps & Omit<AlertDialogTriggerProps, keyof PopupProps>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild id={id} className={className}>
        <Button variant={variant} className="cursor-pointer">
          {trigger}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between w-full items-center">
            {title}
            <AlertDialogCancel className="cursor-pointer">
              {cancel}
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription>{description ?? ""}</AlertDialogDescription>
          <Separator />
        </AlertDialogHeader>
        {content}
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
