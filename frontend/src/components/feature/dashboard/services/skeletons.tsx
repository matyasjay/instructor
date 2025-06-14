import { Skeleton } from '@/components/ui/skeleton';

export function ServiceListSkeleton() {
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

export function ServiceDetailsSkeleton() {
  return (
    <div className="p-8 flex flex-col justify-center space-x-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex space-y-4 gap-8">
          <Skeleton className={`h-6 w-[350px] bg-secondary/50`} />
          <Skeleton className={`h-6 w-[${index % 2 ? '40%' : '60%'}] ${index % 2 ? 'mr-auto' : ''} bg-secondary/50`} />
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
          <Skeleton className={`h-6 w-[${index % 2 ? '40%' : '60%'}] ${index % 2 ? 'mr-auto' : ''} bg-secondary/50`} />
        </div>
      ))}
    </div>
  );
}
