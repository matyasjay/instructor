import React, { useState } from "react";
import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ZodError } from "zod";
import { useAuth } from "@/components/context/auth";
import { COOKIES, STORAGE } from "@/config/cookies";
import {
  authPost,
  normalizeObjectKeys,
  parseErrorObject,
  throttle,
} from "@/lib/utils";

export type UseFormProps = {
  endpoint: Endpoint;
  mutationKey: string;
  form: Form;
};

export default function useForm({
  form: { schema, fields: fieldConfig },
  endpoint,
  mutationKey,
}: UseFormProps) {
  const zodSchema = schema as unknown as FormSchema<ZodType>;
  const defaultValues = Object.fromEntries(
    Object.keys(zodSchema.shape).map((key) => [key, ""])
  );

  const formFields = Object.keys(zodSchema.shape)
    .filter((field) => field !== "user")
    .map((key) => ({
      type: key,
      name: key,
      label:
        key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
    }));

  const [state, setState] = useState(defaultValues);
  const [error, setError] = useState<string>("");
  const [alerted, setAlerted] = useState(false);
  const { setAuthenticated } = useAuth();

  const resolver = zodResolver(Object(zodSchema));

  const form = useReactHookForm({ defaultValues, resolver });

  const mutation = useMutation({
    mutationFn: async function mutationFn(input: Record<string, unknown>) {
      const parsedSchema = zodSchema.safeParse(input);

      if (parsedSchema.error) {
        throw {
          ...parsedSchema.error,
          zod: parsedSchema.error instanceof ZodError,
        };
      }

      const response = await authPost<
        Record<string, unknown>,
        Record<string, unknown>
      >(endpoint, Object(parsedSchema.data));

      if ("error" in response) {
        throw response;
      }

      if (response.token) {
        window.localStorage.setItem(
          STORAGE.USER,
          JSON.stringify(Object(response).user)
        );

        Cookies.set(COOKIES.JWT, Object(response).token);

        setAuthenticated(true);
      }

      return normalizeObjectKeys(response);
    },

    mutationKey: [mutationKey],
    onError: (e) => {
      setError(parseErrorObject(e));
    },
    onSuccess: (data) => {
      const response = data ?? {};
      if (!!response && typeof response === "object" && "error" in response) {
        setError(parseErrorObject(response.error));
      } else {
        setAlerted(!!response);
      }
    },
  });

  const checkError = () => {
    throttle(() => setError(""), 200);
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      checkError();
      setState((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const user = JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? "{}");
    const payload = {
      ...state,
      user: user.id,
    };
    mutation.mutate(payload);
  };

  const handleDismiss = () => {
    setAlerted(false);
  };

  const fields = formFields.map((field) => ({
    ...field,
    ...fieldConfig?.[field.name],
    handleChange: handleChange(field.name),
    value: state[field.name],
  }));

  return {
    form,
    handleSubmit,
    alerted,
    handleDismiss,
    error,
    fields,
  };
}
