import { FC } from "react";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import {
  useIngredients,
  useRecipe,
  useUpdateRecipe,
  Ingredient,
  Recipe,
} from "../../api";

interface IngredientOptionType extends Ingredient {
  inputValue?: string;
}

const filter = createFilterOptions<IngredientOptionType>();

export const IngredientSearch: FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { data: allIngredients } = useIngredients();
  const { refetch: refetchRecipe } = useRecipe(recipe.id);
  const { mutateAsync: updateRecipeMutation } = useUpdateRecipe();
  const { refetch: refetchIngredients } = useIngredients();

  const updateRecipe = async (name?: Ingredient["name"]) => {
    if (!name) return;
    try {
      await updateRecipeMutation({
        ...recipe,
        ingredients: [...(recipe.ingredients || []), { name }],
      });
      refetchRecipe();
      refetchIngredients();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Autocomplete
      onChange={(_, newValue) => {
        if (typeof newValue === "string") {
          return updateRecipe(newValue);
        } else if (newValue?.inputValue) {
          return updateRecipe(newValue.inputValue);
        }
        return updateRecipe(newValue?.name);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
            id: 0,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={allIngredients ? (allIngredients as IngredientOptionType[]) : []}
      getOptionLabel={() => ""}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Search ingredients" />
      )}
    />
  );
};
