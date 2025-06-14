import { Fragment, useEffect, useState } from 'react';
import ServiceNew from '@/app/service/new';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import useServiceDashboard from '@/lib/hooks/useServiceDashboard';
import { PAGES } from '@/lib/pages';
import { cn } from '@/lib/utils';
import { ServiceListSkeleton } from './skeletons';

export default function ServiceList() {
  const { title, isPending, services, selected, setSelected } = useServiceDashboard();
  const [serviceList, setServicesList] = useState(services);

  const handleSelect = (serviceId: string) => () => {
    setSelected(services.find(({ id }) => id === serviceId) ?? Object.create(null));
    window.history.pushState(null, '', `${PAGES.PRIVATE.SERVICE_OWN}/${serviceId}`);
  };

  const handleUpdate = (service: ApiResponse<ServiceResponse>) => {
    if ('error' in service) {
      return;
    }
    setServicesList((prev) => [...prev, service]);
  };

  useEffect(() => {
    setServicesList(services);
  }, [services]);

  return (
    <Fragment>
      <div className="flex items-center justify-between bg-primary/20 h-20 text-lg leading-none border-b-1 border-primary/40 p-4 font-bold border-r-1">
        {title} <ServiceNew onUpdate={handleUpdate} />
      </div>
      <ScrollArea
        className="min-h-[calc(100dvh-150px)] w-[300px] bg-secondary border-r-1 border-primary/40"
        scrollHideDelay={200}
      >
        {isPending ? (
          <ServiceListSkeleton />
        ) : (
          serviceList.map((service) => (
            <Button
              key={service.id}
              onClick={handleSelect(service.id)}
              className={cn(
                'w-full text-left items-center justify-start cursor-pointer rounded-none bg-secondary capitalize h-12',
                selected?.id === service.id && 'bg-primary/70',
              )}
            >
              {service.name}
            </Button>
          ))
        )}
      </ScrollArea>
    </Fragment>
  );
}
