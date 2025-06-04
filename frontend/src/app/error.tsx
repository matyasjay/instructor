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
      <div>
        <div role="alert">
          <div className="border border-x-0 border-t-0 border-red-400 bg-red-100 px-4 py-3 text-red-700">
            <p>{message}</p>
          </div>
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
