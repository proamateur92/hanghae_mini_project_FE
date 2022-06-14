import axios from 'axios';

import React, { useState } from 'react';
import styled from 'styled-components';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentEdit = ({ comments }) => {
  const [option, setOption] = useState(false);
  const { commentId, contentId, comment } = comments;
  const handleUpdate = async () => {
    console.log('댓글 수정');
    console.log(contentId);
    console.log(commentId);
    console.log(comment);
    // try {
    //   await axios.patch(`http://13.209.64.124/comment/${commentId}/${comment._id}`);
    // } catch (error) {
    //   console.log('통신실패');
    // }
  };
  const handleRemove = async () => {
    console.log('댓글 삭제');
    console.log(contentId);
    console.log(commentId);
    console.log(comment);
    // try {
    //   await axios.delete(`http://13.209.64.124/comment/${board._id}/${comment._id}`);
    // } catch (error) {
    //   console.log('통신실패');
    // }
  };
  return (
    <>
      <Icon onClick={() => setOption(prev => !prev)}>
        <FontAwesomeIcon icon={faEllipsis} size='sm' />
      </Icon>
      {option && (
        <Option>
          <span onClick={handleUpdate}>수정</span>
          <span onClick={handleRemove}>삭제</span>
        </Option>
      )}
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
