import { useQuery } from "react-query";
import { getUrlPath } from "./utils";

export const useRecipes = () =>
  useQuery({
    queryKey: ["recipes"],
    queryFn: () =>
      fetch(getUrlPath("recipe/recipes")).then(
        (res) => res.json() as Promise<any[]>
      ),
  });

export const useRecipe = (id: string) =>
  useQuery({
    queryKey: ["recipe", id],
    queryFn: () =>
      fetch(getUrlPath(`recipe/recipes/${id}`)).then(
        (res) => res.json() as Promise<any>
      ),
  });
