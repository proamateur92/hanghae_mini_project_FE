import instance from '../shared/axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCookie } from '../shared/cookie';

const CommentEdit = ({ comments, onEdit, off, callRemoveComment }) => {
  const USER_NICKNAME = getCookie('nickname');

  const { commentId, contentId, nickname } = comments;

  // 수정, 삭제 toggle을 위한 state
  const [option, setOption] = useState(false);

  // 취소 버튼을 눌렀을 때 모든 toggle 초기화
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    if (!off) {
      setOption(false);
      setCancel(false);
    }
  }, [off]);

  const availeWrite = () => {
    //
    setCancel(true);
    // 수정, 삭제 토글 off 처리
    onEdit(true);
  };

  // 취소
  const reset = () => {
    setCancel(false);
    onEdit(false);
  };

  // 댓글 수정, 삭제 글자 보이기
  const commentItem = () => {
    return !cancel ? (
      <OptionDetail>
        <span onClick={() => availeWrite()}>수정</span>
        <span onClick={() => handleRemove()}>삭제</span>
      </OptionDetail>
    ) : (
      <OptionDetail>
        <span onClick={() => reset()}>취소</span>
      </OptionDetail>
    );
  };

  // 댓글 삭제
  const handleRemove = async () => {
    // 수정, 삭제 가리기
    setOption(false);
    try {
      // 댓글 삭제 요청
      await instance.delete(`/comment/${contentId}/${commentId}`);
      // 상위 컴포넌트에 id값 전달
      callRemoveComment(commentId);
    } catch (error) {
      console.log('통신실패');
    }
  };
  return (
    <>
      {USER_NICKNAME === nickname ? (
        <Icon onClick={() => setOption(prev => !prev)}>
          <FontAwesomeIcon icon={faEllipsis} size='sm' />
        </Icon>
      ) : null}
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

const Option = styled.div``;
const OptionDetail = styled.div`
  display: flex;
  position: relative;
  span {
    font-size: 14px;
    padding: 5px 8px;
    width: 30px;
    text-align: center;
    margin-left: 5px;
    border-radius: 5px 5px 0 0;
    background-color: white;
    box-shadow: 1px 1px 1px gray;
    cursor: pointer;
    position: absolute;
    top: 0px;
    right: -10px;
  }
  span:last-child {
    top: 27px;
    border-radius: 0 0 5px 5px;
  }
  span:hover {
    cursor: pointer;
    background-color: #f0f2f5;
  }
`;

export default CommentEdit;
