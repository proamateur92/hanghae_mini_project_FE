import styled from 'styled-components';
import Header from './Header';

const Main = () => {
  return (
    <>
      <Header />
      <Container>
        <Box>
          <Title>메인페이지</Title>
          <h2>이슈 테스트</h2>
        </Box>
      </Container>
    </>
  );
};

const Title = styled.h1`
  color: ${props => props.theme.color.primary};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.div`
  width: 600px;
`;

export default Main;
