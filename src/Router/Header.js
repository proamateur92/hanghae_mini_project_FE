import styled from "styled-components";
import React from "react";
import { ModalSignup, ModalLogin } from "../components/Modal"; //modal

const Header = () => {
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
  return (
    <Container>
      <Logo>로고</Logo>
      <List>
        <Item onClick={openLoginModal}>Login</Item>
        <ModalLogin
          open={modalLoginOpen}
          close={closeLoginModal}
          header="Modal heading"
        ></ModalLogin>
        <Item>Logout</Item>
        <Item onClick={openSignupModal}>Sign up</Item>
        <ModalSignup
          open={modalSignupOpen}
          close={closeSignupModal}
          header="Modal heading"
        ></ModalSignup>
        {/* <Btn onClick={openSignupModal}>modal test</Btn>
        <ModalSignup
          open={modalSignupOpen}
          close={closeSignupModal}
          header="Modal heading"
        ></ModalSignup>
        <Btn onClick={openLoginModal}>modal test</Btn>
        <ModalLogin
          open={modalLoginOpen}
          close={closeLoginModal}
          header="Modal heading"
        ></ModalLogin> */}
      </List>
    </Container>
  );
};

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const List = styled.div``;
const Item = styled.div``;
const Container = styled.div`
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.color.primary};
  ${List} {
    display: flex;
  }
  ${Item} {
    margin-left: 10px;
  }
`;

export default Header;
