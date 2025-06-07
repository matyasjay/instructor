import React, { useState } from "react";
import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SafeParseReturnType, ZodError, ZodSchema, ZodType } from "zod";
import createFormPopupLayout from "@/components/layout/popup-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { STORAGE } from "@/config/cookies";
import {
  authPost,
  cn,
  normalizeObjectKeys,
  parseErrorObject,
} from "@/lib/utils";

export type FormSchema<T extends ZodType> = {
  shape: ZodSchema<URecord, T>;
  safeParse: (input: unknown) => SafeParseReturnType<T, T>;
};

type UseFormProps = {
  endpoint: Endpoint;
  mutationKey: string;
  schema: ZodType;
};

const Layout = createFormPopupLayout();

export default function useForm({
  schema,
  endpoint,
  mutationKey,
}: UseFormProps) {
  const zodSchema = schema as unknown as FormSchema<ZodType>;
  const defaultValues = Object.fromEntries(
    Object.keys(zodSchema.shape).map((key) => [key, ""]),
  );

  const formFields = Object.keys(zodSchema.shape).map((key) => ({
    type: key,
    name: key,
    label:
      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
  }));

  const [state, setState] = useState(defaultValues);
  const [error, setError] = useState<string>("");
  const [alerted, setAlerted] = useState(false);

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

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setError("");
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
    setState(defaultValues);
  };

  const handleDismiss = () => {
    setAlerted(false);
  };

  const fields = formFields.map((field) => ({
    ...field,
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

export function FormLayout(props: UseFormProps) {
  const { handleDismiss, alerted, handleSubmit, error, form, fields } =
    useForm(props);

  return (
    <>
      <Layout
        form={form}
        handleSubmit={handleSubmit}
        fields={fields}
        error={error}
      />
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
    </>
  );
}
