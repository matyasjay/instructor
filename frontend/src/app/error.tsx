import React from "react";
import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from "react-error-boundary";
import { AlertCircleIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { PAGES } from "@/config/pages";
import { parseErrorObject } from "@/lib/utils";
import Layout from "./layout";

export function ErrorDisplay({
  error = Error("Unknown"),
  hideLayout,
}: FallbackProps & { hideLayout?: boolean }) {
  const message = !error.message ? parseErrorObject(error) : error.message;

  const handleClose = () => {
    window.location.pathname = PAGES.PUBLIC.LANDING;
  };

  const children = (
    <div className="flex flex-col w-full gap-3.5 mx-auto min-h-10/12 px-9">
      <div className="w-full pt-4">
        <AlertDialog defaultOpen={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center text-xl pb-3">
                <AlertCircleIcon className="mr-2" />
                Something went wrong!
              </AlertDialogTitle>
              <Separator />
              <AlertDialogDescription>{message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={handleClose}
                className="cursor-pointer"
              >
                Dismiss
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );

  return hideLayout ? children : <Layout>{children}</Layout>;
}

export default function ErrorBoundary({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorDisplay}>
      {children}
    </ReactErrorBoundary>
  );
}
