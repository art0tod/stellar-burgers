import reducer, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

const initialState = {
  items: [],
  loading: false,
  error: null
};

describe('ingredientsSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchIngredients', () => {
    test('should handle pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    test('should handle fulfilled', () => {
      const mockIngredients: TIngredient[] = [
        {
          _id: '1',
          name: 'Ingredient 1',
          type: 'bun',
          proteins: 10,
          fat: 5,
          carbohydrates: 20,
          calories: 100,
          price: 50,
          image: 'image1.png',
          image_large: 'image1_large.png',
          image_mobile: 'image1_mobile.png'
        },
        {
          _id: '2',
          name: 'Ingredient 2',
          type: 'main',
          proteins: 15,
          fat: 10,
          carbohydrates: 25,
          calories: 150,
          price: 75,
          image: 'image2.png',
          image_large: 'image2_large.png',
          image_mobile: 'image2_mobile.png'
        }
      ];
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        items: mockIngredients
      });
    });

    test('should handle rejected', () => {
      const errorMessage = 'Ошибка загрузки ингредиентов';
      const action = {
        type: fetchIngredients.rejected.type,
        payload: errorMessage
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });
});
