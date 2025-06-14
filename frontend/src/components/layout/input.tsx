import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { normalizeObjectKeys } from '@/lib/utils';

type FormFieldProps = {
  field: DefaultFormField;
  form: UseFormReturn<FieldValues>;
};

export function InputField({ field, form }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem key={formField.name} className="flex flex-row items-center gap-2">
          <FormLabel className="text-sm font-normal whitespace-nowrap justify-end w-[200px]">{field.label}</FormLabel>
          <FormControl className="w-full">
            <Input type={field.type} value={field.value + ''} onChange={field.handleChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export function CheckboxField({ field, form }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem key={formField.name} className="flex flex-row items-center gap-2 ml-[120px]">
          <FormControl className="w-full">
            <Checkbox checked={!field.value} onCheckedChange={field.handleChange} />
          </FormControl>
          <FormLabel className="text-sm font-normal">{field.label}</FormLabel>
        </FormItem>
      )}
    />
  );
}

export function ToggleField({ field, form }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem key={formField.name} className="flex flex-col justify-center gap-2">
          <div className="flex gap-2">
            <FormLabel className="text-sm font-normal justify-end w-[200px]">{field.label}</FormLabel>
            <FormControl className="w-full items-center">
              <div className="flex items-center">
                <Switch
                  id={field.label}
                  checked={!!field.value}
                  onCheckedChange={field.handleChange}
                  className="cursor-pointer"
                />
              </div>
            </FormControl>
          </div>
          {!!field.description && <FormDescription className="ml-[145px]">{field.description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}

export function SelectField({ field, form }: FormFieldProps) {
  const { data, isPending } = useQuery({
    queryKey: [field.label],
    queryFn: field.asyncOptions ?? (() => undefined),
  });

  const options =
    !data || 'error' in data || isPending
      ? (field.options ?? [])
      : data?.map((item) => {
          const normalizedItem = Object(normalizeObjectKeys(item));
          return {
            label: normalizedItem.name,
            value: normalizedItem.id,
          };
        });

  return (
    <FormField
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem key={formField.name} className="flex flex-col justify-center">
          <div className="flex">
            <FormLabel className="text-sm font-normal justify-end w-[200px] mr-2">{field.label}</FormLabel>
            <Select onValueChange={field.handleChange}>
              <FormControl className="w-full">
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectGroup>
                <SelectContent>
                  <SelectLabel>{field.label}</SelectLabel>
                  {options?.map((option) => (
                    <SelectItem key={option.label} value={option.value} className="cursor-pointer">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectGroup>
            </Select>
          </div>
          {!!field.description && <FormDescription className="ml-[145px]">{field.description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
