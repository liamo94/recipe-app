import { FC } from "react";
import { renderHook, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecipeList } from "./RecipeList";
import { BaseStyle } from "../../theme";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { useRecipes } from "../../api";

const RecipeListWithContent: FC = () => {
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
        <BaseStyle>
          <RecipeList />
        </BaseStyle>
      </QueryClientProvider>
    </Router>
  );
};

describe("Test recipe list component", () => {
  it("should render recipe list", async () => {
    const { result } = renderHook(() => useRecipes(), {
      wrapper: RecipeListWithContent,
    });

    try {
      await waitFor(() => result.current.isSuccess);
    } catch (e) {}
    const text = screen.getAllByText("Search recipes");
    await expect(text).toBeDefined();
    const links = screen.getAllByRole("link");
    await expect(links.length).toBe(2);
  });
});
