type ZodObject = import('zod/v4').ZodObject;

declare type FormSchema<T extends ZodType> = {
  shape: ZodObject<URecord, T>;
  safeParse: (input: unknown) => SafeParseReturnType<T, T>;
};

declare type Form = {
  schema: ZodObject;
  fields: Record<string, Partial<FormField>>;
};

declare type Field = User[keyof User] | Template[keyof Template] | Service[keyof Service];

declare type DefaultFormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'checkbox' | 'select' | 'toggle';
  description?: string;
  placeholder?: string;
  value?: string | boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | CheckedState | string) => void;
  options?: {
    label: string;
    value: string;
  }[];
  asyncOptions?: () => Promise<Record<string, unknown>[]>;
  form?: undefined;
  onSubmit?: undefined;
  endpoint?: undefined;
};

declare type NestedFormField = {
  type: 'form';
  form: Form;
  key: string;
  onSubmit: <T, R>(input: T) => R;
};

declare type FormField = DefaultFormField | NestedFormField;

declare type CheckedState = import('@radix-ui/react-checkbox').CheckedState;
