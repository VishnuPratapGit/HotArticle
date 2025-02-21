import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import articlesReducer from "./articleSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articlesReducer,
  },
});

export default store;
