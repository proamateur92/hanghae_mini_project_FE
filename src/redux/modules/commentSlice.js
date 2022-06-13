import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 댓글 가져오기
export const loadCommentDB = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://13.209.64.124/comment/`);
      dispatch(loadComment(response.data.comment));
    } catch (error) {
      // 멘토링 때 물어보기
    }
  };
};

// 댓글 추가
export const createCommentDB = targetId => {
  return async function (dispatch) {
    // 테스트 url
    try {
      // const response = await axios.get(`localhost:5000/comments/${targetId}`);
      const response = await axios.get(`http://13.209.64.124/comment/${targetId}`);
      dispatch(createComment(response.data));
    } catch (error) {
      // 멘토링 때 물어보기
    }
  };
};

// 댓글 수정
export const updateCommentDB = targetId => {
  return async function (dispatch) {
    // 테스트 url
    try {
      const response = await axios.get(`localhost:5000/comments/${targetId}`);
      // const response = await axios.get(`http://13.209.64.124/comment/${targetId}`);
      console.log(response);
      // dispatch(updateComment(response.data));
    } catch (error) {
      // 멘토링 때 물어보기
    }
  };
};

// 댓글 삭제
export const removeCommentDB = targetId => {
  return async function (dispatch) {
    // 테스트 url
    try {
      const response = await axios.get(`localhost:5000/comments/${targetId}`);
      // const response = await axios.get(`http://13.209.64.124/comment/${targetId}`);
      console.log(response);
      // dispatch(removeComment(response.data));
    } catch (error) {
      // 멘토링 때 물어보기
    }
  };
};

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    list: [],
  },

  reducers: {
    loadComment: (state, action) => {
      console.log(action.payload);
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
