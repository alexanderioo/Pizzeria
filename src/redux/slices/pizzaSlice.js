import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  items: [],
  status: "loading", // loading | success | error
};
export const fetchItems = createAsyncThunk(
  "pizza/fetchPizzaStatus",
  async (thunkApi) => {
    const { data } = await axios.get("http://localhost:8080/items.json");
    return data;
  }
);
const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchItems.pending, (state, action) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "error";
        state.items = [];
      });
  },
});
export const selectPizzaData = (state) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
