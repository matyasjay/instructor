import { ServiceProvider } from '@/components/context/services';
import ServiceDetailsAll from './details-all';
import ServiceDetailsUser from './details-user';
import ServiceListAll from './list-all';
import ServiceListUser from './list-user';

type ServicesDeshboardProps = {
  title: string;
  type: 'all' | 'user';
};

export default function ServicesDashboard(props: ServicesDeshboardProps) {
  const list = {
    ['all']: <ServiceListAll />,
    ['user']: <ServiceListUser />,
  }[props.type];

  const details = {
    ['all']: <ServiceDetailsAll />,
    ['user']: <ServiceDetailsUser />,
  }[props.type];

  return (
    <ServiceProvider {...props}>
      <div className="flex max-h-[calc(100dvh-70px)] overflow-hidden">
        <div className="w-[300px] max-h-[calc(100dvh-70px)] border-r-1 border-l-primary">{list}</div>
        <div className="flex max-h-[calc(100dvh-70px)] overflow-auto">
          <div
            className="left-[300px] right-0 fixed flex flex-col text-balance bg-sidebar overflow-auto h-full"
            id="main_content"
          >
            {details}
          </div>
        </div>
      </div>
    </ServiceProvider>
  );
}
