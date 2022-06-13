import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ModalSignup, ModalLogin } from "../components/Modal"; //modal
import { removeCookie, getCookie } from "../shared/cookie";
// 쿠키 헤더에 담아서 보내실 때 getCookie  임포트 해온 다음에
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  };

  const openLoginModal = () => {
    setModalLoginOpen(true);
  };
  const closeLoginModal = () => {
    setModalLoginOpen(false);
  };
  //modal

  const [is_login, setIsLogin] = React.useState(false);
  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  React.useEffect(() => {
    console.log(getCookie("is_login"));
    // getCookie("is_login") 이걸로 토큰값 받아와서. header에 담아서 요청하면 될 것 같아요!
  }, []);

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>로고</Logo>
      <List>
        <Item onClick={openLoginModal}>Login</Item>
        <ModalLogin open={modalLoginOpen} close={closeLoginModal}></ModalLogin>
        {/* <FontAwesomeIcon icon={faBars} size='2x' /> */}
        <Item onClick={removeCookie}>Logout</Item>
        <Item onClick={openSignupModal}>SignUp</Item>
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
