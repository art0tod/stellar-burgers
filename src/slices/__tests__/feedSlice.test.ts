import reducer, { fetchFeeds } from '../feedSlice';
import { TOrder } from '@utils-types';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

describe('feedsSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchFeeds', () => {
    test('should handle pending', () => {
      const action = { type: fetchFeeds.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    test('should handle fulfilled', () => {
      const mockOrders: TOrder[] = [
        {
          _id: '1',
          name: 'Order 1',
          ingredients: [],
          status: 'done',
          createdAt: '',
          updatedAt: '',
          number: 1
        },
        {
          _id: '2',
          name: 'Order 2',
          ingredients: [],
          status: 'pending',
          createdAt: '',
          updatedAt: '',
          number: 2
        }
      ];
      const action = {
        type: fetchFeeds.fulfilled.type,
        payload: {
          orders: mockOrders,
          total: 100,
          totalToday: 10
        }
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        orders: mockOrders,
        total: 100,
        totalToday: 10
      });
    });

    test('should handle rejected', () => {
      const errorMessage = 'Ошибка загрузки заказов';
      const action = {
        type: fetchFeeds.rejected.type,
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
