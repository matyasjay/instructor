import z from "zod";
import { ENDPOINT } from "./endpoints";
import { authPost } from "./utils";

export const createServiceForm: Form = {
  schema: z.object({
    userId: z.string(),
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
  fields: {
    email: {
      label: "E-mail",
    },
    password_confirm: {
      label: "Confirm password",
      type: "password",
    },
  },
};

export const loginUserForm: Form = {
  schema: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
  fields: {
    email: {
      label: "E-mail",
    },
  },
};

export const createTemplateForm: Form = {
  schema: z.object({
    userId: z.string(),
    name: z.string().min(5),
    description: z.string(),
    template: z.string().max(200),
    input: z.string(),
    serviceId: z.string().min(3),
  }),
  fields: {
    name: {
      label: "Name",
    },
    template: {
      label: "Template",
    },
    serviceId: {
      label: "Service",
      type: "select",
      placeholder: "Please choose...",
      asyncOptions: async () => {
        const response = await authPost<{ private: boolean }, Service[]>(
          ENDPOINT.SERVICE_GET,
          { private: true },
          { skipNormalize: true },
        );

        if ("error" in response && response.error) {
          throw response.error;
        }

        return response as Service[];
      },
    },
  },
};
