import {
  AlertDialogProps,
  AlertDialogTriggerProps,
} from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DefaultProps = {
  title: string;
  trigger: React.ReactNode;
  description: string;
  content?: React.ReactNode;
  cancel?: React.ReactNode;
  dismiss?: "top" | "split" | "hidden";
  triggerVariant?: React.ComponentProps<typeof Button>["variant"];
};

type PopupProps =
  | (DefaultProps & {
      confirm?: undefined;
      onConfirm?: undefined;
      confirmVariant?: undefined;
    })
  | (DefaultProps & {
      confirm: React.ReactNode;
      onConfirm: () => void;
      confirmVariant?: React.ComponentProps<typeof Button>["variant"];
    });

export default function AlertButton({
  title,
  content,
  trigger,
  cancel = "Cancel",
  description = "",
  triggerVariant = "default",
  className,
  id,
  defaultOpen = false,
  dismiss = "top",
  confirm,
  onConfirm,
  confirmVariant = "default",
  open,
}: PopupProps &
  Omit<AlertDialogProps & AlertDialogTriggerProps, keyof PopupProps>) {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <AlertDialog defaultOpen={defaultOpen} open={open}>
      <AlertDialogTrigger
        asChild
        id={id}
        className={cn(className, open ? "hidden" : "")}
      >
        {typeof trigger !== "object" ? (
          <Button variant={triggerVariant} className="cursor-pointer">
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
            {dismiss === "top" && (
              <AlertDialogCancel
                className="cursor-pointer"
                onClick={open ? handleBack : undefined}
              >
                {cancel}
              </AlertDialogCancel>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {content}
        <AlertDialogFooter>
          <div className="flex w-full justify-around gap-3">
            {confirm && (
              <AlertDialogAction onClick={onConfirm} asChild>
                <Button
                  variant={confirmVariant}
                  className="w-[50%] cursor-pointer"
                >
                  {confirm}
                </Button>
              </AlertDialogAction>
            )}
            {dismiss === "split" && (
              <AlertDialogCancel
                className="cursor-pointer w-[50%]"
                onClick={open ? handleBack : undefined}
              >
                {cancel}
              </AlertDialogCancel>
            )}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
