import {createSlice, createAsyncThunk} from '@reduxjs/toolkit/';

export const fetchAsync = createAsyncThunk('fetchProducts', async () => {
  const response = await fetch('https://dummyjson.com/products');
  const result = await response.json();
  return result.products;
});

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
  },
  reducers: {
    popData: state => {
      state.data.pop();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        (state.isLoading = false), (state.isError = false);
      })
      .addCase(fetchAsync.pending, state => {
        (state.isLoading = true), (state.isError = false);
      })
      .addCase(fetchAsync.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {popData} = productsSlice.actions;
export default productsSlice.reducer;
