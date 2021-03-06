import instance from '../shared/axios';
import { useState } from 'react';
import styled from 'styled-components';
import CommentEdit from './CommentEdit';

const CommentItem = ({ comm, handleUpdateContent, handleRemoveContent }) => {
  // 댓글 입력 값을 담기 위한 state
  const [commentValue, setCommentValue] = useState(comm.comment);

  // 수정 버튼 클릭하면 input tag로 전환, 취소하면 초기화
  const [activeInput, setActiveInput] = useState(false);

  // 댓글 입력 값 감지 함수
  const commentHandler = event => {
    setCommentValue(event.target.value);
  };

  // 수정 취소 하면 input value 값 원상태로 초기화
  const resetNewContent = () => {
    setCommentValue(comm.comment);
  };

  // 댓글 게시 함수
  const submitHandler = async event => {
    event.preventDefault();

    // 댓글이 공백이면 return
    if (commentValue.trim() === '') return;

    const commentData = {
      comment: `${commentValue}`,
    };

    try {
      // 게시글 아이디, 댓글 아이디
      await instance.patch(`/comment/${comm.contentId}/${comm.commentId}`, commentData);
      handleUpdateContent(comm.commentId, commentValue);
    } catch (error) {
      console.log('통신실패');
      return;
    }
    // 댓글 입력하면 input 태그 해제
    setActiveInput(false);
  };

  const handleNewContent = result => {
    // 수정 버튼을 클릭하면 input태그 해제
    setActiveInput(result);
  };

  const excuteRemoveComment = targetId => {
    // 삭제 버튼 클릭하면 id값 전달
    handleRemoveContent(targetId);
  };

  return (
    <Container key={comm._id} onSubmit={submitHandler}>
      <NameCommentWrap>
        <Nickname>{comm.nickname}</Nickname>
        {!activeInput ? <CommentBody>{comm.comment}</CommentBody> : <CommentInput type='text' onChange={commentHandler} value={commentValue} />}
      </NameCommentWrap>
      <div>
        <CommentEdit
          key={comm.commentId}
          callRemoveComment={excuteRemoveComment}
          off={activeInput}
          onEdit={handleNewContent}
          onCancel={resetNewContent}
          comments={comm}
        ></CommentEdit>
      </div>
    </Container>
  );
};

const Nickname = styled.span``;

const CommentBody = styled.span``;
const CommentInput = styled.input``;
const NameCommentWrap = styled.div`
  display: flex;
  align-items: center;
`;
const Container = styled.form`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  margin-bottom: 10px;
  ${CommentBody} {
    display: block;
    font-size: 18px;
  }
  ${CommentInput} {
    outline: none;
    border: none;
    font-size: 18px;
    background-color: #f0f2f5;
    padding: 8px 10px;
    border-radius: 15px;
    width: 40%;
  }
  ${Nickname} {
    margin-right: 10px;
    font-size: 18px;
    font-weight: bold;
  }
`;

export default CommentItem;
