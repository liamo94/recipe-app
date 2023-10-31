import { renderHook, screen, waitFor } from "@testing-library/react";
import nock from "nock";
import { RecipeList } from "./RecipeList";
import { useRecipes } from "../../api";
import { WrappedComponent } from "../../test/renderWithProviders";

const Component = () => (
  <WrappedComponent>
    <RecipeList />
  </WrappedComponent>
);

beforeAll(() =>
  nock("http://localhost:8000")
    .get("/api/recipe/recipes")
    .query(true)
    .reply(200, [
      { id: 1, title: "Recipe 1" },
      { id: 2, title: "Recipe 2" },
    ])
);

describe("Recipe list component", () => {
  it("should render recipe list", async () => {
    const { result } = renderHook(() => useRecipes(), { wrapper: Component });

    try {
      await waitFor(() => result.current.isSuccess);
    } catch (e) {}
    const text = screen.getAllByText("Search recipes");
    await expect(text).toBeDefined();
    const links = screen.getAllByRole("link");
    await expect(links.length).toBe(2);
  });
});
