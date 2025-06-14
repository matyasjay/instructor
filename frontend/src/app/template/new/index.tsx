import { Fragment } from 'react';
import { useParams } from 'react-router';
import { PlusIcon } from 'lucide-react';
import AlertButton from '@/components/feature/alert-button';
import FormLayout from '@/components/layout/form';
import { ENDPOINT } from '@/lib/endpoints';
import { createTemplateForm } from '@/lib/forms';
import { REQUEST_KEY } from '@/lib/query';
import { authPost } from '@/lib/utils';

type TemplateNewProps = {
  onUpdate: (template: ApiResponse<TemplateResponse>) => void;
};

export default function TemplateNew({ onUpdate }: TemplateNewProps) {
  const { id } = useParams();

  const handleSubmit = async (input: PostTemplateInput) => {
    const result = await authPost<PostTemplateInput, TemplateResponse>(ENDPOINT.TEMPLATE_CREATE, {
      ...input,
      serviceId: id ?? '',
    });
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
