import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  data: null,
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    saveArticles: (state, action) => {
      state.status = true;
      state.data = action.payload;
    },
    removeArticles: (state) => {
      state.status = false;
      state.data = null;
    },
  },
});

export const { saveArticles, removeArticles } = articleSlice.actions;
export default articleSlice.reducer;
