import reducer, {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor,
  getIngredientCount,
  validateConstructor
} from '../burgerConstructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('burgerConstructorSlice', () => {
  const bun: TIngredient = {
    _id: 'bun1',
    name: 'Bun',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 200,
    price: 50,
    image: 'bun.png',
    image_large: 'bun_large.png',
    image_mobile: 'bun_mobile.png'
  };

  const ingredient1: TConstructorIngredient = {
    _id: 'ing1',
    id: 'unique1',
    name: 'Ingredient 1',
    type: 'main',
    proteins: 5,
    fat: 10,
    carbohydrates: 15,
    calories: 100,
    price: 20,
    image: 'ing1.png',
    image_large: 'ing1_large.png',
    image_mobile: 'ing1_mobile.png'
  };

  const ingredient2: TConstructorIngredient = {
    _id: 'ing2',
    id: 'unique2',
    name: 'Ingredient 2',
    type: 'main',
    proteins: 6,
    fat: 11,
    carbohydrates: 16,
    calories: 110,
    price: 25,
    image: 'ing2.png',
    image_large: 'ing2_large.png',
    image_mobile: 'ing2_mobile.png'
  };

  const initialState = {
    bun: null,
    ingredients: []
  };

  it('should return the initial state', () => {
    expect(
      reducer(undefined, { type: undefined as unknown as string })
    ).toEqual(initialState);
  });

  it('should handle setBun', () => {
    const result = reducer(initialState, setBun(bun));
    expect(result).toEqual({
      ...initialState,
      bun
    });
  });

  it('should handle addIngredient', () => {
    const result = reducer(initialState, addIngredient(ingredient1));
    expect(result).toEqual({
      ...initialState,
      ingredients: [ingredient1]
    });
  });

  it('should handle removeIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [ingredient1]
    };
    const result = reducer(
      stateWithIngredients,
      removeIngredient(ingredient1.id)
    );
    expect(result).toEqual({
      ...initialState,
      ingredients: []
    });
  });

  it('should handle moveIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [ingredient1, ingredient2]
    };

    const result = reducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );
    expect(result.ingredients).toEqual([ingredient2, ingredient1]);
  });

  it('should handle resetConstructor', () => {
    const stateWithBunAndIngredients = {
      bun,
      ingredients: [ingredient1, ingredient2]
    };
    const result = reducer(stateWithBunAndIngredients, resetConstructor());
    expect(result).toEqual(initialState);
  });

  it('should calculate ingredient count with getIngredientCount', () => {
    const stateWithIngredients = {
      bun,
      ingredients: [ingredient1, ingredient1, ingredient2]
    };

    expect(getIngredientCount(stateWithIngredients, 'bun1')).toBe(2);
    expect(getIngredientCount(stateWithIngredients, 'ing1')).toBe(2);
    expect(getIngredientCount(stateWithIngredients, 'ing2')).toBe(1);
  });

  it('should validate constructor with validateConstructor', () => {
    const invalidState = {
      bun: null,
      ingredients: []
    };
    const validState = {
      bun,
      ingredients: [ingredient1]
    };

    expect(validateConstructor(invalidState)).toBe(false);
    expect(validateConstructor(validState)).toBe(true);
  });
});
