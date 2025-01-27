import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '../utils/burger-api';
import { TOrder } from '@utils-types';

interface IOrderState {
  loading: boolean;
  modalData: TOrder | null;
  error: string | null;
  userOrders: TOrder[];
}

export const initialState: IOrderState = {
  loading: false,
  modalData: null,
  error: null,
  userOrders: []
};

export const sendOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/sendOrder', async (ingredientIds, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка оформления заказа');
  }
});

export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('order/fetchUserOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await getOrdersApi();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка получения заказов');
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal(state) {
      state.modalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.modalData = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки заказов';
      });
  }
});

export const { closeOrderModal } = orderSlice.actions;
export default orderSlice.reducer;
