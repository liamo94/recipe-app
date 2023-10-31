import { useHistory } from "react-router-dom";
import { styled } from "styled-components";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQueryClient } from "react-query";

import {
  useDeleteRecipe,
  useRecipes,
  Recipe,
  QUERY_KEYS,
  URL_PATHS,
} from "../../api";

export const DeleteFooter = ({ recipe }: { recipe: Recipe }) => {
  const { data: recipes } = useRecipes();
  const queryClient = useQueryClient();

  const { mutate: deleteRecipeMutation } = useDeleteRecipe(recipe.id);
  const history = useHistory();
  const deleteRecipe = () => {
    deleteRecipeMutation(undefined, {
      onSuccess: () => {
        const newRecipes = recipes?.filter((r) => r.id !== recipe.id);
        const path = `/${URL_PATHS.recipes}${
          newRecipes?.length ? `/${newRecipes[0].id}` : ""
        }`;
        queryClient.setQueriesData([QUERY_KEYS.recipes], newRecipes);
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
