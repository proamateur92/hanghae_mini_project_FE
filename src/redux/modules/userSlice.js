import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, setCookie } from "../../shared/cookie";

//미들웨어
//login
export const loginUserDB = (users) => {
  return async function (dispatch) {
    await axios
      .post("http://13.209.64.124/users/login", users.users)
      .then((response) => {
        console.log(response, "이거확인");
        const accessToken = response.data.token;
        setCookie("is_login", `${accessToken}`);
        const nickname = response.data.nickname;
        setCookie("nickname", `${nickname}`);
        window.alert(`${nickname}님 환영합니다`);
        if (accessToken) {
          dispatch(loginUser(true));
        }
      })
      .catch(function (error) {
        window.alert(error.response.data.errorMessage);
      });
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
  },

  reducers: {
    loginUser: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
