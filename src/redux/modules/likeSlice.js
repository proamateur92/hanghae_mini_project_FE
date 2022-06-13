import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 좋아요 가져오기
export const loadLikeDB = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://13.209.64.124/like/');
      dispatch(loadLike(response.data));
    } catch (error) {}
  };
};

const likeSlice = createSlice({
  name: 'like',
  initialState: {
    list: [],
  },

  reducers: {
    // 예시로 하나 남겨두겠습니다.
    // changeName: (state, action) => {
    //   state.name = action.payload;
    // },
    loadLike: (state, action) => {
      console.log(action.payload);
      state.list.push(...action.payload);
    },
    // updateUser(state, action) {},
    // removeUser(state, action) {},
  },
});

export const likeActions = likeSlice.actions;
export const { loadLike, updateLike } = likeSlice.actions;
export default likeSlice.reducer;
