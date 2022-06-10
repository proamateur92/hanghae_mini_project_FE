import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjQoEVfJ3L1G9m_vLdLPw5hxPv6dVLxRo",
  authDomain: "hanghae-mini.firebaseapp.com",
  projectId: "hanghae-mini",
  storageBucket: "hanghae-mini.appspot.com",
  messagingSenderId: "645872316392",
  appId: "1:645872316392:web:2d1c833092f5c5e93e7e5d",
  measurementId: "G-4VBK86G8VC",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage();

//firebase의 firestore 인스턴스를 변수에 저장
export const db = getFirestore(app);
//필요한 곳에서 사용할 수 있도록 내보내기

export default app;
