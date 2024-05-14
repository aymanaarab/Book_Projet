import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allbooks: [],
  selectedBook: {},
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setAllBooks: (state, action) => {
      state.allbooks = action.payload;
    },
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
});

export const { setAllBooks, setSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;
