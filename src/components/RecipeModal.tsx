import { FC, useState, ChangeEvent } from "react";
import { Recipe } from "../api/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { styled } from "styled-components";
import {
  useCreateRecipe,
  useRecipe,
  useRecipes,
  useUpdateRecipe,
} from "../api";
import { useHistory } from "react-router-dom";

interface RecipeModalProps {
  open: boolean;
  onClose: () => void;
  onUpsert?: () => void;
  recipe?: Recipe;
}
export const RecipeModal: FC<RecipeModalProps> = ({
  open,
  onClose,
  recipe: initialRecipe,
}) => {
  const isEdit = !!initialRecipe;
  const [recipe, setRecipe] = useState<Recipe>(
    initialRecipe || { title: "", id: 0 }
  );
  const { mutateAsync: createRecipe } = useCreateRecipe();
  const { mutateAsync: updateRecipe } = useUpdateRecipe();
  const { refetch: refetchRecipe } = useRecipe(initialRecipe?.id);

  const history = useHistory();
  const { refetch: refetchRecipes } = useRecipes();
  const createOrUpdateRecipe = async () => {
    try {
      const newRecipe = isEdit
        ? await updateRecipe(recipe)
        : await createRecipe(recipe);
      refetchRecipes();
      if (isEdit) refetchRecipe();
      history.push(`/recipes/${newRecipe.id}`);
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
      <DialogTitle>Create recipe</DialogTitle>
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
