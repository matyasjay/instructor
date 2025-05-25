import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            throwOnError: true,
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000 * 60,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools />}
      {children}
    </QueryClientProvider>
  );
};
