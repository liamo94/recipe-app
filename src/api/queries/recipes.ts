import { useMutation, useQuery } from "react-query";
import { apiService } from "../service";
import { IngredientNoId, QUERY_KEYS, Recipe } from "../types";

export const useRecipes = (search?: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.recipes, search],
    queryFn: () => apiService.getRecipes(search),
  });

export const useRecipe = (id?: Recipe["id"]) =>
  useQuery({
    queryKey: [QUERY_KEYS.recipe, id],
    queryFn: () => apiService.getRecipe(id!),
    enabled: !!id,
    keepPreviousData: !!id,
  });

export const useDeleteRecipe = (id: Recipe["id"]) =>
  useMutation({
    mutationKey: ["DELETE", QUERY_KEYS.recipe, id],
    mutationFn: () => apiService.deleteRecipe(id),
  });

export const useCreateRecipe = () =>
  useMutation({
    mutationKey: ["CREATE", QUERY_KEYS.recipe],
    mutationFn: (recipe: Omit<Recipe, "id">) => apiService.postRecipe(recipe),
  });

export const useUpdateRecipe = () =>
  useMutation({
    mutationKey: ["UPDATE", QUERY_KEYS.recipe],
    mutationFn: (
      recipe: Omit<Recipe, "ingredients"> & { ingredients?: IngredientNoId[] }
    ) => apiService.updateRecipe(recipe),
  });

export const useIngredients = () =>
  useQuery({
    queryKey: [QUERY_KEYS.ingredients],
    queryFn: () => apiService.getIngredients(),
  });
