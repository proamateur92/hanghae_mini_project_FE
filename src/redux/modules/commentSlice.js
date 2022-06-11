import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    list: [],
  },

  reducers: {
    loadComment: (state, action) => {
      state.list.push(...action.payload);
    },
    createComment(state, action) {},
    updateComment(state, action) {},
    removeComment(state, action) {},
  },
});

export const commentActions = commentSlice.actions;
export const { loadComment, createComment, updateComment, removeComment } = commentSlice.actions;
export default commentSlice.reducer;
