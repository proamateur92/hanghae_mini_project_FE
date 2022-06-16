import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import React, { useEffect } from "react";
import { getCookie } from "./shared/cookie";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/modules/userSlice";
import "./assets/css/main.css"

function App() {
  const dispatch = useDispatch();

  //useEffect로 쿠키에 토큰 있을시 로그인 체크
  useEffect(() => {
    if (getCookie("is_login") !== undefined) {
      dispatch(loginUser(true));
    }
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

const GlobalStyle = createGlobalStyle`
  html {
        font-size: 16px;
    }

  body {
    margin: 0;
    padding: 0;
  }
`;

const theme = {
  color: {
    primary: "#FFB2B2",
  },
  size: {
    sm: "20px",
    md: "50px",
    lg: "100px",
  },
};

export default App;
