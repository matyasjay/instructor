import z from 'zod/v4';

export const createServiceForm: Form = {
  schema: z.object({
    userId: z.string(),
    name: z.string().min(5).max(30),
    description: z.string().min(10).max(150).optional(),
    private: z.string().transform((arg) => !!arg),
  }),
  fields: {
    name: {
      type: 'text',
      label: 'Name',
    },
    description: {
      type: 'text',
      label: 'Description',
    },
    private: {
      type: 'toggle',
      label: 'Private',
    },
  },
};

export const createUserForm: Form = {
  schema: z
    .object({
      email: z.email(),
      name: z.string().min(5, { error: 'Name must be at least five (5) characters long!' }).max(30, {
        error: 'Name cannot be more than thirty (30) characters long!',
      }),
      password: z.string().min(8, {
        error: 'Password must be at least eight (8) characters long!',
      }),
      password_confirm: z.string(),
    })
    .check((ctx) => {
      if (ctx.value.password_confirm !== ctx.value.password) {
        ctx.issues.push({
          code: 'custom',
          error: 'Password and confirmation must match!',
          input: ctx.value.password_confirm,
        });
      }
    }),
  fields: {
    email: {
      label: 'E-mail',
      type: 'email',
    },
    name: {
      label: 'Name',
      type: 'text',
    },
    password: {
      label: 'Password',
      type: 'password',
    },
    password_confirm: {
      label: 'Confirm',
      type: 'password',
    },
  },
};

export const loginUserForm: Form = {
  schema: z.object({
    email: z.email({ error: 'The e-mail address you entered is not valid!' }),
    password: z.string().min(8, {
      error: 'Password must be at least eight (8) characters long!',
    }),
  }),
  fields: {
    email: {
      type: 'email',
      label: 'E-mail',
    },
    password: {
      type: 'password',
      label: 'Password',
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
  }),
  fields: {
    name: {
      label: 'Name',
    },
    template: {
      label: 'Template',
    },
  },
};
