import { PropsWithChildren } from "react";
import { createMemoryHistory } from "history";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "react-router-dom";
import { BaseStyle } from "../theme";

export const WrappedComponent = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const history = createMemoryHistory();
  return (
    <Router history={history}>
      <QueryClientProvider client={queryClient}>
        <BaseStyle>{children}</BaseStyle>
      </QueryClientProvider>
    </Router>
  );
};
