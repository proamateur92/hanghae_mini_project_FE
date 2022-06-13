import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import BoardComment from './BoardComment';
import { removeBoardDB } from '../redux/modules/boardSlice';
import { loadComment } from '../redux/modules/commentSlice';

const BoardItem = ({ board }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMore, setIsMore] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const comments = useSelector(state => state.comment.list);

  // 해당 게시글 댓글 가져오기
  // const loadCommentDB = () => {
  //   return async function (dispatch) {
  //     테스트 url
  //     const response = await axios.get('http://localhost:5000/boards');
  //     try {
  //       const response = await axios.get(`http://13.124.25.127/content/${board._id}`);
  //       console.log(response);
  //       dispatch(loadComment(response.data));
  //     } catch (error) {
  //       멘토링 때 물어보기
  //     }
  //   };
  // };

  // 컴포넌트 생성 시 댓글 불러오기 함수 실행
  useEffect(() => {
    // dispatch(loadCommentDB());
  }, []);

  // 게시글 삭제 redux 함수 호출
  const onRemoveBoard = () => {
    dispatch(removeBoardDB(board._id));
  };

  // 각 게시글 별 댓글 갯수 값 계산 로직
  const onComment = board => {
    const filteredComment = comments.filter(comment => comment.articleId === board.articleId);
    return <Comment onClick={() => setIsComment(prev => !prev)}>댓글 {filteredComment.length}개</Comment>;
  };

  return (
    <Item>
      <Text>
        <Top>
          <Nickname>{board.nickname}</Nickname>
          <Edit>
            <Icon>
              <FontAwesomeIcon onClick={() => navigate(`/write/${board._id}`, { state: board })} icon={faPencil} size='lg' />
            </Icon>
            <Icon>
              <FontAwesomeIcon onClick={() => onRemoveBoard()} icon={faTrashCan} size='lg' />
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
        <Image src={board.imageURL} />
      </ImageBox>
      <Detail>
        <Like>
          <FontAwesomeIcon icon={faThumbsUp} size='lg' />
          <Count>2</Count>
        </Like>
        {onComment(board)}
      </Detail>
      {isComment && <BoardComment board={board} />}
      {!isComment && null}
    </Item>
  );
};

const Item = styled.div`
  margin: 100px 0;
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

export default BoardItem;
