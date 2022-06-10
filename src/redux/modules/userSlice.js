import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
  },

  reducers: {
    // 예시로 하나 남겨두겠습니다.
    // changeName: (state, action) => {
    //   state.name = action.payload;
    // },
    loadUser: (state, action) => {},
    createUser(state, action) {},
    updateUser(state, action) {},
    removeUser(state, action) {},
  },
});

export const boardActions = userSlice.actions;
export const { loadUser, createUser, updateUser, removeUser } =
  userSlice.actions;
export default userSlice.reducer;
