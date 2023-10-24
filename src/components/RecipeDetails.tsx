import { FC } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useRecipe } from "../api";
import { CircularProgress } from "@mui/material";

export const RecipeDetails: FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  console.log({ recipeId });
  const { data: recipe, isLoading } = useRecipe(recipeId);
  if (isLoading || !recipe) return <CircularProgress />;

  return (
    <Container>
      <h1>{recipe.title}</h1>
    </Container>
  );
};

const Container = styled.div``;
