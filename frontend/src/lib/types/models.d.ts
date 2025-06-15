declare type ZodError<E> = import('zod/v4').ZodError<E>;

declare type ZodType<T, E> = import('zod/v4').ZodType<T, E>;

declare type ZodIssue = ArrayElement<ZodError['issues']>;

declare type ZodObject<S, C> = import('zod/v4').ZodObject<S, C>;

declare type ZodLooseShape = import('zod/v4/core').$ZodLooseShape;

declare type ZodObjectConfig = import('zod/v4/core').$ZodObjectConfig;

declare type Field = User[keyof User] | Template[keyof Template] | Service[keyof Service];

declare type DefaultFormFieldMeta = Partial<FormField> & {
  label: string;
  name?: string;
  description?: string;
};

declare type NestedFormFieldMeta = Partial<FormField> & {
  type: 'form';
  form: Form;
};

declare type FormFieldMeta = DefaultFormFieldMeta | NestedFormFieldMeta;

declare type Form<S = $ZodLooseShape, C = $ZodObjectConfig> = {
  schema: ZodObject<S, C>;
  fields: Record<string, FormFieldMeta>;
};

declare type DefaultFormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'checkbox' | 'select' | 'toggle';
  description?: string;
  placeholder?: string;
  value?: string | boolean;
  options?: {
    label: string;
    value: string;
  }[];
  form?: undefined;
  onSubmit?: undefined;
  endpoint?: undefined;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | CheckedState | string) => void;
  asyncOptions?: () => Promise<Record<string, unknown>[]>;
};

declare type NestedFormField = {
  type: 'form';
  form: Form;
  key: string;
  onSubmit: <T, R>(input: T) => R;
};

declare type InputListFormField = {
  type: 'input-list';
  name: string;
  label: string;
  options: { label: string; type: 'string' | 'boolean' | 'number' }[];
};

declare type FormField = DefaultFormField | NestedFormField | InputListFormField;

declare type CheckedState = import('@radix-ui/react-checkbox').CheckedState;

type FormInput =
  | ({ email: string; password: string; password_confirm: string } & PostUserInput)
  | ({ email?: undefined; password?: undefined; password_confirm?: undefined } & (
      | PostServiceInput
      | PostTemplateInput
      | PostInputInput
    ));

declare type UseFormProps<I = FormInput, R = Record<string, unknown>, S = ZodLooseShape, C = ZodObjectConfig> = {
  form: Form<S, C>;
  onSubmit: (input: I) => Promise<ApiResponse<R>>;
  mutationKey: string;
};
