import instance from '../shared/axios';
import React, { useState, useEffect } from 'react';
import CommentItem from './CommentItem';
import styled from 'styled-components';
import { getCookie } from '../shared/cookie';

const BoardComment = ({ board, comment, onAddComment, onUpdateContent, onRemoveContent }) => {
  const [commentValue, setCommentValue] = useState('');
  const [activeComment, setActiveComment] = useState(false);
  const USER_LOGIN = getCookie('is_login');

  // 댓글 입력 값 감지 함수
  const commentHandler = event => {
    setCommentValue(event.target.value);
  };

  // 댓글 저장 함수
  const submitHandler = async event => {
    if (!USER_LOGIN) alert('로그인이 필요한 기능입니다.');

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
          <span>게시</span>
        </Post>
      </InputBox>
      {comment.map(comm => (
        <CommentItem handleUpdateContent={updateContent} handleRemoveContent={removeContent} key={comm._id} comm={comm} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

const InputBox = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  span {
    font-weight: bold;
    font-size: 14px;
  }
  input {
    width: 80%;
    outline: none;
    border: none;
    padding-bottom: 2px;
    transition: 0.4s;
    font-size: 18px;
    background-color: #f0f2f5;
    padding: 8px 10px;
    margin-right: 5px;
    border-radius: 15px;
  }
`;

const Post = styled.div`
  color: #bfdffb;
  color: ${props => (props.mode === 'off' ? '#bfdffb' : '#58b9fa')};
  font-weight: bold;
  cursor: pointer;
  span {
    font-size: 17px;
  }
`;

export default BoardComment;
