import React, { useState } from 'react';
import { FieldValues, useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ZodError } from 'zod/v4';
import { STORAGE } from '@/lib/cookies';
import { normalizeObjectKeys, parseErrorObject, throttle } from '@/lib/utils';

export default function useForm({ mutationKey, onSubmit, form: formInput }: UseFormProps) {
  // Hoist the nested form values to the parent form's state so they both could be sent
  // to the API together in a single event handler instead of needing to hack around.
  const defaultValues = Object.fromEntries([
    ...Object.keys(formInput.schema.shape).map((key) => [key, '']),
    ...Object.entries(formInput.fields)
      .map(([key, value]) => (value.type === 'form' && value.form?.fields ? [key, ''] : []))
      .filter(([key]) => !!key),
  ]);

  const [state, setState] = useState<Record<string, string | boolean>>(defaultValues);
  const [error, setError] = useState<string>('');
  const form = useReactHookForm<FieldValues>({ defaultValues, resolver: zodResolver(Object(formInput.schema)) });

  const mutation = useMutation({
    mutationFn: async function mutationFn(input: FormInput) {
      const parsedSchema = formInput.schema.safeParse(input);
      if (!parsedSchema.success) {
        throw {
          ...parsedSchema.error,
          zod: parsedSchema.error instanceof ZodError,
        };
      }
      const response = await onSubmit(parsedSchema.data as FormInput);
      if (!response || (typeof response === 'object' && 'error' in response && !!response.error)) {
        throw response;
      }
      return normalizeObjectKeys(response);
    },
    mutationKey: [mutationKey],
    onError: (e) => {
      setError(parseErrorObject(e));
    },
  });

  const checkError = () => {
    throttle(() => setError(''), 200);
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string | boolean) => {
      checkError();
      setState((prev) => ({
        ...prev,
        [field]: typeof e === 'string' || typeof e === 'boolean' ? e : e.target.value,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? '{}');
    const payload = {
      ...state,
      userId: user.id,
    } as FormInput;
    mutation.mutate(payload);
  };

  // Let the parent form manage the nested values in the root state. Here, we
  // also attach the event-handlers and current values too.
  const nestedFields = Object.entries(formInput.fields)
    .map(([key, field]) =>
      'form' in field
        ? Object.values(field.form?.fields ?? {}).reduce(
            (_, nestedField) => ({
              ...nestedField,
              handleChange: handleChange(key),
              name: key,
              value: state[key],
            }),
            {},
          )
        : null,
    )
    .filter(Boolean) as FormField[];

  const fields = Object.keys(formInput.schema.shape)
    // Since the from object must contain the nested form in the `fields` and the input in `schema`
    // we have to drop one of them to avoid dupe inputs in the layout, probably worth reworking this
    // in a more elegant way at some point. For now, this do the job.
    .filter((field) => field !== 'userId' && !nestedFields.find((nested) => Object(nested ?? {}).name === field))
    .map((field) => ({
      ...formInput.fields?.[field],
      name: field,
      handleChange: handleChange(field),
      value: state[field],
    })) as FormField[];

  return {
    form,
    nestedFields,
    handleSubmit,
    error,
    fields,
  };
}
