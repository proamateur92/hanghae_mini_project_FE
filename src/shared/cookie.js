//쿠키를 위한 커스텀 훅
import { Cookies } from "react-cookie";

const cookies = new Cookies();

//쿠키에 저장하기
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

// 쿠키에 저장된 쿠키 불러오기
export const getCookie = (name) => {
  return cookies.get(name);
};
