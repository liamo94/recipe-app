import { getUrlPath } from "./queries/utils";
import { Ingredient, IngredientNoId, Recipe } from "./types";

const BASE_RECIPE_URL = "recipe/recipes";
const BASE_INGREDIENTS_URL = "recipe/ingredients";

class Service {
  getRecipes(search = "") {
    return this.getData<Recipe[]>(`${BASE_RECIPE_URL}?search=${search}`);
  }

  getRecipe(id: Recipe["id"]) {
    return this.getData<Recipe>(`${BASE_RECIPE_URL}/${id}/`);
  }

  postRecipe(recipe: Omit<Recipe, "id">) {
    return this.getData<Recipe>(`${BASE_RECIPE_URL}/`, {
      method: "POST",
      body: JSON.stringify(recipe),
    });
  }

  updateRecipe({
    id,
    ...recipe
  }: Omit<Recipe, "ingredients"> & { ingredients?: IngredientNoId[] }) {
    return this.getData<Recipe>(`${BASE_RECIPE_URL}/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(recipe),
    });
  }

  deleteRecipe(id: Recipe["id"]) {
    return this.deleteData(`${BASE_RECIPE_URL}/${id}/`);
  }

  getIngredients() {
    return this.getData<Ingredient[]>(`${BASE_INGREDIENTS_URL}/`);
  }

  private getData<T>(url: string, fetchParams?: RequestInit) {
    return new Promise<T>((resolve, reject) => {
      fetch(getUrlPath(url), {
        ...fetchParams,
        headers: {
          ...fetchParams?.headers,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch((res) => reject(res));
    });
  }
  private deleteData(url: string) {
    return new Promise<void>((resolve, reject) => {
      fetch(getUrlPath(url), { method: "DELETE" })
        .then(() => resolve(undefined))
        .catch((res) => reject(res));
    });
  }
}

export const apiService = new Service();
