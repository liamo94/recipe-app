import { styled } from "styled-components";
import { Typography } from "@mui/material";

import { IngredientSearch } from "./IngredientSearch";
import { Recipe } from "../../api";
import { IngredientChip } from "./Ingredient";

export const IngredientsContainer = ({ recipe }: { recipe: Recipe }) => {
  const { ingredients } = recipe;

  return (
    <Container>
      <Typography variant="h2">Ingredients</Typography>
      <AllIngredients>
        {ingredients?.map((ingredient) => (
          <IngredientChip ingredient={ingredient} key={ingredient.id} />
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

const AllIngredients = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  flex-wrap: wrap;
`;
