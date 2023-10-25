// If the backend API gets more complex, we'd want to generate these from the schema
// http://localhost:8000/api/json/

export type Recipe = {
  id: number;
  title: string;
  description?: string;
  ingredients?: Ingredient[];
};

export type Ingredient = {
  id?: number;
  name: string;
};

export type IngredientNoId = Pick<Ingredient, "name">;
