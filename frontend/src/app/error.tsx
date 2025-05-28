import { AxiosError } from "axios";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { isRouteErrorResponse } from "react-router";

export function ErrorDisplay({
  error = Error("Unknown"),
}: {
  error?: Error;
  resetErrorBoundary?: () => void;
}) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  }

  if (error instanceof AxiosError) {
    return (
      <div>
        <p>Something went wrong:</p>
        <pre>{error?.response?.data}</pre>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }

  return (
    <div>
      <h1>Error</h1>
      <p>Unknown Error!</p>
    </div>
  );
}

export const ErrorBoundary = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorDisplay}>
      {children}
    </ReactErrorBoundary>
  );
};
