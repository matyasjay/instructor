declare type User = import("@/lib/prisma/generated/prisma").User;

declare type Service = import("@/lib/prisma/generated/prisma").Service;

declare type PromptTemplate =
  import("@/lib/prisma/generated/prisma").PromptTemplate;

type Endpoints = typeof import("@/config/endpoints").ENDPOINTS;

declare type Endpoint = Endpoints[keyof Endpoints];

declare type FormField =
  | {
      name: string;
      label: string;
      type: "text" | "email" | "password" | "checkbox";
      value: string | number | boolean;
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
  | {
      name: string;
      label: string;
      type: "text" | "email" | "password" | "checkbox";
      value?: undefined;
      handleChange?: undefined;
    };

declare type AggregatedService = Service & {
  users: User[];
  templates: PromptTemplate[];
};
