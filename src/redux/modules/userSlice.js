import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//미들웨어
//Create
export const createUserDB = (user_data) => {
  return async function (dispatch) {
    console.log(user_data);
    await axios
      .post("http://13.124.25.127/users/signup", user_data)
      .then((response) => {
        window.alert(response.data.result);
      })
      .catch(function (error) {
        console.log("에러", error.response.data);
      });
    await dispatch(createUser(user_data));
  };
};

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
    createUser(state, action) {
      state.list.push(action.payload);
    },
    // updateUser(state, action) {},
    // removeUser(state, action) {},
  },
});

export const boardActions = userSlice.actions;
export const { loadUser, createUser } = userSlice.actions;
export default userSlice.reducer;
