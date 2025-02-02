import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.ingredients[dragIndex];

      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedItem);
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;

export const getIngredientCount = (
  state: ConstructorState,
  ingredientId: string
): number => {
  if (state.bun && state.bun._id === ingredientId) {
    return 2;
  }
  return state.ingredients.filter((item) => item._id === ingredientId).length;
};

export const validateConstructor = (state: ConstructorState): boolean =>
  !!state.bun && state.ingredients.length > 0;

export default burgerConstructorSlice.reducer;
