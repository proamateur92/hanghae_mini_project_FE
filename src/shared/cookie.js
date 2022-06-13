import { useEffect } from "react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

//쿠키에 저장
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

// 쿠키에 저장된 거 불러오기
export const getCookie = (name) => {
  return cookies.get(name);
};
