import { FC, useState, useEffect } from "react";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDebounce } from "@uidotdev/usehooks";

import { RecipeModal } from "../RecipeModal";
import { useRecipes } from "../../api";
import { useQuery } from "../../useQuery";

export const RecipeList: FC = () => {
  const query = useQuery();
  const history = useHistory();
  const { pathname } = useLocation();

  const [recipeModalOpen, setRecipeModalOpen] = useState(false);
  const [search, setSearch] = useState(query.get("search") || "");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams({ search: debouncedSearch });
    history.replace({ pathname, search: params.toString() });
  }, [debouncedSearch, history, pathname]);

  const { data: recipes } = useRecipes(debouncedSearch ? debouncedSearch : "");

  //TODO handle loading and error

  return (
    <Container>
      <Header>
        <TitleButton>
          <Title>Recipes</Title>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => setRecipeModalOpen(true)}
          >
            Add recipe
          </Button>
        </TitleButton>
        <SearchBox
          id="outlined-basic"
          label="Search recipes"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Header>
      <Recipes>
        {recipes?.map((recipe) => (
          <Recipe recipe={recipe} key={recipe.id} />
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

const Header = styled.div`
  border-bottom: 1px solid grey;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const TitleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
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
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  const recipeId = pathname.split("/")[2];
  return (
    <Link to={`${url}/${recipe.id}`}>
      <RecipeContainer isSelected={!!recipeId && +recipeId === recipe.id}>
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

const SearchBox = styled(TextField)`
  width: 100%;
`;
