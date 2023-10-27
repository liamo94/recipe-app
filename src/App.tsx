import { QueryClient, QueryClientProvider } from "react-query";

import { PageRouter } from "./Router";
import { BaseStyle } from "./theme";
import "./App.scss";

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BaseStyle>
        <PageRouter />
      </BaseStyle>
    </QueryClientProvider>
  );
};
