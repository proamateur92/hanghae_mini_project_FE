import React from "react";
import styled from "styled-components";
import "../assets/css/modal.css";

import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUserDB } from "../redux/modules/userSlice";

//Signup Modal
const ModalSignup = (props) => {
  const email_ref = React.useRef(null);
  const password_ref = React.useRef(null);
  const confirmPassword_ref = React.useRef(null);
  const nickname_ref = React.useRef(null);

  //벨리데이션
  const emailCheck = (email) => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    //이메일 형식으로!
    return _reg.test(email);
  };
  const passwordCheck = (password) => {
    let _reg =
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&])[0-9a-zA-Z@$!%*#?&]{3,10}$/;
    //비밀번호는 3 ~ 10자 영문, 숫자 및 특수문자조합으로
    return _reg.test(password);
  };
  const nicknameCheck = (nickname) => {
    let _reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{3,8}$/;
    //닉네임은 3~8자 한글,영어,숫자
    return _reg.test(nickname);
  };

  // 모달 열기, 닫기를 부모로부터 받아옴
  const { open, close } = props;

  //회원가입 데이터 서버에 보내기!
  const SignupAxios = async () => {
    // 서버에 보내줄 데이터들
    let users = {
      email: email_ref.current.value,
      nickname: nickname_ref.current.value,
      password: password_ref.current.value,
      confirmPassword: confirmPassword_ref.current.value,
    };

    await axios
      //서버에 users 인풋 값 보내주기
      .post("http://13.209.64.124/users/signup", users)
      //성공시 리스폰스 받아옴
      .then((response) => {
        window.alert("회원가입 성공");
        close();
      })
      //실패시 에러메시지 받아옴, 작성한 벨리데이션 문구도 같이
      .catch(function (error) {
        if (
          email_ref.current.value === "" ||
          password_ref.current.value === "" ||
          nickname_ref.current.value === ""
        ) {
          window.alert("빈칸을 전부 채워주세요!");
          return;
        }
        if (!emailCheck(email_ref.current.value)) {
          window.alert("이메일 형식이 맞지 않습니다!");
          return;
        }
        if (!passwordCheck(password_ref.current.value)) {
          window.alert(
            "비밀번호는 3 ~ 10자 영문, 숫자 및 특수문자조합으로 작성하세요!"
          );
          return;
        }
        if (!nicknameCheck(nickname_ref.current.value)) {
          window.alert("닉네임은 3 ~ 8자 한글,영문,숫자!");
          return;
        }
        if (password_ref.current.value !== confirmPassword_ref.current.value) {
          window.alert("비밀번호가 일치하지 않습니다.");
          return;
        }
        //회원가입 실패 시 에러메시지 alert
        window.alert(error.response.data.errorMessage);
      });
  };

  return (
    // 모달창이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <button
              style={{ fontSize: "40px" }}
              className="close"
              onClick={close}
            >
              &times;
            </button>
          </header>
          <main>
            {" "}
            <SignupWrap>
              <SignupHeader>
                <SignupTitle>SIGN UP</SignupTitle>
              </SignupHeader>
              <Input>
                <label htmlFor="email">ID</label>
                <input id="email" type="email" ref={email_ref} required></input>
                <MiniTitle>이메일로 아이디를 작성해주세요!</MiniTitle>
              </Input>
              <Input>
                <label htmlFor="nickName">NickName</label>
                <input
                  id="nickName"
                  type="name"
                  ref={nickname_ref}
                  required
                ></input>
                <MiniTitle>3 ~ 8자 한글,영문,숫자로 작성</MiniTitle>
              </Input>
              <Input>
                <label htmlFor="password">PW</label>
                <input
                  id="password"
                  type="password"
                  ref={password_ref}
                  required
                ></input>
                <MiniTitle>3 ~ 10자 영문, 숫자 및 특수문자조합</MiniTitle>
              </Input>
              <Input>
                <label htmlFor="confirmPassword">PW CHECK</label>
                <input
                  id="confirmPassword"
                  type="password"
                  ref={confirmPassword_ref}
                  required
                ></input>
              </Input>
              <Btn
                onClick={() => {
                  SignupAxios();
                }}
              >
                회원가입
              </Btn>
            </SignupWrap>
          </main>
        </section>
      ) : null}
    </div>
  );
};

//Login Modal
const ModalLogin = (props) => {
  // 컴포넌트 렌더링 시 로그인 여부 체크
  const email_ref = React.useRef(null);
  const password_ref = React.useRef(null);
  const dispatch = useDispatch();

  const emailCheck = (email) => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    return _reg.test(email);
  };

  const loginCheck = () => {
    //벨리데이션
    if (email_ref.current.value === "" || password_ref.current.value === "") {
      window.alert("아이디와 비밀번호를 입력하세요!");
      return;
    }
    if (!emailCheck(email_ref.current.value)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    } else {
    }
    let users = {
      email: email_ref.current.value,
      password: password_ref.current.value,
    };
    //dispatch 할 때 users 데이터와 close 함수 전달 (함수전달 가능, 함수 전달 할 땐 괄호 없어야함.)
    dispatch(loginUserDB({ users, close }));
  };
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;

  return (
    // 모달창이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <button
              style={{ fontSize: "40px" }}
              className="close"
              onClick={close}
            >
              &times;
            </button>
          </header>
          <main>
            {" "}
            <SignupWrap>
              <SignupHeader>
                <SignupTitle>LOG IN</SignupTitle>
              </SignupHeader>
              <Input>
                <label htmlFor="email">ID</label>
                <input id="email" type="email" ref={email_ref} required></input>

                <MiniTitle>이메일로 아이디를 작성해주세요!</MiniTitle>
              </Input>

              <Input>
                <label htmlFor="password">PW</label>
                <input
                  id="password"
                  type="password"
                  ref={password_ref}
                  required
                ></input>
                <MiniTitle>3 ~ 10자 영문, 숫자 및 특수문자조합</MiniTitle>
              </Input>
              <Btn
                onClick={() => {
                  loginCheck();
                }}
              >
                로그인
              </Btn>
            </SignupWrap>
          </main>
        </section>
      ) : null}
    </div>
  );
};

const SignupTitle = styled.h1`
  color: #3ddaad;
  font-size: 25px;
`;

const SignupHeader = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
`;

const SignupWrap = styled.div`
  background-color: whitesmoke;
  height: 90%;
  width: 90%;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2px 0;
  color: #38d8ab;
  font-size: 1.2rem;
  width: 60%;
  label {
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    height: 30px;
    border: none;
    background-color: whitesmoke;
    border-bottom: 2px solid #d5ecc2;
    font-size: 18px;
  }
  & input:focus {
    outline: none;
    border-bottom: 2px solid #98ddca;
  }
`;
const MiniTitle = styled.p`
  margin-top: 10px;
  color: #999494;
  font-size: 16px;
`;

const Btn = styled.button`
  border: none;
  border-color: white;
  width: 30%;
  margin-top: 20px;
  height: 50px;
  font-size: 1.5rem;
  background-color: #d0eabb;
  color: white;
  &:hover {
    background-color: #98ddca;
  }
`;

export { ModalSignup, ModalLogin };
