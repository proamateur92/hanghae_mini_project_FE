import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BoardComment = ({ board }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [option, setOption] = useState(false);

  // 각 게시글 별 댓글 가져오기
  const comments = useSelector(state => state.comment.list);

  // 댓글 입력 값 감지 함수
  const commentHandler = event => {
    setComment(event.target.value);
  };

  // 댓글 저장 함수
  const submitHandler = event => {
    if (comment.trim() === '') return;
    if (event.type === 'submit') {
      event.preventDefault();
    }

    // 구현할 코드 작성

    setComment('');
  };

  const commentBox = articleId => {
    const filteredComment = comments.filter(comment => comment.articleId === articleId);
    return filteredComment.map(comment => (
      <CommentBox key={comment.id}>
        <span>{comment.nickName}</span>
        <div>{comment.comment}</div>
        <Icon onClick={() => setOption(prev => !prev)}>
          <FontAwesomeIcon icon={faEllipsis} size='sm' />
        </Icon>
        {option && (
          <>
            <span>수정</span>
            <span>삭제</span>
          </>
        )}
        {!option && null}
      </CommentBox>
    ));
  };

  return (
    <Container>
      <InputBox onSubmit={submitHandler}>
        <input value={comment} onChange={commentHandler} type='text' placeholder='댓글을 입력하세요' />
        <Post mode={comment ? '' : 'off'} onClick={submitHandler}>
          게시
        </Post>
      </InputBox>
      {commentBox(board.articleId)}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const InputBox = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  span {
    font-weight: bold;
    font-size: 14px;
  }
  input {
    width: 70%;
    outline: none;
    border: none;
    border-bottom: 1px solid #ccc;
    margin: 0 20px;
    padding-bottom: 2px;
    font-size: 16px;
    text-align: center;
    transition: 0.4s;
  }
  input:focus {
    border-bottom: 1.5px solid #bfdffb;
  }
`;

const Post = styled.span`
  color: #bfdffb;
  color: ${props => (props.mode === 'off' ? '#bfdffb' : '#58b9fa')};
  font-weight: bold;
  cursor: pointer;
`;

const Icon = styled.div``;
const CommentBox = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  span {
    font-size: 14px;
    font-weight: bold;
  }
  div {
    margin-left: 15px;
    background-color: #f0f2f5;
    padding: 10px 15px;
    border-radius: 10px;
  }
  ${Icon} {
    margin-left: 10px;
    padding: 2px 5px;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
  }
  ${Icon}:hover {
    background-color: #f0f2f5;
  }
`;

export default BoardComment;
