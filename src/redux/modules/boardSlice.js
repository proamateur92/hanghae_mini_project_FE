import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from '../../shared/axios';

//미들웨어
//Create
// export const createBoardDB = (contents_obj) => {
//   return async function (dispatch) {
//     console.log(contents_obj)
//     await axios.post("http://13.124.25.127/content", contents_obj, {
//       headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjYyYTM3MzY5ZTM0MzhhMmMzYzAwMmNhNyIsImlhdCI6MTY1NTA4NDk2NX0.EfcmqfIbJPw3-Xob4-EDL15DxQIxdcJZO7QH9vwJgkM" },
//     })
//     .then((response) => {
//       })
//     .catch(function(error) {
//         console.log("에러",error.response.data);
// })
//     await dispatch(createBoard(contents_obj));
//   };
// };

// 게시글 불러오기
export const loadBoardDB = () => {
  return async function (dispatch) {
    // 테스트 url
    // const response = await axios.get('http://localhost:5000/boards');
    try {
      const response = await axios.get('http://13.124.25.127/content');
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
    await instance.get('http://13.124.25.127/content', contents_obj);
    await dispatch(createBoard(contents_obj));
  };
};

// 게시글 수정
export const updateBoardDB = (contents_obj, id) => {
  return async function (dispatch) {
    await axios
      .patch('http://13.124.25.127/content', contents_obj, id, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjYyYTM3MzY5ZTM0MzhhMmMzYzAwMmNhNyIsImlhdCI6MTY1NTA4NDk2NX0.EfcmqfIbJPw3-Xob4-EDL15DxQIxdcJZO7QH9vwJgkM',
        },
      })
      .then(response => {})
      .catch(function (error) {
        console.log('에러', error.response.data);
      });
    dispatch(updateBoard(contents_obj, id));
  };
};

// 게시글 삭제
export const removeBoardDB = targetId => {
  return async function (dispatch) {
    console.log(`targetId: ${targetId}`);
    try {
      const response = await axios.delete(`http://13.124.25.127/boards/${targetId}`);
      dispatch(removeBoard(targetId));
      console.log(response);
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
      state.list.push(action.payload);
    },
    updateBoard(state, action) {
      const newState = state.list.filter((l, idx) => {
        return l.id !== parseInt(action.payload.id);
      });
      const newwState = [...newState, action.payload];
      state.list = newwState.sort(function (a, b) {
        return a.id - b.id;
      });
    },
    removeBoard(state, action) {
      return state.list.filter(board => board.articleId !== action.targetId);
    },
  },
});

// export const boardActions = boardSlice.actions;
export const { loadBoard, createBoard, updateBoard, removeBoard } = boardSlice.actions;
export default boardSlice.reducer;
