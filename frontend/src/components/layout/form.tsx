import React, { Fragment } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import useForm, { UseFormProps } from '@/lib/hooks/useForm';
import ErrorLayout from './error';
import { CheckboxField, InputField, SelectField, ToggleField } from './input';

function renderFormFields(form: UseFormReturn<FieldValues>) {
  return function (field: FormField) {
    if (field.type === 'form') {
      return <FormLayout form={field.form} onSubmit={field.onSubmit} mutationKey={field.key} />;
    }

    return {
      ['checkbox']: <CheckboxField key={field.name} field={field} form={form} />,
      ['select']: <SelectField key={field.name} field={field} form={form} />,
      ['toggle']: <ToggleField key={field.name} field={field} form={form} />,
      ['text']: <InputField key={field.name} field={field} form={form} />,
      ['password']: <InputField key={field.name} field={field} form={form} />,
      ['email']: <InputField key={field.name} field={field} form={form} />,
    }[field.type];
  };
}

export default function FormLayout<T, R>(props: UseFormProps<T, R> & { submit?: string }) {
  const { handleSubmit, error, form, fields } = useForm(props);

  const fieldMapper = renderFormFields(form);

  return (
    <Fragment>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="bg-sidebar w-full">
          <div className="flex flex-col gap-3.5 mx-auto align-middle w-full">
            {fields.map(fieldMapper)}
            <Separator />
            <Button type="submit" className="cursor-pointer w-full max-w-[350px] mx-auto rounded-none">
              {props.submit ?? 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
      {error && (
        <ErrorLayout
          hideLayout
          shouldNavigate={false}
          errorTitle="Please check your inputs and try again!"
          errorElement={
            <ul className="list-inside list-disc text-sm">
              {error?.split('\n').map((e) =>
                !e ? null : (
                  <li key={e} className="text-rose-400 font-bold my-2">
                    {e}
                  </li>
                ),
              )}
            </ul>
          }
        />
      )}
    </Fragment>
  );
}
