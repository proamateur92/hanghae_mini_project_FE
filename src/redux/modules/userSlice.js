import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "../../shared/cookie";

//미들웨어
//login
export const loginUserDB = ({ users, close }) => {
  return async function (dispatch) {
    await axios
      //서버에 데이터 값 넣기
      .post("http://13.209.64.124/users/login", users)
      .then((response) => {
        const accessToken = response.data.token;
        //서버에서 받은 토큰 저장
        setCookie("is_login", `${accessToken}`);
        const nickname = response.data.nickname;
        setCookie("nickname", `${nickname}`);
        // 저장된 토큰으로 login 여부 확인
        if (accessToken) {
          dispatch(loginUser(true));
          //토근 들어왔을 때 모달close 함수 실행
          close();
        }
      })
      .catch(function (error) {
        // 로그인 실패 시 에러메시지
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
