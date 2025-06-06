type Endpoints = typeof import("@/config/endpoints").ENDPOINTS;
declare type Endpoint = Endpoints[keyof Endpoints];

declare type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "checkbox";
  value: string | number | boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

declare type Service = {
  id: string;
  name: string;
  description?: string;
  private: boolean;
};

declare type Services = {
  all: Service[];
  user: Service[];
};

declare type User = {
  id: string;
  name: string;
  email: string;
};
