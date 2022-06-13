import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from '../../shared/axios';

//미들웨어

// 게시글 불러오기
export const loadBoardDB = () => {
  return async function (dispatch) {
    // 테스트 url
    try {
      const response = await instance.get('/content');
      // const response = await axios.get('http://13.124.25.127/content');
      dispatch(loadBoard(response.data));
    } catch (error) {
      // 게시글 불러오지 못할 때
      // 멘토링 때 물어보기
    }
    // console.log(response);
  };
};

// 게시글 생성
export const createBoardDB = contents_obj => {
  return async function (dispatch) {
    await instance
      .post('/content', contents_obj)
      .then(response => {})
      .catch(function (error) {
        console.log('에러', error.response.data);
      });
    await dispatch(createBoard(contents_obj));
  };
};

// 게시글 수정
//Update
export const updateBoardDB = (contents_obj, id) => {
  return async function (dispatch) {
    await instance.patch(`/content/${id}`, contents_obj)
    .then((response) => {
    })
    .catch(function(error) {
          console.log("에러",error.response.data);
    })
    dispatch(updateBoard(contents_obj, id));
  };
};

// 게시글 삭제
export const removeBoardDB = targetId => {
  return async function (dispatch) {
    try {
      await axios.delete(`localhost:5000/content/${targetId}`);
      // await axios.delete(`http://13.124.25.127/content/${targetId}`);
      dispatch(removeBoard(targetId));
    } catch (error) {
      console.log(error);
    }
  };
};

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    list: [],
  },

  reducers: {
    // 예시로 하나 남겨두겠습니다.
    // changeName: (state, action) => {
    //   state.name = action.payload;
    // },
    loadBoard: (state, action) => {
      // console.log(action.payload);
      state.list.push(...action.payload);
    },
    createBoard(state, action) {
      console.log('리듀서', action.payload);
      // state.list.unshift(action.payload); 
      state.list.push(action.payload)
        // state.list.sort((a, b) => {
        // return a.createdAt - b.createdAt;});
    },
    updateBoard(state, action) {
      const newState = state.list.filter((l, idx) => {
        // return l.id !== parseInt(action.payload.id);
        return l.id !== action.payload.id;
      });
      const newwState = [...newState, action.payload];
      state.list = newwState
        // .sort(function (a, b) {
        // return a.createdAt - b.createdAt;});
    },
    removeBoard(state, action) {
      const existingBoard = state.list.find(board => board._id === action.payload);
      console.log(state.list);
      if (existingBoard) {
        state.list = state.list.filter(board => board._id !== action.payload);
      }
    },
  },
});

// export const boardActions = boardSlice.actions;
export const { loadBoard, createBoard, updateBoard, removeBoard } = boardSlice.actions;
export default boardSlice.reducer;
