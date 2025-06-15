import React, { Fragment } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import useForm from '@/lib/hooks/useForm';
import ErrorLayout from './error';
import { CheckboxField, InputField, SelectField, ToggleField } from './input';

function renderFormFields(form: UseFormReturn) {
  return function (field: FormField) {
    if (field.type === 'form') {
      return (
        <FormLayout key="nested-form" form={field.form} onSubmit={field.onSubmit} mutationKey={field.key} noSubmit />
      );
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

const BaseElement = ({
  children,
  isNested,
  ...props
}: { children: React.ReactNode; isNested: boolean } & React.HTMLAttributes<HTMLFormElement>) =>
  isNested ? <div className={props.className}>{children}</div> : <form {...props}>{children}</form>;

export default function FormLayout(props: UseFormProps & { submit?: string; noSubmit?: boolean }) {
  const { handleSubmit, error, form, nestedFields, fields } = useForm(props);

  const fieldMapper = renderFormFields(form);

  return (
    <Fragment>
      <Form {...form}>
        <BaseElement onSubmit={handleSubmit} className="bg-sidebar w-full" isNested={!!props.noSubmit}>
          <div className="flex flex-col gap-3.5 mx-auto align-middle w-full">
            {[...fields, ...nestedFields].map(fieldMapper)}
            {props.noSubmit ? null : (
              <Fragment>
                <Separator />
                <Button type="submit" className="cursor-pointer w-full max-w-[350px] mx-auto rounded-none">
                  {props.submit ?? 'Submit'}
                </Button>
              </Fragment>
            )}
          </div>
        </BaseElement>
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
