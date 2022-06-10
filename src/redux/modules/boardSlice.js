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
    loadBoard: (state, action) => {},
    createBoard(state, action) {},
    updateBoard(state, action) {},
    reamoveBoard(state, action) {},
  },
});

// export const boardActions = boardSlice.actions;
export const { loadBoard, createBoard, updateBoard, reamoveBoard } =
  boardSlice.actions;
export default boardSlice.reducer;
