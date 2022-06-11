import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(state => state.board.list);

  return (
    <>
      <Header />
      <Container>
        <Box>
          <List>
            {boards &&
              boards.map(board => (
                <Item key={board.articleId} onClick={() => navigate(`/${board.articleId}`, { state: board })}>
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
                            size='xl'
                          />
                        </Icon>
                        <Icon>
                          <FontAwesomeIcon icon={faTrashCan} size='xl' />
                        </Icon>
                      </Edit>
                    </Top>
                    <Content>{board.content}</Content>
                  </Text>
                  <ImageBox>
                    <Image src={board.imageURL} />
                  </ImageBox>
                  <Detail>
                    <Like>
                      <FontAwesomeIcon icon={faThumbsUp} size='xl' />
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
  @media (max-width: 767px) {
    width: 100%;
    max-width: 250px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    width: 100%;
    max-width: 400px;
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    width: 100%;
    max-width: 600px;
  }

  @media (min-width: 1200px) {
    width: 100%;
    max-width: 900px;
  }
`;

const Item = styled.div`
  margin: 100px 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    filter: brightness(90%);
    transform: scale(1.05);
  }
`;

const Icon = styled.div``;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  ${Icon} {
    margin-left: 10px;
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
const Text = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 50px;
  ${Nickname} {
    display: block;
    font-weight: bold;
    font-size: 30px;
  }
  ${Content} {
    font-size: 20px;
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

const Detail = styled.div`
  margin: 0 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;

const Comment = styled.span``;
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
