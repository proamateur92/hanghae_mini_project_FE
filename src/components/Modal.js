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

  //벨리데이션 마지막에 열기
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

  const signupCheck = async () => {
    //벨리데이션 필수!
    if (
      email_ref.current.value === "" ||
      password_ref.current.value === "" ||
      nickname_ref.current.value === ""
    ) {
      window.alert("빈칸을 전부 채워주세요!");
      return;
    }
    // 벨리데이션 (마지막에 열기)
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
    } else {
    }
  };

  // 모달 열기, 닫기를 부모로부터 받아옴
  const { open, close } = props;

  //회원가입 데이터 서버에 보내기!
  const SignupAxios = async () => {
    // 서버에 보내줄 데이터들
    //post
    let users = {
      email: email_ref.current.value,
      nickname: nickname_ref.current.value,
      password: password_ref.current.value,
      confirmPassword: confirmPassword_ref.current.value,
    };
    await axios
      .post("http://13.124.25.127/users/signup", users)
      //api,{데이터}, {config}
      .then((response) => {
        window.alert("회원가입 성공");
      })
      .catch(function (error) {
        // console.log(error.response.data.errorMessage);
        window.alert(error.response.data.errorMessage);
      });
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <button className="close" onClick={close}>
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
                <br />
                <p>이메일로 아이디를 작성해주세요!</p>
              </Input>

              <Input>
                <label htmlFor="nickName">NickName</label>
                <br />
                <input
                  id="nickName"
                  type="name"
                  ref={nickname_ref}
                  required
                ></input>
                <p>3 ~ 8자 한글,영문,숫자로 작성</p>
              </Input>
              <Input>
                <label htmlFor="password">PW</label>

                <input
                  id="password"
                  type="password"
                  ref={password_ref}
                  required
                ></input>
                <p>3 ~ 10자 영문, 숫자 및 특수문자조합</p>
              </Input>
              <Input>
                <label htmlFor="confirmPassword">PW CHECK</label>
                <br />
                <input
                  id="confirmPassword"
                  type="password"
                  ref={confirmPassword_ref}
                  required
                ></input>
              </Input>
              <Btn
                onClick={() => {
                  signupCheck();
                  SignupAxios();
                  close();
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
  const email_ref = React.useRef(null);
  const password_ref = React.useRef(null);
  const dispatch = useDispatch();

  //벨리데이션 마지막에 살리기
  const emailCheck = (email) => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    return _reg.test(email);
  };

  const loginCheck = async () => {
    //벨리데이션 필수!
    if (email_ref.current.value === "" || password_ref.current.value === "") {
      window.alert("아이디와 비밀번호를 입력하세요!");
      return;
    }
    //벨리데이션 마지막에 살리기
    if (!emailCheck(email_ref.current.value)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    } else {
    }
    let users = {
      email: email_ref.current.value,
      password: password_ref.current.value,
    };
    await dispatch(loginUserDB({ users }));
  };
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <button className="close" onClick={close}>
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
                <br />
                <p>이메일로 아이디를 작성해주세요!</p>
              </Input>

              <Input>
                <label htmlFor="password">PW</label>
                <input
                  id="password"
                  type="password"
                  ref={password_ref}
                  required
                ></input>
                <p>3 ~ 10자 영문, 숫자 및 특수문자조합</p>
              </Input>
              <Btn
                onClick={() => {
                  loginCheck();
                  close();
                  // LoginAxios();
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
  color: #e07575;
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
    font-size: 13px;
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

export { ModalSignup, ModalLogin };
