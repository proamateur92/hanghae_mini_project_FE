import axios from 'axios';
import React, { useState } from 'react';
import CommentEdit from './CommentEdit';
import styled from 'styled-components';

const BoardComment = ({ board, comment }) => {
  console.log(comment);
  const [commentValue, setCommentValue] = useState('');

  // 댓글 입력 값 감지 함수
  const commentHandler = event => {
    setCommentValue(event.target.value);
  };

  // 댓글 저장 함수
  const submitHandler = async event => {
    if (commentValue.trim() === '') return;
    if (event.type === 'submit') {
      event.preventDefault();
    }

    const commentData = {
      nickname: 'admin99',
      contentId: `${board.id}`,
      comment: `${commentValue}`,
    };

    console.log(commentData);

    try {
      await axios.post(`http://13.209.64.124/comment/${board._id}`, commentData);
    } catch (error) {
      console.log('통신실패');
    }
    setCommentValue('');
  };

  return (
    <Container>
      <InputBox onSubmit={submitHandler}>
        <input value={commentValue} onChange={commentHandler} type='text' placeholder='댓글을 입력하세요' />
        <Post mode={commentValue ? '' : 'off'} onClick={submitHandler}>
          게시
        </Post>
      </InputBox>
      {comment.length &&
        comment.map(comm => (
          <CommentItem key={comm._id}>
            <span>{comm.nickname}</span>
            <span>{comm.comment}</span>
            <CommentEdit key={comm.commentId} board={board} comment={comment}></CommentEdit>
          </CommentItem>
        ))}
      <CommentBox key={comment.id}></CommentBox>
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
const CommentItem = styled.div`
  display: flex;
`;

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
`;

export default BoardComment;
