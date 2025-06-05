import { AlertDialogTriggerProps } from "@radix-ui/react-alert-dialog";
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
import { Separator } from "../ui/separator";

type PopupProps = {
  title: string;
  content: React.ReactNode;
  trigger: React.ReactNode;
  description: string;
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
        {typeof trigger !== "object" ? (
          <Button variant={variant} className="cursor-pointer">
            {trigger}
          </Button>
        ) : (
          trigger
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between w-full items-center">
            {title}
            <AlertDialogCancel className="cursor-pointer">
              {cancel}
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          <Separator />
        </AlertDialogHeader>
        {content}
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
