import z from "zod";
import { fetchService } from "./hooks/useServices";

export const createServiceForm: Form = {
  schema: z.object({
    user: z.string().optional(),
    service: z.string(),
    name: z.string().min(5).max(30),
    description: z.string().min(10).max(150).optional(),
    private: z.boolean(),
  }),
  fields: {
    private: {
      type: "toggle",
      description: "Private services are not discoverable by others.",
    },
  },
};

export const createUserForm: Form = {
  schema: z.object({
    email: z.string().email(),
    name: z.string().min(5).max(30),
    password: z.string().min(8),
    password_confirm: z.string().min(8),
  }),
};

export const loginUserForm: Form = {
  schema: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
};

export const createTemplateForm: Form = {
  schema: z.object({
    user: z.string(),
    name: z.string().min(5),
    description: z.string(),
    template: z.string().max(200),
    input: z.string(),
    service: z.string().min(3),
  }),
  fields: {
    name: {
      label: "Name",
    },
    template: {
      label: "Template",
    },
    service: {
      label: "Service",
      type: "select",
      placeholder: "Please choose...",
      description: "The template will be connected to this service.",
      asyncOptions: () => fetchService("user"),
    },
  },
};
