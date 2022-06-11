import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalSignup, ModalLogin } from '../components/Modal'; //modal
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  return (
    <Container>
      <Logo onClick={() => navigate('/')}>로고</Logo>
      <List>
        <Item onClick={openLoginModal}>Login</Item>
        <ModalLogin open={modalLoginOpen} close={closeLoginModal} header='Modal heading'></ModalLogin>
        {/* <FontAwesomeIcon icon={faBars} size='2x' /> */}
        <Item>Logout</Item>
        <Item onClick={openSignupModal}>SignUp</Item>
        <ModalSignup open={modalSignupOpen} close={closeSignupModal} header='Modal heading'></ModalSignup>
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
  background-color: ${props => props.theme.color.primary};
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
