import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBoard } from '../redux/modules/boardSlice';
import styled from 'styled-components';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMore, setIsMore] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const boards = useSelector(state => state.board.list);

  const LoadBoardDB = () => {
    return async function (dispatch) {
      const response = await axios.get('http://localhost:5000/boards');
      dispatch(loadBoard(response.data));
    };
  };

  useEffect(() => {
    dispatch(LoadBoardDB());
  }, []);
  return (
    <>
      <Header />
      <Container>
        <Box>
          <List>
            {boards &&
              boards.map(board => (
                <Item key={board.articleId}>
                  <Text>
                    <Top>
                      <Nickname>{board.nickName}</Nickname>
                      <Edit>
                        <Icon>
                          <FontAwesomeIcon
                            onClick={e => {
                              e.stopPropagation();
                              navigate(`/write/${board.articleId}`, { state: board });
                            }}
                            icon={faPencil}
                            size='lg'
                          />
                        </Icon>
                        <Icon>
                          <FontAwesomeIcon icon={faTrashCan} size='lg' />
                        </Icon>
                      </Edit>
                    </Top>
                    {isMore ? (
                      <>
                        <Content>{board.content}</Content>
                        <More onClick={() => setIsMore(false)}>접기</More>
                      </>
                    ) : (
                      <>
                        {board.content.length > 30 ? (
                          <Content>
                            {board.content.slice(0, 60) + '...'}
                            <More onClick={() => setIsMore(true)}>더보기</More>
                          </Content>
                        ) : (
                          <Content>{board.content}</Content>
                        )}
                      </>
                    )}
                  </Text>
                  <ImageBox>
                    <Image src={board.imageURL} />
                  </ImageBox>
                  <Detail>
                    <Like>
                      <FontAwesomeIcon icon={faThumbsUp} size='lg' />
                      <Count>2</Count>
                    </Like>
                    <Comment>댓글 2개</Comment>
                  </Detail>
                </Item>
              ))}
          </List>
        </Box>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.div``;
const Box = styled.div`
  @media (min-width: 499px) {
    width: 90%;
    max-width: 440px;
  }

  @media (min-width: 500px) {
    width: 90%;
    max-width: 450px;
  }
`;

const Item = styled.div`
  margin: 100px 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  transition: 0.4s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    filter: brightness(95%);
  }
`;

const Icon = styled.div``;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  ${Icon} {
    margin-left: 15px;
  }
  ${Icon}:hover {
    transform: scale(1.1);
  }
  ${Icon}:first-child:hover {
    color: #076be1;
  }
  ${Icon}:last-child:hover {
    color: red;
  }
`;

const Edit = styled.div`
  display: flex;
`;

const Nickname = styled.span``;
const Content = styled.span``;
const More = styled.span``;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  ${Nickname} {
    color: #9c9c9c;
    display: block;
    font-weight: bold;
    font-size: 16px;
  }
  ${Content} {
    font-size: 16px;
  }
  ${More} {
    color: #383838;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Image = styled.img``;
const ImageBox = styled.div`
  width: 100%;
  font-size: 0;
  ${Image} {
    width: 100%;
  }
`;

const Comment = styled.span``;
const Detail = styled.div`
  margin: 0 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  ${Comment} {
    color: #383838;
    cursor: pointer;
    font-size: 16px;
  }
`;

const Count = styled.span``;
const Like = styled.div`
  color: #000;
  &:hover {
    color: #076be1;
    transform: scale(1.1);
    font-weight: bold;
  }
  ${Count} {
    margin-left: 5px;
  }
`;
export default Main;
