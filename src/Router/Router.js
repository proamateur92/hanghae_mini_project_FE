import Detail from './Detail';
import Login from './Login';
import Main from './Main';
import PageNotFound from './PageNotFound';
import Signup from './Signup';
import Write from './Write';
import { Routes, Route } from 'react-router-dom';

const Router = () => {
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
