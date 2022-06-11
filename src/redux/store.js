import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './modules/boardSlice';
import userReducer from './modules/userSlice';
import commentReducer from './modules/commentSlice';

const store = configureStore({
  reducer: {
    board: boardReducer,
    user: userReducer,
    comment: commentReducer,
  },
});

export default store;
