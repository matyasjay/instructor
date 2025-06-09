declare type FormSchema<T extends ZodType> = {
  shape: ZodSchema<URecord, T>;
  safeParse: (input: unknown) => SafeParseReturnType<T, T>;
};

declare type Form = {
  schema: ZodType;
  fields?: Record<string, Partial<FormField>>;
};

declare type Field =
  | User[keyof User]
  | Template[keyof Template]
  | Service[keyof Service];

declare type FormField = {
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
  asyncOptions?: () => Promise<Record<string, unknown>[]>;
};

declare type CheckedState = import("@radix-ui/react-checkbox").CheckedState;
