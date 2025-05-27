import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

function ErrorDisplay({
  error = Error("Unknown"),
}: {
  error?: Error;
  resetErrorBoundary?: () => void;
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export const ErrorBoundary = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ReactErrorBoundary fallbackRender={ErrorDisplay}>
      {children}
    </ReactErrorBoundary>
  );
};
