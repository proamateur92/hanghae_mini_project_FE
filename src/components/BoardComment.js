import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const BoardComment = ({ board }) => {
  const [comment, setComment] = useState('');

  // 각 게시글 별 댓글 가져오기
  const comments = useSelector(state => state.comment.list);

  const commentHandler = event => {
    setComment(event.target.value);
  };

  const submitHandler = event => {
    if (event.type === 'submit') {
      event.preventDefault();
    }

    setComment('');
  };

  const commentBox = articleId => {
    const filteredComment = comments.filter(comment => comment.articleId === articleId);
    return filteredComment.map(comment => (
      <CommentInput>
        <span>{comment.nickName}</span>
        <span>{comment.comment}</span>
      </CommentInput>
    ));
  };

  return (
    <CommentBox onSubmit={submitHandler}>
      <>
        <span>{board.nickName}</span>
        <input value={comment} onChange={commentHandler} type='text' placeholder='댓글을 입력하세요' />
        <Post mode={comment ? '' : 'off'} onClick={submitHandler}>
          게시
        </Post>
      </>
      {commentBox(board.articleId)}
    </CommentBox>
  );
};

const CommentBox = styled.form`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  span {
    font-weight: bold;
  }
  input {
    width: 60%;
    outline: none;
    border: none;
    border-bottom: 1px solid #ccc;
    margin: 0 20px;
    padding-bottom: 2px;
    font-size: 16px;
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

const CommentInput = styled.div`
  background-color: green;
`;

export default BoardComment;
