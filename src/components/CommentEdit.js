import instance from '../shared/axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentEdit = ({ comments, onEdit, off }) => {
  const [option, setOption] = useState(false);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    if (!off) {
      setOption(false);
      setCancel(false);
    }
  }, [off]);

  const { commentId, contentId } = comments;

  const availeWrite = () => {
    setCancel(true);
    setOption(false);
    onEdit(true);
  };

  const reset = () => {
    setCancel(false);
    onEdit(false);
  };

  // 댓글 수정, 삭제 글자 보이기
  const commentItem = () => {
    return !cancel ? (
      <div>
        <span onClick={() => availeWrite()}>수정</span>
        <span onClick={() => handleRemove()}>삭제</span>
      </div>
    ) : (
      <div>
        <span onClick={() => reset()}>취소</span>
      </div>
    );
  };

  // 댓글 삭제
  const handleRemove = async () => {
    console.log('댓글 삭제');
    setOption(false);
    try {
      await instance.delete(`/comment/${contentId}/${commentId}`);
    } catch (error) {
      console.log('통신실패');
    }
  };
  return (
    <>
      <Icon onClick={() => setOption(true)}>
        <FontAwesomeIcon icon={faEllipsis} size='sm' />
      </Icon>
      {option && <Option>{commentItem()}</Option>}
      {!option && null}
    </>
  );
};

const Icon = styled.div`
  margin-left: 10px;
  padding: 1px 5px;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #f0f2f5;
  }
`;

const Option = styled.div`
  span {
    cursor: pointer;
    margin-left: 5px;
  }
  span:hover {
    background-color: red;
  }
`;
export default CommentEdit;
