import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from './Header';
import BoardList from '../components/BoardList';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
const Main = () => {
  const navigate = useNavigate();
  const boards = useSelector(state => state.board.list);

  return (
    <>
      <Header />
      <Container>
        <Box>
          <List>{boards && boards.map(board => <BoardList board={board} />)}</List>
        </Box>
      </Container>
      <WriteButton>
        <FontAwesomeIcon onClick={() => navigate('/write')} icon={faSquarePlus} size='3x' />
      </WriteButton>
    </>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.div``;
const Box = styled.div`
  padding: 20px;
  /* @media (min-width: 499px) {
    width: 90%;
    max-width: 440px;
  }
  @media (min-width: 500px) {
    width: 90%;
    max-width: 50px;
  } */
`;

const WriteButton = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    color: #076be1;
  }
`;

export default Main;
