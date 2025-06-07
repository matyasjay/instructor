import z from "zod";

export const createServiceForm: Form = {
  schema: z.object({
    service: z.string(),
    name: z.string().min(5).max(30),
    private: z.boolean(),
    description: z.string().min(10).max(150).optional(),
    user: z.string().optional(),
  }),
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
    service: z.string().min(3),
    input: z.string(),
  }),
  fields: {
    name: {
      label: "Template name",
    },
    template: {
      label: "Prompt template",
    },
    service: {
      label: "Connected service",
      type: "select",
      options: [],
    },
  },
};
