import React, { useState } from 'react';
import { FieldValues, UseFormReturn, useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ZodError } from 'zod/v4';
import { STORAGE } from '@/lib/cookies';
import { normalizeObjectKeys, parseErrorObject, throttle } from '@/lib/utils';

export type UseFormProps<T, R> = {
  form: Form;
  onSubmit: (data: T) => Promise<ApiResponse<R>>;
  mutationKey: string;
};

export default function useForm<T, R>({
  mutationKey,
  onSubmit,
  form: { schema, fields: fieldConfig },
}: UseFormProps<T, R>) {
  const zodSchema = schema;

  const defaultValues = Object.fromEntries(Object.keys(zodSchema.shape).map((mutationKey) => [mutationKey, '']));

  const [state, setState] = useState(defaultValues);
  const [error, setError] = useState<string>('');

  const resolver = zodResolver(Object(zodSchema));

  const form = useReactHookForm({
    defaultValues,
    resolver,
  }) as UseFormReturn<FieldValues>;

  const mutation = useMutation({
    mutationFn: async function mutationFn(input: Record<string, unknown>) {
      const parsedSchema = zodSchema.safeParse(input);

      if (!parsedSchema.success) {
        throw {
          ...parsedSchema.error,
          zod: parsedSchema.error instanceof ZodError,
        };
      }

      const response = await onSubmit(parsedSchema.data as T);

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
    };
    mutation.mutate(payload);
  };

  const formFields = Object.keys(zodSchema.shape).filter((field) => field !== 'userId');

  const fields = formFields.map((field) => ({
    ...fieldConfig?.[field],
    name: field,
    handleChange: handleChange(field),
    value: state[field],
  })) as FormField[];

  return {
    form,
    handleSubmit,
    error,
    fields,
  };
}
