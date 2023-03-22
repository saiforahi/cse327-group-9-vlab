import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonClient, USER_GUARD} from "../../Config";

const initialState = {
  data: [],
  status: "idle",
  error: "",
};

let api = 'dealer/product/stock-orders/history'
if (sessionStorage.getItem(USER_GUARD) === "tycoon"){
  api = 'tycoon-panel/product/orders'
}
export const fetchOrderHistory = createAsyncThunk(
  "orders/history",
  async () => {
    const response = await JsonClient.get(api);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrderHistory.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchOrderHistory.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.data = action.payload;
    },
    [fetchOrderHistory.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function

export const { push_item } = orderSlice.actions;
export default orderSlice.reducer;
