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
      const response = await axios.get('http://localhost:5000/boards');
      dispatch(loadBoard(response.data));
    };
  };

  useEffect(() => {
    dispatch(loadBoardDB());
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
