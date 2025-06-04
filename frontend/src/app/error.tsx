import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { parseErrorObject } from "@/lib/utils";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import Layout from "./layout";

export function ErrorDisplay({
  error = Error("Unknown"),
}: {
  error?: Error;
  resetErrorBoundary?: () => void;
}) {
  const parsedError = parseErrorObject(error);
  const message = parsedError.message ?? "Page Not Found";

  return (
    <Layout>
      <div className="flex flex-col w-full gap-3.5 mx-auto min-h-10/12 px-9">
        <div className="w-full pt-4">
          <h1 className="flex scroll-m-20 text-lg font-semibold tracking-tight mb-4">
            Error
          </h1>
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{message}</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside text-m">
                <li>The page may have moved or been deleted</li>
                <li>You might have mistyped the URL</li>
                <li>The link you followed could be outdated</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </Layout>
  );
}

export const ErrorBoundary = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorDisplay}>
      {children}
    </ReactErrorBoundary>
  );
};
