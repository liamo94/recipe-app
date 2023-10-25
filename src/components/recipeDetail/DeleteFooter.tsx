import { FC } from "react";
import { useHistory } from "react-router-dom";
import { styled } from "styled-components";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQueryClient } from "react-query";

import { useDeleteRecipe, useRecipes, Recipe } from "../../api";

export const DeleteFooter: FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { data: recipes } = useRecipes();
  const queryClient = useQueryClient();

  const deleteRecipeMutation = useDeleteRecipe(recipe.id);
  const history = useHistory();
  const deleteRecipe = () => {
    deleteRecipeMutation.mutate(undefined, {
      onSuccess: () => {
        const newRecipes = recipes?.filter((r) => r.id !== recipe.id);
        const path = `/recipes${
          newRecipes?.length ? `/${newRecipes[0].id}` : ""
        }`;
        queryClient.setQueriesData(["recipes"], newRecipes);
        history.push(path);
      },
    });
  };
  return (
    <Container>
      <Button color="error" endIcon={<DeleteIcon />} onClick={deleteRecipe}>
        Delete recipe
      </Button>
    </Container>
  );
};

const Container = styled.footer`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing(2)};
  left: 50%;
  transform: translate(-50%, -50%);
`;
