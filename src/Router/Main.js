import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadBoardDB } from '../redux/modules/boardSlice';
import styled from 'styled-components';
import Header from './Header';
import BoardItem from '../components/BoardItem';
import Search from '../components/Search';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../shared/cookie';

const Main = () => {
  const USER_LOGIN = getCookie('is_login');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux로부터 게시글 정보 받아오기
  const [isLoading, setIsLoading] = useState(false);
  const boards = useSelector(state => state.board?.list);

  // 컴포넌트 호출 될 때 초기화
  useEffect(() => {
    const load = async () => {
      await dispatch(loadBoardDB());
      setIsLoading(true);
    };
    load();
  }, []);

  return (
    <>
      {isLoading && (
        <>
          <Header />
          <Search />
          <Container>
            <Box>
              <List>{boards && boards.map(board => <BoardItem key={Math.random()} board={board} />)}</List>
            </Box>
          </Container>
          {USER_LOGIN && (
            <WriteButton>
              <FontAwesomeIcon onClick={() => navigate('/write')} icon={faSquarePlus} size='3x' />
            </WriteButton>
          )}
        </>
      )}
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
  color: #bfdffb;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    transform: scale(1.1);
    color: #58b9fa;
  }
`;

export default Main;
