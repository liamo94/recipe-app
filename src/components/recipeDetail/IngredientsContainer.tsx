import { FC } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { Chip, Typography } from "@mui/material";

import { IngredientSearch } from "./IngredientSearch";
import {
  useIngredients,
  useRecipe,
  useUpdateRecipe,
  Ingredient,
  Recipe,
} from "../../api";

export const IngredientsContainer: FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { ingredients } = recipe;

  return (
    <Container>
      <Typography variant="h2">Ingredients</Typography>
      <AllIngredients>
        {ingredients?.map((ingredient) => (
          <IngredientContainer ingredient={ingredient} key={ingredient.id} />
        ))}
        {!ingredients?.length && (
          <Typography variant="caption">No ingredients set</Typography>
        )}
      </AllIngredients>
      <IngredientSearch recipe={recipe} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const IngredientContainer: FC<{ ingredient: Ingredient }> = ({
  ingredient,
}) => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { data: recipe } = useRecipe(+recipeId);
  const { refetch: refetchRecipe } = useRecipe(+recipeId);
  const { mutateAsync: updateRecipeMutation } = useUpdateRecipe();
  const { refetch: refetchIngredients } = useIngredients();

  const updateRecipe = async (id: Ingredient["id"]) => {
    if (!recipe?.ingredients) return;
    try {
      await updateRecipeMutation({
        ...recipe,
        ingredients: recipe.ingredients.filter((i) => id && id !== i.id),
      });
      refetchRecipe();
      refetchIngredients();
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

const AllIngredients = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  flex-wrap: wrap;
`;
