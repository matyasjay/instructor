import React from "react";
import createFormPopupLayout from "@/components/layout/popup-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useForm, { UseFormProps } from "@/lib/hooks/useForm";
import { cn } from "@/lib/utils";

const Layout = createFormPopupLayout();
export function FormLayout(props: UseFormProps) {
  const { handleDismiss, alerted, handleSubmit, error, form, fields } =
    useForm(props);

  return (
    <>
      <Layout
        form={form}
        handleSubmit={handleSubmit}
        fields={fields}
        error={error}
      />
      <AlertDialog open={alerted}>
        <AlertDialogTrigger asChild className={cn(!alerted ? "hidden" : "")}>
          &nbsp;
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between w-full items-center">
              Success! Your changes has been saved.
              <AlertDialogCancel
                className="cursor-pointer"
                onClick={handleDismiss}
              >
                Dismiss
              </AlertDialogCancel>
            </AlertDialogTitle>
            <AlertDialogDescription>
              You can safely close this notification.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
