declare type Nullable<T> = T | null | undefined;

declare type ArrayElement<T> = T extends readonly (infer ElementType)[]
  ? ElementType
  : never;

declare class NullProto {
  private "constructor": NullProto;
  private "toString": void;
  private "toLocaleString": void;
  private "valueOf": void;
  private "hasOwnProperty": void;
  private "isPrototypeOf": void;
  private "propertyIsEnumerable": void;
}

declare type URecord<K = string, V = unknown> = Record<K, V>;

declare type ZodError = import("zod").ZodError;

declare type ZodIssue = ArrayElement<ZodError["issues"]>;
