import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { CheckedState } from "@radix-ui/react-checkbox";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

type Form<T extends FieldValues> = UseFormReturn<T, object, T>;

type FormLayoutPopupProps<T extends FieldValues> = {
  form: Form<T>;
  fields: FormField[];
  handleSubmit: (e: React.FormEvent) => void;
  submit?: string;
  error?: string;
};

type FormFieldProps<T extends FieldValues> = {
  field: FormField;
  form: Form<T>;
};

function InputField<T extends FieldValues>({ field, form }: FormFieldProps<T>) {
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

function CheckboxField<T extends FieldValues>({
  field,
  form,
}: FormFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={field.name as Path<T>}
      render={({ field: formField }) => (
        <FormItem
          key={formField.name}
          className="flex flex-row items-center gap-2 ml-[120px]"
        >
          <FormControl>
            <Checkbox
              checked={!field.value}
              onCheckedChange={
                field.handleChange as unknown as (e: CheckedState) => void
              }
            />
          </FormControl>
          <FormLabel className="text-sm font-normal">{field.label}</FormLabel>
        </FormItem>
      )}
    />
  );
}

function renderFormFields<T extends FieldValues>(form: Form<T>) {
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

function FormLayoutPopupComponent<T extends FieldValues>({
  form,
  handleSubmit,
  fields,
  error,
  submit = "Submit",
}: FormLayoutPopupProps<T>) {
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
            {submit}
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Failed to submit form!</AlertTitle>
              <AlertDescription>
                <p>Please check your inputs and try again.</p>
                <ul className="list-inside list-disc text-sm">
                  {error.split("\n").map((e) => (
                    <li key={e} className="text-rose-400">
                      {e}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </form>
    </Form>
  );
}

export default function createFormPopupLayout<T extends FieldValues>() {
  return (props: FormLayoutPopupProps<T>) => (
    <FormLayoutPopupComponent {...props} />
  );
}
