import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ModalSignup, ModalLogin } from "../components/Modal"; //modal
import { getCookie } from "../shared/cookie";
// 쿠키 헤더에 담아서 보내실 때 getCookie  임포트 해온 다음에
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Cookies } from "react-cookie";

const Header = () => {
  const navigate = useNavigate();
  //modal
  const [modalSignupOpen, setModalSignupOpen] = React.useState(false);
  const [modalLoginOpen, setModalLoginOpen] = React.useState(false);

  const openSignupModal = () => {
    setModalSignupOpen(true);
  };
  const closeSignupModal = () => {
    setModalSignupOpen(false);
    window.location.reload();
  };

  const openLoginModal = () => {
    setModalLoginOpen(true);
  };
  const closeLoginModal = () => {
    setModalLoginOpen(false);
  };
  //modal

  const deleteCookie = () => {
    //로그아웃 토큰 삭제
    document.cookie = "is_login" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
  };

  const [is_login, setIsLogin] = React.useState(false);
  const loginCheck = () => {
    if (getCookie("is_login") === undefined) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };
  React.useEffect(() => {
    loginCheck();
    // console.log(getCookie("is_login"), "쿠키다!");
  }, []);

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>로고</Logo>
      <List>
        {!is_login && <Item onClick={openSignupModal}>SignUp</Item>}
        {!is_login && <Item onClick={openLoginModal}>Login</Item>}

        <ModalLogin open={modalLoginOpen} close={closeLoginModal}></ModalLogin>
        {/* <FontAwesomeIcon icon={faBars} size='2x' /> */}
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
