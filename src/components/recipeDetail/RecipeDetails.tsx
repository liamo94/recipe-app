import { useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { Button, CircularProgress, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { IngredientsContainer } from "./IngredientsContainer";
import { RecipeModal } from "../RecipeModal";
import { DeleteFooter } from "./DeleteFooter";
import { URL_PARAMS, useRecipe } from "../../api";

export const RecipeDetails = () => {
  const { recipeId } = useParams<{ [URL_PARAMS.recipeId]: string }>();
  const { data: recipe, isLoading } = useRecipe(+recipeId);
  const [recipeModalOpen, setRecipeModalOpen] = useState(false);

  if (isLoading || !recipe) return <CircularProgress />;
  const { title, description, ingredients } = recipe;

  return (
    <Container>
      <TopBar>
        <Typography variant="h1">{title}</Typography>
        <Button endIcon={<EditIcon />} onClick={() => setRecipeModalOpen(true)}>
          Edit
        </Button>
        {recipeModalOpen && (
          <RecipeModal
            open={recipeModalOpen}
            onClose={() => setRecipeModalOpen((v) => !v)}
            recipe={recipe}
          />
        )}
      </TopBar>
      {description && <Typography>{description}</Typography>}
      {ingredients && <IngredientsContainer recipe={recipe} />}
      <DeleteFooter recipe={recipe} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const TopBar = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;
