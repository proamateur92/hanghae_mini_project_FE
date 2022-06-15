import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './modules/boardSlice';
import userReducer from './modules/userSlice';
import likeReducer from './modules/likeSlice';

const store = configureStore({
  reducer: {
    board: boardReducer,
    user: userReducer,
    like: likeReducer,
  },
});

export default store;
