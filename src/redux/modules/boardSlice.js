import { createSlice } from '@reduxjs/toolkit';
import instance from '../../shared/axios';

//미들웨어

// 게시글 불러오기
export const loadBoardDB = (page) => {
  return async function (dispatch, getState) {
    console.log(page)
    // 테스트 url
    try {
      const response = await instance.get(`/content/`);
      // const response = await instance.get(`/content/`, { params: { page:2 } });
      
      // const response = await axios.get('http://13.209.64.124/content');
      const data = getState().board.list
      const newstate = [...data, ...response.data];
      dispatch(loadBoard(newstate));
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
    console.log('업데이트', contents_obj);
    await instance
      .patch(`/content/${id}`, contents_obj)
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
    try {
      // await axios.delete(`localhost:5000/content/${targetId}`);
      await instance.delete(`/content/${targetId}`);
      dispatch(removeBoard(targetId));
    } catch (error) {
      console.log(error);
    }
  };
};

// 게시글 검색
export const searchBoardDB = search_data => {
  return async function (dispatch) {
    try {
      await instance.get('/content/search', { params: { value: search_data.value } }).then(response => {
        // file_link_ref.current = [...file_link_ref.current, file_url];
        // search = [...response.data.SearchContent];
        dispatch(searchBoard([...response.data.SearchContent]));
      });
    } catch (error) {
      console.log(error.request);
      alert('해당 게시물이 없습니다.');
    }
  };
};

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    list: [],
    searchList: [],
  },

  reducers: {
    // 예시로 하나 남겨두겠습니다.
    // changeName: (state, action) => {
    //   state.name = action.payload;
    // },
    loadBoard: (state, action) => {
      // console.log(action.payload);
      state.list = [...action.payload];
      // state.list.sort((a, b) => new Date(b.CreateAt) - new Date(a.CreateAt));
    },
    createBoard(state, action) {
      console.log('리듀서', action.payload);
      // state.list.unshift(action.payload);
      state.list.push(action.payload);
      state.list.sort((a, b) => new Date(b.CreateAt) - new Date(a.CreateAt));
    },
    updateBoard(state, action) {
      const newState = state.list.filter((l, idx) => {
        // return l.id !== parseInt(action.payload.id);
        return l.id !== action.payload.id;
      });
      const newwState = [...newState, action.payload];
      state.list = newwState;
      state.list.sort((a, b) => new Date(b.CreateAt) - new Date(a.CreateAt));
    },
    removeBoard(state, action) {
      const existingBoard = state.list.find(board => board._id === action.payload);
      console.log(state.list);
      if (existingBoard) {
        state.list = state.list.filter(board => board._id !== action.payload);
      }
    },
    searchBoard(state, action) {
      state.searchList = action.payload;
    },
  },
});

// export const boardActions = boardSlice.actions;
export const { loadBoard, createBoard, updateBoard, removeBoard, searchBoard } = boardSlice.actions;
export default boardSlice.reducer;
