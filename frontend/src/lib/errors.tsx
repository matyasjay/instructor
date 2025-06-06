import { ErrorDisplay } from "@/components/context/error";

export const PageNotFoundError = Error("Page Not Found");

export const NotFound = (
  <ErrorDisplay
    error={PageNotFoundError}
    resetErrorBoundary={() => null}
    hideLayout
  />
);
