type Endpoints = typeof import('@/lib/endpoints').ENDPOINTS;
declare type Endpoint = Endpoints[keyof Endpoints];

declare type Nullable<T> = T | null | undefined;

declare type ArrayElement<T> = T extends readonly (infer ElementType)[] ? ElementType : never;

declare class NullProto {
  private 'constructor': NullProto;
  private 'toString': void;
  private 'toLocaleString': void;
  private 'valueOf': void;
  private 'hasOwnProperty': void;
  private 'isPrototypeOf': void;
  private 'propertyIsEnumerable': void;
}

declare type ApiResponse<T> = T & { error?: string };
