import axios from 'axios';

import React, { useState } from 'react';
import styled from 'styled-components';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentEdit = ({ board, comment }) => {
  const [option, setOption] = useState(false);
  const handleUpdate = () => {
    console.log('댓글 수정');
  };
  const handleRemove = async () => {
    console.log('댓글 삭제');
    try {
      await axios.delete(`http://13.124.25.127/comment/${board._id}/${comment._id}`);
    } catch (error) {
      console.log('통신실패');
    }
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
