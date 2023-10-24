import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { Route, Switch } from "react-router-dom";
import { styled } from "styled-components";
import { RecipeDetails } from "./RecipeDetails";

export const RecipeContent: FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <CreateRecipe />
      </Route>
      <Route path={`/:recipeId`}>
        <RecipeDetails />
      </Route>
    </Switch>
  );
};

const CreateRecipe: FC = () => {
  return (
    <NoContent>
      <Text>
        <StyledButton>Create a Recipe</StyledButton>
        <Typography>to get started.</Typography>
      </Text>
    </NoContent>
  );
};

const NoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Text = styled.span`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  && {
    font-size: 16px;
  }
`;
