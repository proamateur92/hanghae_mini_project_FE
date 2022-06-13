import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './modules/boardSlice';
import userReducer from './modules/userSlice';
import commentReducer from './modules/commentSlice';
import likeReducer from './modules/likeSlice';

const store = configureStore({
  reducer: {
    board: boardReducer,
    user: userReducer,
    comment: commentReducer,
    like: likeReducer,
  },
});

export default store;
