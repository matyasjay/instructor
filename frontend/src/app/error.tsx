import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

function ErrorDisplay({
  error = Error("Unknown"),
}: {
  error?: Error;
  resetErrorBoundary?: () => void;
}) {
  const displayError =
    error ?? Object(error).response?.data ?? "Unknown error!";
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{JSON.stringify(displayError)}</pre>
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
