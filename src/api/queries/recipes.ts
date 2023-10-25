import { useMutation, useQuery } from "react-query";
import { apiService } from "../service";
import { IngredientNoId, Recipe } from "../types";

export const useRecipes = (search?: string) =>
  useQuery({
    queryKey: ["recipes", search],
    queryFn: () => apiService.getRecipes(search),
    retry: 3,
  });

export const useRecipe = (id?: Recipe["id"]) =>
  useQuery({
    queryKey: ["recipe", id],
    queryFn: () => apiService.getRecipe(id!),
    enabled: !!id,
    keepPreviousData: !!id,
  });

export const useDeleteRecipe = (id: Recipe["id"]) =>
  useMutation({
    mutationKey: ["DELETE", "recipe", id],
    mutationFn: () => apiService.deleteRecipe(id),
  });

export const useCreateRecipe = () =>
  useMutation({
    mutationKey: ["CREATE", "recipe"],
    mutationFn: (recipe: Omit<Recipe, "id">) => apiService.postRecipe(recipe),
  });

export const useUpdateRecipe = () =>
  useMutation({
    mutationKey: ["UPDATE", "recipe"],
    mutationFn: (
      recipe: Omit<Recipe, "ingredients"> & { ingredients?: IngredientNoId[] }
    ) => apiService.updateRecipe(recipe),
  });

export const useIngredients = () =>
  useQuery({
    queryKey: ["ingredients"],
    queryFn: () => apiService.getIngredients(),
  });
