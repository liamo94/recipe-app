import { render, screen } from "@testing-library/react";

import { WrappedComponent } from "../../test";
import { RecipeListHeader } from "./RecipeListHeader";

const Component = () => (
  <WrappedComponent>
    <RecipeListHeader search="Example" setSearch={jest.fn()} />
  </WrappedComponent>
);

describe("Recipe list header", () => {
  it("Should render search recipes", async () => {
    render(<Component />);
    const text = screen.getAllByText("Add recipe");
    expect(text).toBeDefined();
    const searchText = (await screen.findByRole("textbox")) as HTMLInputElement;
    expect(searchText).toBeDefined();
    expect(searchText.value).toEqual("Example");
  });
});
