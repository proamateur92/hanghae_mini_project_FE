import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "../../shared/cookie";

//미들웨어
//login
export const loginUserDB = (users) => {
  return async function (dispatch) {
    // console.log(users.users);
    await axios
      .post("http://13.209.64.124/users/login", users.users)
      .then((response) => {
        window.alert(response.data.message);
        const accessToken = response.data.token;
        setCookie("is_login", `${accessToken}`);
        const nickname = response.data.nickname;
        setCookie("nickname", `${nickname}`);
      })
      .catch(function (error) {
        window.alert(error.response.data.errorMessage);
      });
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    //is_login 넣어서 함수,
    list: [],
    //is_login
  },

  reducers: {
    // 예시로 하나 남겨두겠습니다.
    // changeName: (state, action) => {
    //   state.name = action.payload;
    // },
    loginUser: (state, action) => {
      state.list.push(action.payload);
    },
    // updateUser(state, action) {},
    // removeUser(state, action) {},
    saveUser(state, action) {
      state.list.push(action.payload);
    },
  },
});

export const userActions = userSlice.actions;
export const { loginUser, saveUser } = userSlice.actions;
export default userSlice.reducer;
