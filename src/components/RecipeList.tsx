import { Button, Typography } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { useRecipes } from "../api";
import { Link, useParams } from "react-router-dom";

export const RecipeList: FC = () => {
  const { data: recipes, isError, isLoading } = useRecipes();

  //TODO handle loading and error

  return (
    <Container>
      <Header>
        <Title>Recipes</Title>
        <Button startIcon={<AddIcon />} variant="contained">
          Add recipe
        </Button>
      </Header>
      <Recipes>
        {recipes?.map((recipe) => (
          <Recipe recipe={recipe} key={recipe.id} />
        ))}
      </Recipes>
    </Container>
  );
};

const Container = styled.div`
  max-width: 320px;
  border-right: 1px solid grey;
  flex: 1;
  overflow-y: auto;
  background: ${({ theme }) => theme.palette.grey["100"]};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const Recipes = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing(1)};

  :not(:last-child) {
    border-bottom: 1px solid grey;
  }
`;

const Recipe: FC<{ recipe: any }> = ({ recipe }) => {
  const { recipeId } = useParams<{ recipeId?: string }>();
  console.log("hey", recipeId, recipe.id);

  return (
    <Link to={`/${recipe.id}`}>
      <RecipeContainer isSelected={recipeId === recipe.id}>
        {recipe.title}
      </RecipeContainer>
    </Link>
  );
};

const RecipeContainer = styled.div<{ isSelected?: boolean }>`
  padding: ${({ theme }) => theme.spacing(2, 1)};
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.palette.grey["400"] : "inherit"};
  &:hover {
    background: ${({ theme }) => theme.palette.grey["300"]};
  }
`;

const Title = styled(Typography)`
  && {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;
