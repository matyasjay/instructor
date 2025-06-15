import { Fragment } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import useServiceDashboard from '@/lib/hooks/useServiceDashboard';
import mapServiceField from './fields';
import ServiceHeader from './header';
import { ServiceDetailsSkeleton } from './skeletons';

export default function ServiceDetails() {
  const { selected, isPending } = useServiceDashboard();

  const service = structuredClone(selected);

  if (service) {
    delete service.id;
    delete service.name;
    delete service.private;
    delete service.createdAt;
    delete service.updatedAt;
  }

  const templates =
    (service?.templates?.length ?? 0) > 0 ? (
      mapServiceField(service?.templates, 'templates')
    ) : (
      <div className="flex flex-col relative mb-4">
        <div className="capitalize w-full flex items-center bg-secondary border-x-1 border-b-1 border-white/20 p-2">
          <div className="flex flex-col ml-auto bg-secondary w-full justify-center h-full p-2">
            No templates to show.
          </div>
        </div>
      </div>
    );

  console.log(service?.users);

  return (
    <Fragment>
      <ServiceHeader />
      <div className="mt-20 flex items-center text-left text-xs px-5 py-2 bg-secondary/30 border-b-1 border-primary">
        {!!service && <>Used by{mapServiceField(service?.users, 'users')}</>}
      </div>
      <ScrollArea className="h-[calc(100dvh - 150px)] w-full">
        {isPending ? (
          <ServiceDetailsSkeleton />
        ) : !service ? null : (
          <div className="flex flex-col">
            <div className="w-full text-left px-5 py-4">{service.description}</div>
            <div className={`w-full text-left pb-0`}>
              <Fragment>
                <div className="flex p-3 items-center justify-between bg-primary/10 border-y-1 border-primary">
                  <h2 className="font-bold text-lg uppercase tracking-widest">
                    {selected?.name ?? ''}&nbsp;-&nbsp;Templates
                  </h2>
                </div>
                {templates}
              </Fragment>
            </div>
          </div>
        )}
      </ScrollArea>
    </Fragment>
  );
}
