import instance from '../shared/axios';
import { useState } from 'react';
import styled from 'styled-components';
import CommentEdit from './CommentEdit';

const CommentItem = ({ comm }) => {
  const [commentValue, setCommentValue] = useState(comm.comment);
  const [activeInput, setActiveInput] = useState(false);

  // 댓글 입력 값 감지 함수
  const commentHandler = event => {
    setCommentValue(event.target.value);
  };

  // 수정 취소 하면 input value 값 원상태로 초기화
  const resetNewContent = () => {
    setCommentValue(comm.comment);
  };

  // 댓글 저장 함수
  const submitHandler = async event => {
    event.preventDefault();

    if (commentValue.trim() === '') return;

    const commentData = {
      // nickname: 'admin99',
      // contentId: `${comm.contentId}`,
      comment: `${commentValue}`,
    };

    try {
      // 게시글 아이디, 댓글 아이디
      await instance.patch(`/comment/${comm.contentId}/${comm.commentId}`, commentData);
    } catch (error) {
      console.log('통신실패');
      return;
    }

    setActiveInput(false);
  };

  const handleNewContent = result => {
    setActiveInput(result);
  };

  return (
    <Container key={comm._id} onSubmit={submitHandler}>
      <span>{comm.nickname}</span>
      {!activeInput ? <span>{comm.comment}</span> : <input type='text' onChange={commentHandler} value={commentValue} />}
      <CommentEdit key={comm.commentId} off={activeInput} onEdit={handleNewContent} onCancel={resetNewContent} comments={comm}></CommentEdit>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
`;

export default CommentItem;
