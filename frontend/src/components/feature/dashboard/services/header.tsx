import { Fragment } from 'react';
import { CopyIcon, CpuIcon, TrashIcon, WrenchIcon } from 'lucide-react';
import TemplateNew from '@/app/template/new';
import { Button } from '@/components/ui/button';
import useServiceDashboard from '@/lib/hooks/useServiceDashboard';
import mapServiceField from './fields';

export default function ServiceHeader() {
  const { selected, setSelected, type, isPending, services } = useServiceDashboard();

  const actionsDisabled = isPending || !services?.length;

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

  const handleUpdate = (response: ApiResponse<TemplateResponse>) => {
    setSelected((prev) => ({
      ...(prev ?? Object.create(null)),
      templates: (prev?.templates ?? []).reduce((acc, current) => {
        if (!response.error && 'template' in response) {
          return current.id === response.template.id ? acc : [...acc, current];
        }
        return acc;
      }, Array(0)),
    }));
  };

  return (
    <div className="h-20 px-5 py-3 flex justify-between items-center bg-primary/20 border-t-1 border-primary border-b-1 border-b-white/30">
      {!selected ? null : (
        <Fragment>
          <div className="flex flex-col gap-1 py-6 mr-auto">
            <h1 className="flex gap-5 items-center font-bold text-lg uppercase tracking-widest">
              {selected.name ?? ''}&nbsp;-&nbsp;Details
            </h1>
            <span className="flex items-center text-xs italic">{mapServiceField(selected.updatedAt, 'updatedAt')}</span>
          </div>
          <div className="flex items-center">
            <Button
              className="flex w-30 cursor-pointer m-0 rounded-none"
              onClick={handleStart}
              variant="default"
              disabled={actionsDisabled}
            >
              <CpuIcon />
              Start
            </Button>
            <TemplateNew onUpdate={handleUpdate} />
            {type === 'user' && mapServiceField(selected?.private, 'private')}
            {type === 'all' ? (
              <Button
                className="flex w-30 cursor-pointer m-0 rounded-none"
                variant="outline"
                onClick={handleCopy}
                disabled={actionsDisabled}
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
                  disabled={actionsDisabled}
                >
                  <WrenchIcon />
                  Configure
                </Button>
                <Button
                  className="flex w-30 cursor-pointer m-0 rounded-none"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={actionsDisabled}
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
  );
}
