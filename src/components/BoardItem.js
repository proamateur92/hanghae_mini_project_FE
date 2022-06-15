import instance from '../shared/axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import BoardComment from './BoardComment';
import { removeBoardDB } from '../redux/modules/boardSlice';
import Slider from 'react-slick';
import { getCookie } from '../shared/cookie';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BoardItem = ({ board }) => {
  const USER_NICKNAME = getCookie('nickname');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [commentValue, setCommentValue] = useState([]);
  const [isMore, setIsMore] = useState(false);
  const [isComment, setIsComment] = useState(false);

  // 댓글 가져오기
  useEffect(() => {
    const load = async () => {
      const response = await instance.get(`/comment/${board._id}`);
      setCommentValue(response.data.comment);
    };

    load();
  }, []);

  // 게시글 삭제 redux 함수 호출
  const onRemoveBoard = () => {
    dispatch(removeBoardDB(board._id));
  };

  // 댓글 추가 - state 반영
  const handleAddComment = newComment => {
    // console.log('추가할 댓글 정보');
    // console.log(newComment);
    setCommentValue([newComment, ...commentValue]);
  };

  // 댓글 수정 - state 반영
  const handleUpdateComment = (targetId, newComment) => {
    // console.log('수정할 수정 정보');
    // console.log(targetId, newComment);
    // console.log(commentData);
    const commentData = commentValue.map(list => (list.commentId === targetId ? { ...list, comment: newComment } : list));
    // console.log(commentData);
    setCommentValue(commentData);
  };

  // 댓글 삭제 - state 반영
  const handleRemoveComment = targetId => {
    // console.log('삭제할 댓글 정보');
    const commentData = commentValue.filter(list => list.commentId !== targetId);
    // console.log(commentData);
    setCommentValue(commentData);
  };

  //사진 슬라이드
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // console.log('댓글목록 정보');
  // console.log(commentValue);
  return (
    <Item>
      <Text>
        <Top>
          <Nickname>{board.nickname}</Nickname>
          <Edit>
            {USER_NICKNAME === board.nickname ? (
              <>
                <Icon>
                  <FontAwesomeIcon onClick={() => navigate(`/write/${board._id}`, { state: board })} icon={faPencil} size='lg' />
                </Icon>
                <Icon>
                  <FontAwesomeIcon onClick={() => onRemoveBoard()} icon={faTrashCan} size='lg' />
                </Icon>
              </>
            ) : null}
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
                {board.content.slice(0, 30) + '...'}
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
          <FontAwesomeIcon icon={faThumbsUp} size='lg' />
          <Count>2</Count>
        </Like>
        <Comment onClick={() => setIsComment(prev => !prev)}>댓글 {commentValue.length}개</Comment>
      </Detail>
      {isComment && (
        <BoardComment
          key={board._id}
          onAddComment={handleAddComment}
          onUpdateContent={handleUpdateComment}
          onRemoveContent={handleRemoveComment}
          board={board}
          comment={commentValue}
        />
      )}
      {!isComment && null}
    </Item>
  );
};

const Item = styled.div`
  margin-bottom: 80px;
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
  width: 500px;
  height: 400px;
  border: 1px solid #d3d2d2;
  background-image: url(${props => props.image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  text-indent: -9999px;
`;
const ImgWrap = styled.div`
  position: relative;
  background-color: black;
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

export default BoardItem;
