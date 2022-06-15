import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const email_ref = React.useRef(null);
  const password_ref = React.useRef(null);

  const emailCheck = (email) => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    return _reg.test(email);
  };

  const login = async () => {
    //벨리데이션 필수!
    if (email_ref.current.value === "" || password_ref.current.value === "") {
      window.alert("아이디와 비밀번호를 입력하세요!");
      return;
    }
    if (!emailCheck(email_ref.current.value)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    } else {
      navigate("/");
    }
  };

  return (
    <Container>
      <LoginWrap>
        <LoginHeader>
          <LoginTitle>Log In</LoginTitle>
          <Link to="/">
            <HomeIcon>
              <FontAwesomeIcon style={{ color: "#e07575" }} icon={faHouse} />
            </HomeIcon>
          </Link>
        </LoginHeader>

        <Input>
          <label htmlFor="email">ID</label>
          <br />
          <input id="email" type="email" ref={email_ref} required></input>
        </Input>
        <Input>
          <label htmlFor="password">PW</label>
          <br />
          <input
            id="password"
            type="password"
            ref={password_ref}
            required
          ></input>
        </Input>
        <Btn onClick={login}>로그인</Btn>
      </LoginWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginTitle = styled.h1`
  color: #e07575;
`;

const LoginHeader = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
`;

const HomeIcon = styled.span`
  position: absolute;
  left: 60%;
  top: 15%;
`;

const LoginWrap = styled.div`
  margin-top: 5%;
  background-color: whitesmoke;
  height: 60%;
  width: 30%;
  border-radius: 10%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  color: #e07575;
  font-size: 1.2rem;
  width: 50%;
  p {
    color: #999494;
    font-size: 15px;
  }
  input {
    width: 100%;
    height: 20px;
    border: none;
    border-bottom: 2px solid #ffcaca;
  }
  & input:focus {
    outline: none;
    border-bottom: 2px solid #e07575;
  }
`;

const Btn = styled.button`
  border: none;
  border-color: white;
  width: 30%;
  margin-top: 20px;
  height: 50px;
  font-size: 1.5rem;
  background-color: #ffcaca;
  color: white;
  &:hover {
    background-color: #e07575;
  }
`;

export default Login;
