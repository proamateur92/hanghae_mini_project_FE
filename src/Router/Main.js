import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadBoardDB } from '../redux/modules/boardSlice';
import styled from 'styled-components';
import Header from './Header';
import BoardItem from '../components/BoardItem';
import Search from '../components/Search';
import SearchList from '../components/SearchList';
import Loder from '../components/Loder';
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
  const search_data = useSelector((state) => state.board.searchList);

  // //무한 스크롤
  const [isLoaded, setIsLoaded] = useState(false);
  const [target, setTarget] = useState(null);
  const [page, setPage] = useState(4)

  console.log(process.env.REACT_APP_MY_NAME)

  console.log(boards)
    
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await dispatch(loadBoardDB(page)) 
    }
  };
  useEffect(() => {
    let observer;
    if (target) {
      setPage(page+4)
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
      });
      observer.observe(target);
    }
    return () => {
      observer && observer.disconnect();
    };

  }, [target]);

{/* <><div ref={i === boards.length - 1 ? setTarget : null} ></div> */}

  // 컴포넌트 호출 될 때 초기화
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
    };
    load();
  }, []);

  return (
    <>
      {isLoading && (
        <>
          <Header />
          <Container>
            <Box>
              <Search />
                <>
                  <SearchList board={search_data}/>
                  <ShadowBr />
                </>
                <SubTitle>전체 게시글</SubTitle>
              <List>
                {boards && boards.map((board, i) => (<><BoardItem key={Math.random()} board={board}/>
                <div ref={i === boards.length - 1 ? setTarget : null} >{isLoaded && <Loder/>}</div></>))}
              </List>
            </Box>
          </Container>
          {USER_LOGIN && (
            <WriteButton>
              <FontAwesomeIcon
                onClick={() => navigate("/write")}
                icon={faSquarePlus}
                size="3x"
              />
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
const SubTitle = styled.h3`
`;

const ShadowBr = styled.div`
width:96%;
margin:0 auto;
background-color:#e0e0e0;
height:1px;
`;

export default Main;
