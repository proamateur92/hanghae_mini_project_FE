import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
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
      console.log("리듀서", action.payload);
      // state.list.push(action.payload);
    },
    updateBoard(state, action) {},
    reamoveBoard(state, action) {},
  },
});

// export const boardActions = boardSlice.actions;
export const { loadBoard, createBoard, updateBoard, reamoveBoard } =
  boardSlice.actions;
export default boardSlice.reducer;
