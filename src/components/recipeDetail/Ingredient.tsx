import { FC } from "react";
import { Chip } from "@mui/material";
import { useParams } from "react-router-dom";

import {
  Ingredient,
  URL_PARAMS,
  useIngredients,
  useRecipe,
  useUpdateRecipe,
} from "../../api";

export const IngredientChip: FC<{ ingredient: Ingredient }> = ({
  ingredient,
}) => {
  const { recipeId } = useParams<{ [URL_PARAMS.recipeId]: string }>();
  const { data: recipe } = useRecipe(+recipeId);
  const { refetch: refetchRecipe } = useRecipe(+recipeId);
  const { mutateAsync: updateRecipeMutation } = useUpdateRecipe();
  const { refetch: refetchIngredients } = useIngredients();

  const updateRecipe = async (id: Ingredient["id"]) => {
    if (!recipe?.ingredients) return;
    try {
      await updateRecipeMutation(
        {
          ...recipe,
          ingredients: recipe.ingredients.filter((i) => id && id !== i.id),
        },
        {
          onSuccess: () => {
            refetchRecipe();
            refetchIngredients();
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Chip
      label={ingredient.name}
      variant="outlined"
      onDelete={() => updateRecipe(ingredient.id)}
    />
  );
};
