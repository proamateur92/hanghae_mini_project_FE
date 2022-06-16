import instance from '../shared/axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [commentValue, setCommentValue] = useState([]);
  const [likeNum, setLikeNum] = useState([]);
  const [activeLike, setActiveLike] = useState(0);
  const [likeId, setLikeId] = useState('');
  const [isMore, setIsMore] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const USER_NICKNAME = getCookie('nickname');
  const user = useSelector(state => state.user);

  // 로그인 여부에 따른 컴포넌트 렌더링
  useEffect(() => {}, [user.isLogin]);

  const loadLikeInfo = async () => {
    try {
      // 게시글 id 값으로 좋아요 목록 가져오기
      const likeResponse = await instance.get(`/like/${board._id}`);
      // console.log(likeResponse.data);

      // 좋아요 활성화
      // 해당 게시글에 존재하는 좋아요 목록 중 로그인한 유저의 닉네임과 일치하는 좋아요 목록 반환
      const likeMatch = likeResponse.data.filter(like => like.nickname === USER_NICKNAME);
      // 배열 값이 존재하면 1 없으면 0으로 좋아요 버튼 색깔 전환
      setActiveLike(likeMatch.length);

      // 해당 게시글의 유저가 좋아요를 한 경우 Like 태그의 id값을 부여 (좋아요 추가, 삭제 구분하기 위한 id값)
      if (likeMatch.length) {
        setLikeId(likeMatch[0]._id);
      }

      // 좋아요 개수 반환
      const likeNums = likeResponse.data.filter(like => like.contentId === board._id);
      setLikeNum(likeNums.length);
    } catch (error) {
      console.log(`좋아요 불러오기 에러: ${error}`);
    }
  };

  // 게시글 정보가 바뀔 때마다 호출
  useEffect(() => {
    const load = async () => {
      // 게시글 id 값으로 댓글 목록 가져오기
      const boardResponse = await instance.get(`/comment/${board._id}`);

      // 댓글 반영결과가 바로 반영되도록 state 값을 set
      setCommentValue(boardResponse.data.comment);

      // 좋아요 갯수, 버튼 활성화 여부를 렌더링 해주기 위한 함수 호출
      loadLikeInfo();
    };

    // 의미없이 렌더링 되지 않도록 처리
    load();
  }, [board]);

  // 좋아요 버튼 클릭 했을 때
  const switchLike = async targetId => {
    // cookie에 로그인 정보가 들어있지 않으면 return
    if (!USER_NICKNAME) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    // 좋아요 삭제를 위해 필요한 객체
    const data = {
      contentId: board._id,
      nickname: USER_NICKNAME,
    };

    // 45번 line 값으로 부여
    // 좋아요 생성이 되어있다면 id값이 부여되어있음
    // 좋아요 생성이 되어있지 않다면 빈 문자열이 부여되어있음
    if (targetId) {
      // 좋아요 삭제 요청 -> 게시글 id, nickname 필요
      await instance.delete(`/like/${board._id}/${targetId}`, USER_NICKNAME);

      // Like 태그의 id 값을 초기화 해준다.
      setLikeId('');
    } else {
      // 좋아요 수정 요청 -> 게시글 id 필요, 83 line 객체 전달
      await instance.post(`/like/${board._id}`, data);

      // Like 태그의 id 값에 nickname 값을 넣어준다.
      setLikeId(USER_NICKNAME);
    }

    loadLikeInfo();
  };

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
        <Like id={likeId} onClick={() => switchLike(likeId)} isActive={activeLike}>
          <FontAwesomeIcon icon={faThumbsUp} size='lg' />
          <Count>{likeNum}</Count>
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
    font-size: 20px;
  }
  ${Content} {
    font-size: 30px;
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
    font-size: 20px;
  }
`;

const Count = styled.span``;
const Like = styled.div`
  color: ${props => (props.isActive ? '#076be1' : '#000')};
  &:hover {
    color: ${props => (props.isActive ? '#000' : '#076be1')};
    transform: scale(1.1);
    font-weight: bold;
  }
  ${Count} {
    margin-left: 5px;
  }
`;

export default BoardItem;
