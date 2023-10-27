import { FC } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { styled } from "styled-components";

import { Recipe } from "../../api";

export const RecipeItem: FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  const recipeId = pathname.split("/")[2];
  return (
    <Link to={`${url}/${recipe.id}`}>
      <RecipeContainer $isSelected={!!recipeId && +recipeId === recipe.id}>
        {recipe.title}
      </RecipeContainer>
    </Link>
  );
};

const RecipeContainer = styled.div<{ $isSelected?: boolean }>`
  padding: ${({ theme }) => theme.spacing(2, 1)};
  background: ${({ theme, $isSelected }) =>
    $isSelected ? theme.palette.grey["400"] : "inherit"};
  &:hover {
    background: ${({ theme }) => theme.palette.grey["300"]};
  }
`;
