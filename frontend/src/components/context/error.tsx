import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import ErrorLayout from "@/components/layout/error";

export default function ErrorBoundary({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorLayout}>
      {children}
    </ReactErrorBoundary>
  );
}
