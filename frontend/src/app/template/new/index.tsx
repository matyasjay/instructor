import { Fragment } from 'react';
import { useParams } from 'react-router';
import { PlusIcon } from 'lucide-react';
import z from 'zod/v4';
import AlertButton from '@/components/feature/alert-button';
import FormLayout from '@/components/layout/form';
import { ENDPOINT } from '@/lib/endpoints';
import { REQUEST_KEY } from '@/lib/query';
import { authPost } from '@/lib/utils';

type TemplateNewProps = {
  onUpdate: (template: ApiResponse<TemplateResponse>) => void;
};

export const createTemplateForm: Form = {
  schema: z.object({
    userId: z.string(),
    name: z.string().min(5),
    description: z.string(),
    template: z.string().max(200),
    inputs: z.string(),
  }),
  fields: {
    name: {
      label: 'Name',
      type: 'text',
    },
    description: {
      label: 'Description',
      type: 'text',
    },
    template: {
      label: 'Template',
      type: 'text',
    },
    inputs: {
      type: 'form',
      form: {
        schema: z.object({
          userId: z.string(),
          inputs: z.string(),
        }),
        fields: {
          inputs: {
            name: 'inputs',
            label: 'Inputs',
            type: 'input-list',
            options: [
              { label: 'Text', type: 'string' },
              { label: 'Number', type: 'number' },
              { label: 'Toggle', type: 'boolean' },
            ],
          },
        },
      },
    },
  },
};

export default function TemplateNew({ onUpdate }: TemplateNewProps) {
  const { id } = useParams();

  const handleSubmit = async (input: FormInput) => {
    const result = await authPost<PostTemplateInput, TemplateResponse>(ENDPOINT.TEMPLATE_CREATE, {
      ...input,
      serviceId: id ?? '',
    } as PostTemplateInput);
    if (!result.error) {
      onUpdate(result);
    }
    return result;
  };

  return (
    <AlertButton
      title="Create New Template"
      trigger={
        <Fragment>
          <PlusIcon />
          Template
        </Fragment>
      }
      triggerVariant="outline"
      description="Fill in the details below then submit to create a new template."
      content={
        <FormLayout
          form={createTemplateForm}
          mutationKey={REQUEST_KEY[ENDPOINT.TEMPLATE_CREATE]}
          onSubmit={handleSubmit}
        />
      }
    />
  );
}
