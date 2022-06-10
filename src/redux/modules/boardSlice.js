import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

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
    createBoard(state, action) {
      console.log(action.payload);
      state.list.push(action.payload);
    },
    updateBoard(state, action) {},
    reamoveBoard(state, action) {},
  },
});

// export const boardActions = boardSlice.actions;
export const { loadBoard, createBoard, updateBoard, reamoveBoard } =
  boardSlice.actions;
export default boardSlice.reducer;
