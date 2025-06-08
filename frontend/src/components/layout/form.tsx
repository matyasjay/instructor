import React from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useForm, { UseFormProps } from "@/lib/hooks/useForm";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  field: FormField;
  form: UseFormReturn<FieldValues>;
};

function InputField<T extends FieldValues>({ field, form }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={field.name as Path<T>}
      render={({ field: formField }) => (
        <FormItem
          key={formField.name}
          className="flex flex-row items-center gap-2"
        >
          <FormLabel className="text-sm font-normal whitespace-nowrap justify-end w-[200px]">
            {field.label}
          </FormLabel>
          <FormControl className="w-full">
            <Input
              type={field.type}
              value={field.value + ""}
              onChange={field.handleChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function CheckboxField({ field, form }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem
          key={formField.name}
          className="flex flex-row items-center gap-2 ml-[120px]"
        >
          <FormControl>
            <Checkbox
              checked={!field.value}
              onCheckedChange={field.handleChange}
            />
          </FormControl>
          <FormLabel className="text-sm font-normal">{field.label}</FormLabel>
        </FormItem>
      )}
    />
  );
}

function renderFormFields(form: UseFormReturn<FieldValues>) {
  return function (field: FormField) {
    return (
      {
        ["checkbox"]: (
          <CheckboxField key={field.name} field={field} form={form} />
        ),
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
            className="cursor-pointer w-full max-w-[350px] mx-auto"
          >
            {props.submit}
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Failed to submit form!</AlertTitle>
              <AlertDescription>
                <p>Please check your inputs and try again.</p>
                <ul className="list-inside list-disc text-sm">
                  {error.split("\n").map((e) =>
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
    </Form>
  );
}
