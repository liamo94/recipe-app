import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress, Typography } from "@mui/material";
import { useDebounce } from "usehooks-ts";

import { RecipeModal } from "../RecipeModal";
import { useRecipes } from "../../api";
import { useQuery } from "../../useQuery";
import { RecipeItem } from "./RecipeItem";
import { RecipeListHeader } from "./RecipeListHeader";

const DEBOUNCE_TIME = 300;

export const RecipeList = () => {
  const query = useQuery();
  const history = useHistory();
  const { pathname } = useLocation();

  const [recipeModalOpen, setRecipeModalOpen] = useState(false);
  const [search, setSearch] = useState(query.get("search") || "");
  const debouncedSearch = useDebounce(search, DEBOUNCE_TIME);

  useEffect(() => {
    const params = new URLSearchParams({ search: debouncedSearch });
    history.replace({ pathname, search: params.toString() });
  }, [debouncedSearch, history, pathname]);

  const {
    data: recipes,
    isLoading,
    isError,
  } = useRecipes(debouncedSearch ? debouncedSearch : "");

  return (
    <Container>
      <RecipeListHeader search={search} setSearch={setSearch} />
      <Recipes>
        {isLoading && <CircularProgress />}
        {isError && <Typography>Something went wrong</Typography>}

        {recipes?.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </Recipes>
      {recipeModalOpen && (
        <RecipeModal
          open={recipeModalOpen}
          onClose={() => setRecipeModalOpen((v) => !v)}
        />
      )}
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

const Recipes = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing(1)};

  :not(:last-child) {
    border-bottom: 1px solid grey;
  }
`;
