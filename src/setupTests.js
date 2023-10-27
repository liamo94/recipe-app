// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import nock from "nock";

beforeAll(() =>
  nock("http://localhost:8000")
    .get("/api/recipe/recipes")
    .query(true)
    .reply(200, [
      { id: 1, title: "Recipe 1" },
      { id: 2, title: "Recipe 2" },
    ])
);
