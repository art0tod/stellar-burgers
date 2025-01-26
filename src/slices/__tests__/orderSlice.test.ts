import reducer, {
  sendOrder,
  fetchUserOrders,
  closeOrderModal
} from '../orderSlice';
import { TOrder } from '@utils-types';

const initialState = {
  loading: false,
  modalData: null,
  error: null,
  userOrders: []
};

describe('orderSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('closeOrderModal', () => {
    const stateWithModalData = {
      ...initialState,
      modalData: {
        _id: '1',
        name: 'Order 1',
        ingredients: [],
        status: 'done',
        createdAt: '',
        updatedAt: '',
        number: 1
      }
    };
    const state = reducer(stateWithModalData, closeOrderModal());

    expect(state).toEqual({
      ...initialState,
      modalData: null
    });
  });

  describe('sendOrder', () => {
    test('should handle pending', () => {
      const action = { type: sendOrder.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    test('should handle fulfilled', () => {
      const mockOrder: TOrder = {
        _id: '1',
        name: 'Order 1',
        ingredients: [],
        status: 'done',
        createdAt: '',
        updatedAt: '',
        number: 1
      };
      const action = { type: sendOrder.fulfilled.type, payload: mockOrder };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        modalData: mockOrder
      });
    });

    test('should handle rejected', () => {
      const errorMessage = 'Ошибка оформления заказа';
      const action = { type: sendOrder.rejected.type, payload: errorMessage };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('fetchUserOrders', () => {
    test('should handle pending', () => {
      const action = { type: fetchUserOrders.pending.type };
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
        type: fetchUserOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        userOrders: mockOrders
      });
    });

    test('should handle rejected', () => {
      const errorMessage = 'Ошибка получения заказов';
      const action = {
        type: fetchUserOrders.rejected.type,
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
