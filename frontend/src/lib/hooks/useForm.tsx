import React, { useState } from 'react';
import { FieldValues, useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ZodError } from 'zod/v4';
import { STORAGE } from '@/lib/cookies';
import { normalizeObjectKeys, parseErrorObject, throttle } from '@/lib/utils';

export default function useForm({ mutationKey, onSubmit, form: formInput }: UseFormProps) {
  const defaultValues = Object.fromEntries(Object.keys(formInput.schema.shape).map((key) => [key, '']));
  const [state, setState] = useState(defaultValues);
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

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const fields = Object.keys(formInput.schema.shape)
    .filter((field) => field !== 'userId')
    .map((field) => ({
      ...formInput.fields?.[field],
      name: field,
      handleChange: handleChange(field),
      value: state[field],
    })) as FormField[];

  const nestedFields = Object.entries(formInput.fields).reduce(
    (acc, [key, field]) =>
      field.type === 'form'
        ? [...acc, { ...field, name: key, handleChange: handleChange(key), value: state[key] }]
        : acc,
    Array(0),
  );

  return {
    form,
    nestedFields,
    handleSubmit,
    error,
    fields,
  };
}
