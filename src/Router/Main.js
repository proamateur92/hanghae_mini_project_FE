import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBoard } from '../redux/modules/boardSlice';
import styled from 'styled-components';
import Header from './Header';

const Main = () => {
  const dispatch = useDispatch();
  // const { boards } = useSelector(state => state.board.list);
  const boards = useSelector(state => state.board.list);

  const getData = async () => {
    const response = await axios.get('http://localhost:5000/boards');
    dispatch(loadBoard(response.data));
  };

  console.log(boards.length);
  useEffect(() => {
    getData();
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
                    <Nickname>{board.nickName}</Nickname>
                    <Content>{board.content}</Content>
                  </Text>
                  <ImageBox>
                    <Image src={board.imageURL} />
                  </ImageBox>
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
    width: 90%;
    max-width: 300px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    width: 90%;
    max-width: 991px;
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    width: 90%;
    max-width: 991px;
  }

  @media (min-width: 1200px) {
    width: 90%;
    max-width: 1200px;
  }
`;

const Item = styled.div`
  margin: 50px 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;

const Nickname = styled.span``;
const Content = styled.span``;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 50px;
  ${Nickname} {
    display: block;
    margin-bottom: 15px;
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
  background-color: red;
  font-size: 0;
  ${Image} {
    width: 100%;
  }
`;

export default Main;
