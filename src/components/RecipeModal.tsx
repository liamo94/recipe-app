import { useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { styled } from "styled-components";
import { useQueryClient } from "react-query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import {
  QUERY_KEYS,
  Recipe,
  URL_PATHS,
  useCreateRecipe,
  useRecipe,
  useRecipes,
  useUpdateRecipe,
} from "../api";

interface RecipeModalProps {
  open: boolean;
  onClose: () => void;
  recipe?: Recipe;
}
export const RecipeModal = ({
  open,
  onClose,
  recipe: initialRecipe,
}: RecipeModalProps) => {
  const isEdit = !!initialRecipe;
  // For simplicity using local state rather than form library.
  const [recipe, setRecipe] = useState<Recipe>(
    initialRecipe || { title: "", id: 0 }
  );
  const { mutateAsync: createRecipe } = useCreateRecipe();
  const { mutateAsync: updateRecipe } = useUpdateRecipe();
  const { refetch: refetchRecipe } = useRecipe(initialRecipe?.id);
  const queryClient = useQueryClient();
  const { data: recipes } = useRecipes();

  const updateRecipes = (newRecipe: Recipe, isEdit = false) =>
    queryClient.setQueriesData(
      [QUERY_KEYS.recipes],
      isEdit
        ? recipes?.map((r) => (r.id === newRecipe.id ? newRecipe : r))
        : [newRecipe, ...(recipes || [])]
    );

  const history = useHistory();
  const createOrUpdateRecipe = async () => {
    try {
      const newRecipe = isEdit
        ? await updateRecipe(recipe)
        : await createRecipe(recipe);
      updateRecipes(newRecipe, isEdit);

      if (isEdit) {
        refetchRecipe();
      }
      if (!isEdit) {
        history.push(`/${URL_PATHS.recipes}/${newRecipe.id}`);
      }
      onClose();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle>{isEdit ? "Edit" : "Create"} recipe</DialogTitle>
      <DialogContent>
        <Content>
          <TextField
            id="outlined-basic"
            label="Title"
            autoFocus={!isEdit}
            variant="outlined"
            value={recipe.title}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setRecipe((r) => ({ ...r, title: event.target.value }));
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Description (optional)"
            multiline
            rows={4}
            value={recipe.description}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setRecipe((r) => ({ ...r, description: event.target.value }));
            }}
          />
        </Content>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button disabled={!recipe.title} onClick={createOrUpdateRecipe}>
          {isEdit ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(1)};
`;
