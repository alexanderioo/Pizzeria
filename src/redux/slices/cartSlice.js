import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  items: [],
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    addProduct(state, action) {
      const findProduct = state.items.find(
        (obj) => obj.id === action.payload.id
      );

      if (findProduct) {
        findProduct.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * (obj.count || 1);
      }, 0);
    },
    minusProduct(state, action) {
      const findProduct = state.items.find(
        (obj) => obj.id === action.payload.id
      );
      if (findProduct) {
        findProduct.count--;
      }
    },

    removeProduct(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearProduct(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const {
  setCategoryId,
  addProduct,
  removeProduct,
  clearProduct,
  minusProduct,
} = cartSlice.actions;
export default cartSlice.reducer;

// state.items.push(action.payload);
//       state.totalPrice = state.items.reduce((sum, obj) => {
//         return sum + obj.price * (obj.count || 1);
//       }, 0);
