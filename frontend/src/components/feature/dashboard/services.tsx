import { Fragment, useEffect, useState } from "react";
import { CpuIcon, CopyIcon, WrenchIcon, TrashIcon } from "lucide-react";
import ServiceNew from "@/app/service/new";
import Service from "@/components/feature/dashboard/service";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useServices } from "@/lib/hooks/useServices";
import { PAGES } from "@/lib/pages";
import { cn } from "@/lib/utils";
import { mapBool, mapString } from "./fields";

type ServiceListProps = {
  title: string;
  type: "all" | "user";
  public?: boolean;
  defaultOpen?: string;
};

function ServiceListSkeleton() {
  return (
    <div className="p-8 flex flex-col justify-center space-x-4 gap-4">
      {[...Array(7)].map((_, index) => (
        <div key={index} className="space-y-4">
          <Skeleton className="h-6 w-[100%] bg-sidebar/50" />
          <Skeleton className="h-6 w-[80%] bg-sidebar/50" />
        </div>
      ))}
    </div>
  );
}

function ServiceDetailsSkeleton() {
  return (
    <div className="p-8 flex flex-col justify-center space-x-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex space-y-4 gap-8">
          <Skeleton className={`h-6 w-[350px] bg-secondary/50`} />
          <Skeleton
            className={`h-6 w-[${index % 2 ? "40%" : "60%"}] ${index % 2 ? "mr-auto" : ""} bg-secondary/50`}
          />
        </div>
      ))}
      {[...Array(2)].map((_, index) => (
        <div key={index} className="flex space-y-4 gap-8 mb-4">
          <Skeleton className="h-6 w-[350px] bg-secondary/50" />
          <Skeleton className={`h-[75px] w-[60%] rounded-xl bg-secondary/50`} />
        </div>
      ))}
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex space-y-4 gap-8">
          <Skeleton className="h-6 w-[350px] bg-secondary/50" />
          <Skeleton
            className={`h-6 w-[${index % 2 ? "40%" : "60%"}] ${index % 2 ? "mr-auto" : ""} bg-secondary/50`}
          />
        </div>
      ))}
    </div>
  );
}

export default function Services({
  title,
  type,
  defaultOpen,
}: ServiceListProps) {
  const { services, isPending } = useServices(type);
  const [selected, setSelected] = useState<AggregatedService>();

  const handleStart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    //
  };

  const handleConfigure = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    //
  };

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    //
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    //
  };

  const handleSelect = (e: string) => () => {
    setSelected(services.find(({ id }) => id === e) ?? Object.create(null));
    window.history.pushState(
      null,
      "",
      `${PAGES.PRIVATE.SERVICE_OWN}/${btoa(e)}`,
    );
  };

  useEffect(() => {
    if (!isPending) {
      const initialService = defaultOpen
        ? (services.find(({ id }) => id === atob(defaultOpen)) ?? services[0])
        : services[0];
      setSelected(initialService);
      window.history.pushState(
        null,
        "",
        `${PAGES.PRIVATE.SERVICE_OWN}/${btoa(initialService?.id)}`,
      );
    }
  }, [isPending]); // eslint-disable-line

  return (
    <div>
      <div className="flex min-h-[calc(100dvh-70px)]">
        <div className="min-h-[calc(100dvh-70px)]">
          <div className="flex items-center justify-between bg-primary/20 h-20 text-lg leading-none border-b-1 border-primary/40 p-4 font-bold border-r-1">
            {title} <ServiceNew />
          </div>
          <ScrollArea
            className="min-h-[calc(100dvh-150px)] w-[300px] bg-secondary border-r-1 border-primary/40"
            scrollHideDelay={200}
          >
            {isPending ? (
              <ServiceListSkeleton />
            ) : (
              services.map((service) => (
                <Button
                  key={service.id}
                  onClick={handleSelect(service.id)}
                  className={cn(
                    "w-full text-left items-center justify-start cursor-pointer rounded-none bg-secondary capitalize h-12",
                    selected?.id === service.id && "bg-primary/70",
                  )}
                >
                  {service.name}
                </Button>
              ))
            )}
          </ScrollArea>
        </div>
        <div className="flex w-full min-h-[calc(100dvh-70px)]">
          <div className="flex flex-col text-balance bg-sidebar w-full">
            <div className="h-20 px-5 py-3 flex justify-between items-center border-b-1 border-primary/40 bg-secondary">
              {!selected ? null : (
                <Fragment>
                  <div className="flex flex-col gap-1 py-6 bg-secondary/30 mr-auto ">
                    <h1 className="flex capitalize font-extrabold text-lg gap-5 items-center">
                      {selected.name ?? ""}
                    </h1>
                    <span className="flex items-center gap-4 text-xs italic">
                      {mapString(selected.updatedAt + "", "updatedAt")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Button
                      className="flex w-30 cursor-pointer m-0 rounded-none"
                      onClick={handleStart}
                      variant="default"
                      disabled={isPending || !services.length}
                    >
                      <CpuIcon />
                      Start
                    </Button>
                    {mapBool(selected?.private, "private")}
                    {type === "all" ? (
                      <Button
                        className="flex w-30 cursor-pointer m-0 rounded-none"
                        variant="outline"
                        onClick={handleCopy}
                        disabled={isPending || !services.length}
                      >
                        <CopyIcon />
                        Copy
                      </Button>
                    ) : (
                      <Fragment>
                        <Button
                          className="flex w-30 cursor-pointer m-0 rounded-none"
                          onClick={handleConfigure}
                          variant="outline"
                          disabled={isPending || !services.length}
                        >
                          <WrenchIcon />
                          Configure
                        </Button>
                        <Button
                          className="flex w-30 cursor-pointer m-0 rounded-none"
                          variant="destructive"
                          onClick={handleDelete}
                          disabled={isPending || !services.length}
                        >
                          <TrashIcon />
                          Delete
                        </Button>
                      </Fragment>
                    )}
                  </div>
                </Fragment>
              )}
            </div>
            <ScrollArea className="h-[calc(100dvh - 150px)] w-full pt-4">
              {isPending ? (
                <ServiceDetailsSkeleton />
              ) : !selected ? null : (
                <Service service={selected} />
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
