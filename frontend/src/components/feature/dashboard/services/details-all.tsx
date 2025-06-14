import { Fragment } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import useServiceDashboard from '@/lib/hooks/useServiceDashboard';
import mapServiceField from './fields';
import ServiceHeader from './header';
import { ServiceDetailsSkeleton } from './skeletons';

export default function ServiceDetails() {
  const { selected, isPending } = useServiceDashboard();

  const serviceDetails = { ...selected };

  delete serviceDetails.id;
  delete serviceDetails.name;
  delete serviceDetails.private;
  delete serviceDetails.createdAt;
  delete serviceDetails.updatedAt;

  return (
    <Fragment>
      <ServiceHeader />
      <ScrollArea className="h-[calc(100dvh - 150px)] w-full pt-4">
        {isPending ? (
          <ServiceDetailsSkeleton />
        ) : !selected ? null : (
          Object.entries(serviceDetails).map(([key, field]) => {
            const title =
              {
                ['templates']: 'Templates',
                ['description']: 'Description',
              }[key] ?? '';

            const verticalSpace =
              {
                ['description']: '4',
              }[key] ?? '0';

            return (
              <div key={key} className="flex flex-col">
                <div className={`w-full text-left px-5 pb-${verticalSpace}`}>
                  <h2 className="font-bold text-lg text-primary/90 border-b-1 mb-4 border-primary/50">{title}</h2>
                  {mapServiceField(field, key)}
                </div>
              </div>
            );
          })
        )}
      </ScrollArea>
    </Fragment>
  );
}
