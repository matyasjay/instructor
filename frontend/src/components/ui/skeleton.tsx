import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="skeleton" className={cn('bg-accent animate-pulse rounded-md', className)} {...props} />;
}

function Spinner() {
  const size = '70px';
  return (
    <div className="p-4">
      <div className="overflow-hidden shadow-sm w-full flex items-center justify-center h-[300px]">
        <div
          className="animate-spin rounded-full border-4 border-muted border-t-primary"
          style={{ width: size, height: size }}
        />
      </div>
    </div>
  );
}

export { Skeleton, Spinner };
