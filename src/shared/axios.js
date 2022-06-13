import axios from "axios";

//인스턴스 생성
const instance = axios.create({
    baseURL:"http://13.124.25.127",
    headers:{"Content-Type":"application/json"},
    timeout:5000,
});
//토큰값
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjYyYTY4Mjk4ZjdlOGNkOTZlZjhmNTYxNiIsImlhdCI6MTY1NTExODAwNH0.7vrWqXPVbZRTy9t04DXRCiyyfSwO9QFP6QqK3XKpQ_g";

//요청 가로채기
instance.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    console.log(config);
    return config;
  }
  // ,(err) => {
  //   return Promise.reject(err);
  // }
  );

//응답 가로채기
instance.interceptors.response.use((response) => {
    console.log("리스폰",response)
    return response;
}
// , (err) => {
//     console.log(err.response.data)
//     return Promise.reject(err)
// }
);

export default instance;