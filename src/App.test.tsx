import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("Recipe", () => {
  it('Should render "Recipes"', () => {
    render(<App />);
    const text = screen.getByText("Recipes");
    expect(text).toBeDefined();
  });
});
