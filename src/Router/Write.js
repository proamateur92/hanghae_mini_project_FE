import React from "react";
import moment from "moment";
import { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { createBoard } from "../redux/modules/boardSlice";
//firebase
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../shared/firebase";

const Write = () => {
  const dispatch = useDispatch();
  const text = React.useRef(null);
  const file_link_ref = React.useRef(null); //
  const [img, setImg] = React.useState(""); //수정페이지면 사진url을 불러와야함

  //서버에 넘겨줄 데이터 목록
  const getInputData = () => {
    const content = text.current?.value;
    const imageURL = file_link_ref.current?.url;
    if (!content) {
      alert("글 내용을 입력해주세요.");
      return false;
    }
    const contents_obj = {
      content: content,
      imageURL: imageURL,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      likeCount: 0,
      commentCount: 0,
    };
    return contents_obj;
  };

  //데이터를 리덕스에 옮김
  const createBoardData = () => {
    const contents_obj = getInputData();
    if (!contents_obj) return;
    const new_contents_obj = {
      ...contents_obj,
    };
    dispatch(createBoard({ ...new_contents_obj }));
  };

  //사진 미리보기
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImg(reader.result);
        resolve();
      };
    });
  };

  const upLoadFB = async (e) => {
    const uploded_file = await uploadBytes(
      ref(storage, `images/${img.name}`), //경로
      img //어떤파일 올릴지
    );
    const file_url = await getDownloadURL(uploded_file.ref);
    //링크를 담는다.
    file_link_ref.current = { url: file_url };
  };
  return (
    <form>
      <h1>{1 === 1 ? "작성페이지" : "수정페이지"}</h1>
      <input
        type="file"
        onChange={(e) => {
          encodeFileToBase64(e.target.files[0]);
          setImg(e.target.files[0]);
        }}
      />
      <br />
      <img
        src={img ? img : "https://t1.daumcdn.net/cfile/blog/225FFE4451C3F7C219"}
        alt="content-image"
      />
      <br />
      <input type="text" name="content" ref={text}></input>
      <input
        type="button"
        onClick={() => {
          upLoadFB();
          createBoardData();
        }}
        value={1 === 1 ? "게시글 작성" : "게시글 수정"}
      />
    </form>
  );
};

export default Write;
