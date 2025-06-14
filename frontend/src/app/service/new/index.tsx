import { Fragment, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import AlertButton from '@/components/feature/alert-button';
import FormLayout from '@/components/layout/form';
import { ENDPOINT } from '@/lib/endpoints';
import { createServiceForm } from '@/lib/forms';
import { PAGES } from '@/lib/pages';
import { REQUEST_KEY } from '@/lib/query';
import { authPost } from '@/lib/utils';

type ServiceNewProps = {
  onUpdate: (service: ApiResponse<ServiceResponse>) => void;
};

export default function ServiceNew({ onUpdate }: ServiceNewProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (input: PostServiceInput) => {
    const result = await authPost<PostServiceInput, ServiceResponse>(ENDPOINT.SERVICE_CREATE, input);
    if (!result.error) {
      onUpdate(result);
      setIsOpen(false);
      window.history.pushState(null, '', `${PAGES.PRIVATE.SERVICE_OWN}/${result.id}`);
    }
    return result;
  };

  return (
    <AlertButton
      title="Create New Service"
      description="Fill in the details below so you can configure the service later."
      className="ml-3"
      trigger={
        <Fragment>
          <PlusIcon />
          New Service
        </Fragment>
      }
      triggerVariant="default"
      content={
        <FormLayout
          form={createServiceForm}
          mutationKey={REQUEST_KEY[ENDPOINT.SERVICE_CREATE]}
          onSubmit={handleSubmit}
        />
      }
      open={isOpen}
    />
  );
}
