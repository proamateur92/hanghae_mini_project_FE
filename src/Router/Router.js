import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadBoardDB } from "../redux/modules/boardSlice";
import { loadLikeDB } from "../redux/modules/likeSlice";
import Main from "./Main";
import PageNotFound from "./PageNotFound";
import Write from "./Write";
import { Routes, Route } from "react-router-dom";

const Router = () => {
  const dispatch = useDispatch();

  // 게시글 불러오기 redux 함수 호출
  useEffect(() => {
    dispatch(loadBoardDB());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/write" element={<Write />} />
      <Route path="/write/:id" element={<Write />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
