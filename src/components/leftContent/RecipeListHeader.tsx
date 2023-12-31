import { useState } from "react";
import { styled } from "styled-components";
import { Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { RecipeModal } from "../RecipeModal";

export const RecipeListHeader = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (s: string) => void;
}) => {
  const [recipeModalOpen, setRecipeModalOpen] = useState(false);

  return (
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
      {recipeModalOpen && (
        <RecipeModal
          open={recipeModalOpen}
          onClose={() => setRecipeModalOpen((v) => !v)}
        />
      )}
    </Header>
  );
};

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

const Title = styled(Typography)`
  && {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const SearchBox = styled(TextField)`
  width: 100%;
`;
