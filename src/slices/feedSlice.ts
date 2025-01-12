import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../utils/burger-api';
import { TOrder } from '@utils-types';

interface FeedsState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedsState = {
  orders: [],
  loading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('feeds/fetchFeeds', async (_, { rejectWithValue }) => {
  try {
    const response = await getFeedsApi();
    return response.orders;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка загрузки заказов');
  }
});

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

export default feedsSlice.reducer;
