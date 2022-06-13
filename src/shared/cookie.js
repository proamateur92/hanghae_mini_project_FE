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

// export const removeCookie = (name) => {
//   return localStorage.removeItem((name = "is_login"));
// };

export const removeCookie = () => {
  return cookies.remove;
};

// export const removeCookie = (name) => {
//   document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
// };

// export const resetCookie = (cName) => {
//   var expireDate = new Date();
//   expireDate.setDate(expireDate.getDate() - 1);
//   document.cookie =
//     cName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
// };
