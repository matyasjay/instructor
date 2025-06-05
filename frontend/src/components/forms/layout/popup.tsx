import { FieldValues, Path, UseFormReturn } from "react-hook-form";
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

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "checkbox";
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type Form<T extends FieldValues> = UseFormReturn<T, object, T>;

export type FormLayoutPopupProps<T extends FieldValues> = {
  form: Form<T>;
  fields: FormField[];
  handleSubmit: (e: React.FormEvent) => void;
  submit?: string;
  error?: string;
};

type FormFieldProps<T extends FieldValues> = {
  field: FormField;
  form: Form<T>
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
              value={field.value}
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
      render={({ field }) => (
        <FormItem key={field.name} className="flex flex-row items-center gap-2">
          <FormControl>
            <Checkbox checked={!field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="text-sm font-normal">
            Check to create a discoverable public service.
          </FormLabel>
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
        <div className="flex flex-col gap-3.5 mx-auto align-middle min-h-10/12 w-full">
          {fields.map(fieldMapper)}
          <Separator />
          <Button
            type="submit"
            className="cursor-pointer w-full max-w-[350px] mx-auto"
          >
            {submit}
          </Button>
          {error && <h4>{error}</h4>}
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
