import styled from "styled-components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModalSignup, ModalLogin } from "../components/Modal"; //modal
// 쿠키 헤더에 담아서 보내실 때 getCookie  임포트 해온 다음에
import { getCookie } from "../shared/cookie";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  //로그인 상태 reducer에서 가져옴
  const user = useSelector((state) => state.user);
  const users = getCookie("nickname")

  // 컴포넌트 렌더링 시 로그인 여부 체크
  useEffect(() => {}, [user.isLogin]);

  const deleteCookie = () => {
    //로그아웃 시 토큰 삭제
    document.cookie = "is_login" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
    document.cookie = "nickname" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
    window.location.reload();
  };

  //modal
  //modal창 useState로 열고 닫힘
  const [modalSignupOpen, setModalSignupOpen] = React.useState(false);
  const [modalLoginOpen, setModalLoginOpen] = React.useState(false);

  // 실행 시 modal창 state 변경
  const openSignupModal = () => {
    setModalSignupOpen(true);
  };
  const closeSignupModal = () => {
    setModalSignupOpen(false);
  };

  const openLoginModal = () => {
    setModalLoginOpen(true);
  };
  const closeLoginModal = () => {
    setModalLoginOpen(false);
  };

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img src="logo3.png" alt="로고" />
      </Logo>
      <List>
        {!users && <Item onClick={openSignupModal}>회원가입</Item>}
        {!users && <Item onClick={openLoginModal}>로그인</Item>}

        <ModalLogin open={modalLoginOpen} close={closeLoginModal}></ModalLogin>
        {/* <FontAwesomeIcon icon={faBars} size="2x" /> */}
        {users && <Title>{getCookie("nickname")}님 안녕하세요!</Title>}
        {users && <Item onClick={deleteCookie}>로그아웃</Item>}

        <ModalSignup
          open={modalSignupOpen}
          close={closeSignupModal}
        ></ModalSignup>
      </List>
    </Container>
  );
};

//로고
const Logo = styled.div`
  width: 50px;
  padding: 10px;
  margin-left: 1vw;
  cursor: pointer;
  /* transform:rotate(0.9turn); */
  img {
    width: 100%;
    height: 100%;
  }
`;

const List = styled.div`
  margin-right: 1vw;
`;
const Item = styled.div``;
const Title = styled.div`
  color: white;
  font-size: 20px;
  font-weight: bolder;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  /* background-color:#D5ECC2; */
  background-color: #98ddca;
  position: fixed;
  width: 100%;
  z-index: 100;
  @media (max-width: 499px) {
    /* padding: 30px; */
  }
  @media (min-width: 500px) {
    /* padding: 25px; */
  }
  ${List} {
    display: flex;
    align-items: center;
  }
  ${Item} {
    margin-left: 10px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    &:hover {
      color: #cccccc;
    }
  }
`;

export default Header;
