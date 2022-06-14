import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faMortarBoard, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import BoardComment from './BoardComment';
import { removeBoardDB } from '../redux/modules/boardSlice';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BoardItem = ({ board }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMore, setIsMore] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const boards = useSelector(state => state.board.list);
  const comments = useSelector(state => state.comment.list);
  const search_data = useSelector(state => state.board.searchList);


  // 게시글 삭제 redux 함수 호출
  const onRemoveBoard = () => {
    dispatch(removeBoardDB(board._id));
  };

  // 각 게시글 별 댓글 갯수 값 계산 로직
  const onComment = board => {
    const filteredComment = comments.filter(comment => comment.contentId === board._id);
    return <Comment onClick={() => setIsComment(prev => !prev)}>댓글 {filteredComment.length}개</Comment>;
  };

  //사진 슬라이드
  const settings = {
    dots: true, 
    infinite: true,
    speed: 500, 
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const SerchMap = search_data.map((l, idx) => {
    return (
      <>
      <Item>
            <Text>
              <Top>
                <Nickname>{l.nickname}</Nickname>
                <Edit>
                  <Icon>
                    <FontAwesomeIcon
                      onClick={() =>
                        navigate(`/write/${l._id}`, { state: board })
                      }
                      icon={faPencil}
                      size="lg"
                    />
                  </Icon>
                  <Icon>
                    <FontAwesomeIcon
                      onClick={() => onRemoveBoard()}
                      icon={faTrashCan}
                      size="lg"
                    />
                  </Icon>
                </Edit>
              </Top>
              {isMore ? (
                <>
                  <Content>
                    <HighLight>{l.content}</HighLight>
                    <More onClick={() => setIsMore(false)}>접기</More>
                  </Content>
                </>
              ) : (
                <>
                  {l.content.length > 30 ? (
                    <Content>
                      {l.content.slice(0, 30) + "..."}
                      <More onClick={() => setIsMore(true)}>더보기</More>
                    </Content>
                  ) : (
                    <Content><HighLight>{l.content}</HighLight></Content>
                  )}
                </>
              )}
            </Text>
            <ImageBox>
              <Slider {...settings}>
                {l.imageURL.map((image, idx) => (
                  <ImgWrap key={idx}>
                    <Image image={image}>{`${image}-${idx}`}</Image>
                  </ImgWrap>
                ))}
              </Slider>
            </ImageBox>
            <Detail>
              <Like>
                <FontAwesomeIcon icon={faThumbsUp} size="lg" />
                <Count>2</Count>
              </Like>
              {onComment(board)}
            </Detail>
            {isComment && <BoardComment board={board} />}
            {!isComment && null}
          </Item>
          
        </>
    )});

  return (
    <>
    {SerchMap}<ShadowBr/>
    <h3>전체 게시글</h3>
      {boards && boards.map(board => (
      <Item key={board._id}>
        <Text>
          <Top>
            <Nickname>{board.nickname}</Nickname>
            <Edit>
              <Icon>
                <FontAwesomeIcon
                  onClick={() =>
                    navigate(`/write/${board._id}`, { state: board })
                  }
                  icon={faPencil}
                  size="lg"
                />
              </Icon>
              <Icon>
                <FontAwesomeIcon
                  onClick={() => onRemoveBoard()}
                  icon={faTrashCan}
                  size="lg"
                />
              </Icon>
            </Edit>
          </Top>
          {isMore ? (
            <>
              <Content>
                {board.content}
                <More onClick={() => setIsMore(false)}>접기</More>
              </Content>
            </>
          ) : (
            <>
              {board.content.length > 30 ? (
                <Content>
                  {board.content.slice(0, 30) + "..."}
                  <More onClick={() => setIsMore(true)}>더보기</More>
                </Content>
              ) : (
                <Content>{board.content}</Content>
              )}
            </>
          )}
        </Text>
        <ImageBox>
          <Slider {...settings}>
            {board.imageURL.map((image, idx) => (
              <ImgWrap key={idx}>
                <Image image={image}>{`${image}-${idx}`}</Image>
              </ImgWrap>
            ))}
          </Slider>
        </ImageBox>
        <Detail>
          <Like>
            <FontAwesomeIcon icon={faThumbsUp} size="lg" />
            <Count>2</Count>
          </Like>
          {onComment(board)}
        </Detail>
        {isComment && <BoardComment board={board} />}
        {!isComment && null}
      </Item>
    ))}
  </>
  );
};

const Item = styled.div`
  margin: 50px 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  transition: 0.4s;
`;

const Icon = styled.div``;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  ${Icon} {
    margin-left: 15px;
    cursor: pointer;
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

const Image = styled.div`
  width:500px;
  height:400px;
  border: 1px solid #d3d2d2;
  background-image:url(${(props) => (props.image)}) ;
  background-position:center;
  background-size:cover;
  background-repeat:no-repeat ;
  text-indent:-9999px;
`
const ImgWrap = styled.div`
position: relative;
background-color:black;
`;

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

const HighLight = styled.p`
background-color:yellow;
display:inline;
`
const ShadowBr = styled.div`
width:100%;
background-color:#e0e0e0;
height:1px;
box-shadow: 0 1px 8px rgba(0, 0, 0, 1);
`

export default BoardItem;
