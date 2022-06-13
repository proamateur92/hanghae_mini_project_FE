import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadBoard } from '../redux/modules/boardSlice';
import Detail from './Detail';
import Login from './Login';
import Main from './Main';
import PageNotFound from './PageNotFound';
import Signup from './Signup';
import Write from './Write';
import { Routes, Route } from 'react-router-dom';
const Router = () => {
  const dispatch = useDispatch();

  const loadBoardDB = () => {
    return async function (dispatch) {
      // 테스트 url
      // const response = await axios.get('http://localhost:5000/boards');
      try {
        const response = await axios.get('http://13.124.25.127/content');
        dispatch(loadBoard(response.data));
      } catch (error) {
        // 게시글 불러오지 못할 때
        // 멘토링 때 물어보기
      }
      // console.log(response);
    };
  };

  // const loadCommentDB = () => {
  // return async function (dispatch) {
  // 테스트 url
  // const response = await axios.get('http://localhost:5000/comments');
  // dispatch(loadComment(response.data));
  // };
  // };

  // 컴포넌트 생성 시 댓글 불러오기 함수 실행
  useEffect(() => {
    dispatch(loadBoardDB());
    // dispatch(loadCommentDB());
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/:id' element={<Detail />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/write' element={<Write />} />
      <Route path='/write/:id' element={<Write />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
