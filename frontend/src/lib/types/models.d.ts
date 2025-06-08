declare type User = import("@/lib/prisma/generated/prisma").User;

declare type Service = import("@/lib/prisma/generated/prisma").Service;

declare type Template = import("@/lib/prisma/generated/prisma").PromptTemplate;

declare type FormSchema<T extends ZodType> = {
  shape: ZodSchema<URecord, T>;
  safeParse: (input: unknown) => SafeParseReturnType<T, T>;
};

declare type Form = {
  schema: ZodType;
  fields?: Record<string, Partial<FormField>>;
};

type DefaultFormProps = {
  options?: Record<string, unknown>[];
  name: string;
  label: string;
  type: "text" | "email" | "password" | "checkbox" | "select";
};

type CheckedState = import("@radix-ui/react-checkbox").CheckedState

declare type FormField = DefaultFormProps &
  (
    | {
        value: string | number | boolean;
        handleChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | CheckedState,
        ) => void;
      }
    | {
        value?: undefined;
        handleChange?: undefined;
      }
  );

declare type AggregatedService = Service & {
  users: User[];
  templates: Template[];
};
