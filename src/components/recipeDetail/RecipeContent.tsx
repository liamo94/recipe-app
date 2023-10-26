import { FC, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { styled } from "styled-components";
import { Button } from "@mui/material";

import { RecipeDetails } from "./RecipeDetails";
import { RecipeModal } from "../RecipeModal";
import { URL_PARAMS, URL_PATHS } from "../../api";

export const RecipeContent: FC = () => (
  <Switch>
    <Route exact path={`/${URL_PATHS.recipes}`}>
      <CreateRecipe />
    </Route>
    <Route path={`/${URL_PATHS.recipes}/:${URL_PARAMS.recipeId}`}>
      <RecipeDetails />
    </Route>
  </Switch>
);

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
