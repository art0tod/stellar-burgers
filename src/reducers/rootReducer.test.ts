import rootReducer from './rootReducer';
import { initialState as ingredientsInitialState } from '../slices/ingredientsSlice';
import { initialState as authInitialState } from '../slices/authSlice';
import { initialState as orderInitialState } from '../slices/orderSlice';
import { initialState as burgerConstructorInitialState } from '../slices/burgerConstructorSlice';
import { initialState as feedInitialState } from '../slices/feedSlice';

describe('rootReducer', () => {
  test('should return the initial state', () => {
    const state = rootReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      ingredients: ingredientsInitialState,
      auth: authInitialState,
      order: orderInitialState,
      burgerConstructor: burgerConstructorInitialState,
      feed: feedInitialState
    });
  });

  test('should correctly process actions for individual reducers', () => {
    const sampleAction = {
      type: 'ingredients/fetchIngredients/pending'
    };

    const state = rootReducer(undefined, sampleAction);

    expect(state.ingredients.loading).toBe(true);
    expect(state.auth).toEqual(authInitialState);
    expect(state.order).toEqual(orderInitialState);
    expect(state.burgerConstructor).toEqual(burgerConstructorInitialState);
    expect(state.feed).toEqual(feedInitialState);
  });
});
