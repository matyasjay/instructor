import ErrorLayout from "@/components/layout/error";

export const PageNotFoundError = Error("Page Not Found");

export const NotFound = (
  <ErrorLayout
    error={PageNotFoundError}
    resetErrorBoundary={() => null}
    hideLayout
  />
);
