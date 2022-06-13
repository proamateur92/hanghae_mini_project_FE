import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//미들웨어

//Create
export const createBoardDB = contents_obj => {
  return async function (dispatch) {
    await axios
      .post('http://localhost:5000/boards', contents_obj)
      .then(response => {})
      .catch(function (error) {
        console.log('에러', error.response.data);
      })
      .then(function () {
        // 항상 실행되는 영역
      });
    dispatch(createBoard(contents_obj));
  };
};

//Update
export const updateBoardDB = (contents_obj, id) => {
  return async function (dispatch) {
    // await axios
    //     .patch("http://localhost:5000/boards", contents_obj, id)
    //     .then((response) => {
    //       console.log("aa",response)
    //     })
    //     .catch(function(error) {
    //       // console.log("에러",error.response.data);
    //       console.log("에러",error);
    //     });
    dispatch(updateBoard(contents_obj, id));
  };
};

//Delete
export const removeBoardDB = targetId => {
  return async function (dispatch) {
    await axios
      .delete('http://localhost:5000/boards', targetId)
      .then(response => {
        console.log('delete: ', response);
      })
      .catch(function (error) {
        // console.log("에러",error.response.data);
        console.log('에러', error);
      });
    dispatch(reamoveBoard(targetId));
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
    reamoveBoard(state, action) {
      return state.list.filter(board => board.articleId !== action.targetId);
    },
  },
});

// export const boardActions = boardSlice.actions;
export const { loadBoard, createBoard, updateBoard, reamoveBoard } = boardSlice.actions;
export default boardSlice.reducer;
