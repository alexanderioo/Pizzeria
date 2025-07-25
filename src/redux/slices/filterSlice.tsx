import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export enum SortPropertyEnum {
  RATING_DESC = "rating",
  TITLE_DESC = "title",
  PRICE_DESC = "price",
}
const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.PRICE_DESC,
  },
  searchValue: "",
  currentPage: 0,
};
type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};
interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: any) {
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});
export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter.categoryId;
export const {
  setCategoryId,
  setSortType,
  setSearchValue,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
