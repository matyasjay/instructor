import { createContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useServices } from '@/lib/hooks/useServices';
import { PAGES } from '@/lib/pages';

export const ServicesContext = createContext<{
  defaultOpen: string | undefined;
  isPending: boolean;
  selected: Nullable<Partial<ServiceResponse>>;
  services: ServiceResponse[];
  setSelected: React.Dispatch<React.SetStateAction<Nullable<ServiceResponse>>>;
  title: string;
  type: 'user' | 'all';
}>({
  defaultOpen: '',
  isPending: true,
  selected: undefined,
  services: [],
  setSelected: () => null,
  title: '',
  type: 'user',
});

export const ServiceProvider = ({
  children,
  title,
  type,
}: {
  children: React.ReactNode;
  title: string;
  type: 'user' | 'all';
}) => {
  const { id } = useParams();
  const { services, isPending } = useServices(type);
  const [selected, setSelected] = useState<Nullable<ServiceResponse>>(null);

  useEffect(() => {
    if (!isPending && services?.length) {
      const initialService = id
        ? (services.find(({ id: serviceId }) => serviceId && serviceId === id) ?? services[0])
        : services[0];
      setSelected(initialService);
      window.history.pushState(null, '', `${PAGES.PRIVATE.SERVICE_OWN}/${initialService?.id}`);
    }
  }, [isPending]); // eslint-disable-line

  const value = useMemo(
    () => ({
      defaultOpen: id,
      isPending,
      selected,
      services,
      setSelected,
      title,
      type,
    }),
    [selected, id, type, services, isPending, title],
  );

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
};
