import { Button } from "@mui/material";
import { FC, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { styled } from "styled-components";
import { RecipeDetails } from "./RecipeDetails";
import { RecipeModal } from "../RecipeModal";

export const RecipeContent: FC = () => {
  return (
    <Switch>
      <Route exact path="/recipes">
        <CreateRecipe />
      </Route>
      <Route path={`/recipes/:recipeId`}>
        <RecipeDetails />
      </Route>
    </Switch>
  );
};

const CreateRecipe: FC = () => {
  const [recipeModalOpen, setRecipeModalOpen] = useState(false);

  return (
    <NoContent>
      <StyledButton onClick={() => setRecipeModalOpen(true)}>
        Create a Recipe
      </StyledButton>
      {recipeModalOpen && (
        <RecipeModal
          open={recipeModalOpen}
          onClose={() => setRecipeModalOpen((v) => !v)}
        />
      )}
    </NoContent>
  );
};

const NoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const StyledButton = styled(Button)`
  && {
    font-size: 16px;
  }
`;
