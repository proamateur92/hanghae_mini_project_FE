import styled from "styled-components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModalSignup, ModalLogin } from "../components/Modal"; //modal
// 쿠키 헤더에 담아서 보내실 때 getCookie  임포트 해온 다음에
import { getCookie } from "../shared/cookie";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  //modal
  //modal창 useState로 열고 닫힘
  const [modalSignupOpen, setModalSignupOpen] = React.useState(false);
  const [modalLoginOpen, setModalLoginOpen] = React.useState(false);
  const user = useSelector((state) => state.user);

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
  //modal

  //로그인 체크 state로 상태 변경
  const [is_login, setIsLogin] = React.useState(false);

  const deleteCookie = () => {
    //로그아웃 시 토큰 삭제
    document.cookie = "is_login" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
    document.cookie = "nickname" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
    //로그아웃 시 is_login false로 변경
    setIsLogin(false);
    //로그아웃 시 페이지 새로고침
    window.location.reload();
  };

  // 컴포넌트 렌더링 시 로그인 여부 체크
  useEffect(() => {
    if (user.isLogin) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>로고</Logo>
      <List>
        {!is_login && <Item onClick={openSignupModal}>SignUp</Item>}
        {!is_login && <Item onClick={openLoginModal}>Login</Item>}

        <ModalLogin open={modalLoginOpen} close={closeLoginModal}></ModalLogin>
        {/* <FontAwesomeIcon icon={faBars} size="2x" /> */}
        {is_login && <div>{getCookie("nickname")}님 안녕하세요!</div>}
        {is_login && <Item onClick={deleteCookie}>Logout</Item>}

        <ModalSignup
          open={modalSignupOpen}
          close={closeSignupModal}
        ></ModalSignup>
      </List>
    </Container>
  );
};

const Logo = styled.div`
  color: #fff;
  font-size: 36px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #ccc;
  }
`;

const List = styled.div``;
const Item = styled.div``;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.color.primary};
  @media (max-width: 499px) {
    padding: 30px;
  }
  @media (min-width: 500px) {
    padding: 25px;
  }
  ${List} {
    display: flex;
    align-items: center;
  }
  ${Item} {
    margin-left: 20px;
    font-size: 24px;
    color: white;
    cursor: pointer;
    &:hover {
      color: #cccccc;
    }
  }
`;

export default Header;
