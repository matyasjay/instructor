import { useState } from 'react';
import { AlertDialogProps, AlertDialogTriggerProps } from '@radix-ui/react-alert-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type DefaultProps = {
  title: string;
  trigger: React.ReactNode;
  description: string;
  content?: React.ReactNode;
  cancel?: React.ReactNode;
  dismiss?: 'top' | 'split' | 'hidden';
  triggerVariant?: React.ComponentProps<typeof Button>['variant'];
  width?: number;
};

type PopupProps =
  | (DefaultProps & {
      confirm?: undefined;
      onConfirm?: undefined;
      confirmVariant?: undefined;
    })
  | (DefaultProps & {
      confirm: React.ReactNode;
      onConfirm: () => void;
      confirmVariant?: React.ComponentProps<typeof Button>['variant'];
    });

export default function AlertButton({
  title,
  content,
  trigger,
  cancel = 'Cancel',
  description = '',
  triggerVariant = 'default',
  className,
  id,
  defaultOpen = false,
  dismiss = 'top',
  confirm,
  onConfirm,
  confirmVariant = 'default',
  open,
  width = 500,
}: PopupProps & Omit<AlertDialogProps & AlertDialogTriggerProps, keyof PopupProps>) {
  const [isOpen, setIsOpen] = useState(open);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleBack = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog defaultOpen={defaultOpen} open={isOpen}>
      <AlertDialogTrigger id={id} className={cn(className, open ? 'hidden' : '')} asChild>
        <Button variant={triggerVariant} className="cursor-pointer rounded-none" onClick={handleOpen}>
          {trigger}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={cn(`max-w-${width} w-${width} sm:max-w-${width}`)}>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between w-full items-center">
            {title}
            {dismiss === 'top' && (
              <AlertDialogCancel className="cursor-pointer rounded-none" onClick={handleBack}>
                {cancel}
              </AlertDialogCancel>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {content}
        {confirm || dismiss === 'split' ? (
          <AlertDialogFooter>
            <div className="flex w-full justify-around gap-3">
              {confirm && (
                <AlertDialogAction onClick={onConfirm} asChild>
                  <Button variant={confirmVariant} className="w-[50%] cursor-pointer rounded-none">
                    {confirm}
                  </Button>
                </AlertDialogAction>
              )}
              {dismiss === 'split' && (
                <AlertDialogCancel className="cursor-pointer w-[50%] rounded-none" onClick={handleBack}>
                  {cancel}
                </AlertDialogCancel>
              )}
            </div>
          </AlertDialogFooter>
        ) : null}
      </AlertDialogContent>
    </AlertDialog>
  );
}
