import instance from '../shared/axios';
import React, { useState } from 'react';
import CommentItem from './CommentItem';
import styled from 'styled-components';

const BoardComment = ({ board, comment, onAddComment, onUpdateContent, onRemoveContent }) => {
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
      // nickname: 'admin99',
      // contentId: `${board._id}`,
      comment: `${commentValue}`,
    };

    // 댓글 추가하기
    try {
      const response = await instance.post(`/comment/${board._id}`, commentData);
      onAddComment(response.data.contentcomment);
    } catch (error) {
      console.log('통신실패');
    }
    setCommentValue('');
  };

  const updateContent = (targetId, newComment) => {
    onUpdateContent(targetId, newComment);
  };

  const removeContent = targetId => {
    onRemoveContent(targetId);
  };

  return (
    <Container>
      <InputBox onSubmit={submitHandler}>
        <input value={commentValue} onChange={commentHandler} type='text' placeholder='댓글을 입력하세요' />
        <Post mode={commentValue ? '' : 'off'} onClick={submitHandler}>
          게시
        </Post>
      </InputBox>
      {comment.map(comm => (
        <CommentItem handleUpdateContent={updateContent} handleRemoveContent={removeContent} key={comm._id} comm={comm} />
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
