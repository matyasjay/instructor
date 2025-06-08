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

type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "checkbox" | "select" | "toggle";
  description?: string;
  placeholder?: string;
  value?: string | boolean;
  handleChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | CheckedState
      | string,
  ) => void;
  options?: {
    label: string;
    value: string;
  }[];
  asyncOptions?: () => Promise<
    | ({ id: string; name: string } & Record<string, unknown>)[]
    | { error: string }
  >;
};

type CheckedState = import("@radix-ui/react-checkbox").CheckedState;

declare type AggregatedService = Service & {
  users: User[];
  templates: Template[];
};
