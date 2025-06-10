import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import useForm, { UseFormProps } from "@/lib/hooks/useForm";
import { cn } from "@/lib/utils";
import { CheckboxField, InputField, SelectField, ToggleField } from "./input";

function renderFormFields(form: UseFormReturn<FieldValues>) {
  return function (field: FormField) {
    return (
      {
        ["checkbox"]: (
          <CheckboxField key={field.name} field={field} form={form} />
        ),
        ["select"]: <SelectField key={field.name} field={field} form={form} />,
        ["toggle"]: <ToggleField key={field.name} field={field} form={form} />,
      }[field.type + ""] ?? (
        <InputField key={field.name} field={field} form={form} />
      )
    );
  };
}

export default function FormLayout(props: UseFormProps & { submit?: string }) {
  const { handleDismiss, alerted, handleSubmit, error, form, fields } =
    useForm(props);

  const fieldMapper = renderFormFields(form);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="bg-sidebar w-full">
        <div className="flex flex-col gap-3.5 mx-auto align-middle w-full">
          {fields.map(fieldMapper)}
          <Separator />
          <Button
            type="submit"
            className="cursor-pointer w-full max-w-[350px] mx-auto rounded-none"
          >
            {props.submit ?? "Submit"}
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Failed to submit form!</AlertTitle>
              <AlertDescription>
                <p>Please check your inputs and try again.</p>
                <ul className="list-inside list-disc text-sm">
                  {error?.split("\n").map((e) =>
                    !e ? null : (
                      <li key={e} className="text-rose-400">
                        {e}
                      </li>
                    ),
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </form>
      <AlertDialog open={alerted}>
        <AlertDialogTrigger asChild className={cn(!alerted ? "hidden" : "")}>
          &nbsp;
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between w-full items-center">
              Success! Your changes has been saved.
              <AlertDialogCancel
                className="cursor-pointer rounded-none"
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
    </Form>
  );
}
