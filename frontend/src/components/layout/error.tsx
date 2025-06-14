import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { AlertCircleIcon } from 'lucide-react';
import Layout from '@/components/layout/main';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { PAGES } from '@/lib/pages';
import { parseErrorObject } from '@/lib/utils';

type ErrorLayoutProps =
  | (FallbackProps & {
      error: Error;
      hideLayout?: boolean;
      shouldNavigate?: boolean;
      errorTitle?: undefined;
      errorElement?: undefined;
    })
  | {
      errorTitle: string;
      errorElement: React.ReactNode;
      error?: undefined;
      hideLayout?: boolean;
      shouldNavigate?: boolean;
    };

export default function ErrorLayout({
  error = Error('Unknown'),
  hideLayout,
  errorTitle,
  errorElement,
  shouldNavigate = true,
}: ErrorLayoutProps) {
  const message = !error.message ? parseErrorObject(error) : error.message;

  const handleClose = () => {
    if (!shouldNavigate) {
      return;
    }
    window.location.pathname = PAGES.PUBLIC.LANDING;
  };

  const children = (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-xl pb-3">
            <AlertCircleIcon className="mr-2" />
            Something went wrong!
          </AlertDialogTitle>
          <Separator />
          <div className="flex flex-col w-full gap-3.5 mx-auto min-h-10/12">
            <AlertDialogDescription className="text-rose-400 text-lg font-bold">
              {errorTitle ?? message}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <div className="flex flex-col w-full gap-3.5 mx-auto min-h-10/12 px-9">
          <div className="w-full">{!!errorElement && errorElement}</div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose} className="cursor-pointer">
            Dismiss
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return hideLayout ? children : <Layout>{children}</Layout>;
}
