import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from './Header';
import BoardItem from '../components/BoardItem';
import Search from '../components/Search';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
const Main = () => {
  const navigate = useNavigate();

  // redux로부터 게시글 정보 받아오기
  const boards = useSelector(state => state.board.list);
  console.log(boards)
  return (
    <>
      <Header />
      <Search/>
      <Container>
        <Box>
          {/* <List>{boards && boards.map(board => <BoardItem key={board._id} board={board} />)}</List> */}
          <List><BoardItem board={boards}></BoardItem></List>
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
  width: 70%;
  @media (max-width: 499px) {
    max-width: 440px;
  }
  @media (min-width: 500px) {
    max-width: 700px;
  }
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
