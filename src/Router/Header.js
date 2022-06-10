import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <Logo>로고</Logo>
      <List>
        <Item>Login</Item>
        <Item>Logout</Item>
        <Item>Sign up</Item>
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
  background-color: ${props => props.theme.color.primary};
  ${List} {
    display: flex;
  }
  ${Item} {
    margin-left: 10px;
  }
`;

export default Header;
