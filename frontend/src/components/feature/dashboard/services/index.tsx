import { ServiceProvider } from "@/components/context/services";
import ServiceDetails from "./details";
import ServiceList from "./list";

type ServicesDeshboardProps = {
  title: string;
  type: "all" | "user";
};

export default function ServicesDashboard(props: ServicesDeshboardProps) {
  return (
    <ServiceProvider {...props}>
      <div className="flex min-h-[calc(100dvh-70px)]">
        <div className="min-h-[calc(100dvh-70px)]">
          <ServiceList />
        </div>
        <div className="flex w-full min-h-[calc(100dvh-70px)]">
          <div className="flex flex-col text-balance bg-sidebar w-full">
            <ServiceDetails />
          </div>
        </div>
      </div>
    </ServiceProvider>
  );
}
