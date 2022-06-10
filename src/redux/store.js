import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./modules/boardSlice";
import userReducer from "./modules/userSlice";

const store = configureStore({
  reducer: {
    board: boardReducer,
    user: userReducer,
  },
});

export default store;
