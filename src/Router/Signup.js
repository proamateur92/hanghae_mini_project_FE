import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal"; //modal

const Signup = () => {
  const navigate = useNavigate;
  const email_ref = React.useRef(null);
  const password_ref = React.useRef(null);
  const confirmPassword_ref = React.useRef(null);
  const nickName_ref = React.useRef(null);

  //modal
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  //modal

  const emailCheck = (email) => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    return _reg.test(email);
  };
  const passwordCheck = (password) => {
    let _reg =
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&])[0-9a-zA-Z@$!%*#?&]{3,10}$/;
    //비밀번호는 3 ~ 10자 영문, 숫자 및 특수문자조합으로
    return _reg.test(password);
  };

  const signup = async () => {
    //벨리데이션 필수!
    if (
      email_ref.current.value === "" ||
      password_ref.current.value === "" ||
      nickName_ref.current.value === ""
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
    if (password_ref.current.value !== confirmPassword_ref.current.value) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      navigate("/");
    }
  };

  // const callSomethingAxios = () => {
  //   //post
  //   let userdata = {
  //     email: email_ref.currnet.value,
  //     nickname: nickName_ref.current.value,
  //     password: password_ref.current.value,
  //     confirmPassword: confirmPassword_ref.current.value,
  //   };
  //   axios
  //     .post("api", userdata)
  //     //api,{데이터}, {config}
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };
  // //axios가 알아서 json화해서 요청을 보내기 때문

  // React.useEffect(() => {
  //   callSomethingAxios();
  // });

  return (
    <Container>
      <SignupWrap>
        <SignupHeader>
          <SignupTitle>SIGN UP</SignupTitle>
          <Link to="/">
            <HomeIcon>
              <FontAwesomeIcon style={{ color: "#e07575" }} icon={faHouse} />
            </HomeIcon>
          </Link>
        </SignupHeader>

        <Input>
          <label htmlFor="email">ID</label>
          <br />
          <input id="email" type="email" ref={email_ref} required></input>
          <p>이메일로 아이디를 작성해주세요!</p>
        </Input>
        <Input>
          <label htmlFor="nickName">NickName</label>
          <br />
          <input id="nickName" type="name" ref={nickName_ref} required></input>
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
        <Btn onClick={signup}>회원가입</Btn>
        <Btn onClick={openModal}>modal test</Btn>
        <Modal
          open={modalOpen}
          close={closeModal}
          header="Modal heading"
        ></Modal>
      </SignupWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignupTitle = styled.h1`
  color: #e07575;
`;

const SignupHeader = styled.div`
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

const SignupWrap = styled.div`
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

export default Signup;
