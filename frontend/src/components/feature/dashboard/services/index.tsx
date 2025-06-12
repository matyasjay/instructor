import { ServiceProvider } from "@/components/context/services";
import ServiceDetailsAll from "./details-all";
import ServiceDetailsUser from "./details-user";
import ServiceListAll from "./list-all";
import ServiceListUser from "./list-user";

type ServicesDeshboardProps = {
  title: string;
  type: "all" | "user";
};

export default function ServicesDashboard(props: ServicesDeshboardProps) {
  const list = {
    ["all"]: <ServiceListAll />,
    ["user"]: <ServiceListUser />,
  }[props.type];

  const details = {
    ["all"]: <ServiceDetailsAll />,
    ["user"]: <ServiceDetailsUser />,
  }[props.type];

  return (
    <ServiceProvider {...props}>
      <div className="flex min-h-[calc(100dvh-70px)]">
        <div className="min-h-[calc(100dvh-70px)]">{list}</div>
        <div className="flex w-full min-h-[calc(100dvh-70px)]">
          <div className="flex flex-col text-balance bg-sidebar w-full">
            {details}
          </div>
        </div>
      </div>
    </ServiceProvider>
  );
}
