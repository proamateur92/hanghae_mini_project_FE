import axios from "axios";
import { getCookie } from "../shared/cookie";
//인스턴스 생성
const instance = axios.create({
  baseURL: "http://13.209.64.124",
  headers: { "Content-Type": "application/json" },
});
//토큰값
const token = getCookie("is_login");
instance.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
// 임시토큰
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjYyYTY4Mjk4ZjdlOGNkOTZlZjhmNTYxNiIsImlhdCI6MTY1NTEzNTg2NX0.T-RJn1iIcT4zkB3rCZK9wUe2IyVOZn7LZz6lp2B2vps";

//요청 가로채기
// instance.interceptors.request.use(
  // (config) => {
    // config.headers["Authorization"] = `Bearer ${token}`;
    // console.log(config);
    // return config;
  // }
  // ,(err) => {
  //   return Promise.reject(err);
  // }
// );

//응답 가로채기
instance.interceptors.response.use(
  (response) => {
    // console.log("리스폰",response)
    return response;
  }
  // , (err) => {
  //     console.log(err.response.data)
  //     return Promise.reject(err)
  // }
);

export default instance;
