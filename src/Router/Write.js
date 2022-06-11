import React from "react";
import moment from "moment";
import { useState } from "react";

//Router
import { Link } from "react-router-dom";
//styled
import styled from "styled-components";
//redux
import { useDispatch, useSelector } from "react-redux";
import { createBoard } from "../redux/modules/boardSlice";
import { loadBoard } from "../redux/modules/boardSlice";
//firebase
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../shared/firebase";
//axios
import axios from "axios";

const Write = () => {
  //삭제할거
  // // LOAD;
  // React.useEffect(() => {
  //   dispatch(LoadBoardDB());
  // }, []);
  // const topics = useSelector((list) => list.board); //
  // console.log("aa", topics);

  const dispatch = useDispatch();
  const text = React.useRef(null);
  const file_link_ref = React.useRef([]);
  const [img, setImg] = React.useState("");
  const [imageSrc, setImageSrc] = React.useState("");
  // let imgMultiple = { ...img };
  // console.log(img[1]);
  // console.log(imgMultiple);
  //사진 미리보기
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  //서버에 넘겨줄 데이터 목록
  const getInputData = () => {
    const content = text.current?.value;
    const imageUrl = file_link_ref.current;
    console.log(imageUrl);
    if (!content) {
      alert("글 내용을 입력해주세요.");
      return false;
    }
    const contents_obj = {
      content: content,
      imageURL: imageUrl,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      likeCount: 0,
      commentCount: 0,
    };
    // console.log(imageURL);
    return contents_obj;
  };

  //데이터를 스토리지에 올림
  const upLoadFB = async () => {
    for (let i = 0; i < img.length; i++) {
      const uploded_file = await uploadBytes(
        ref(storage, `images/${img[i].name}`), //경로
        img[i] //어떤파일 올릴지
      );
      const file_url = await getDownloadURL(uploded_file.ref);
      //링크를 담는다.
      file_link_ref.current.push(file_url);
    }
    //데이터를 리덕스에 옮김
    const contents_obj = getInputData();
    if (!contents_obj) return;
    const new_contents_obj = {
      ...contents_obj,
    };
    await dispatch(CreateBoardDB({ ...new_contents_obj }));
  };

  //미들웨어
  const CreateBoardDB = (contents_obj) => {
    return async function (dispatch) {
      await axios
        .post("http://localhost:5000/boards", contents_obj)
        .then((response) => {
          // console.log(response);
        });
      dispatch(createBoard(contents_obj));
    };
  };

  // const LoadBoardDB = () => {
  //   return async function (dispatch) {
  //     await axios.get("http://localhost:5000/boards").then((response) => {
  //       console.log(response.data);
  //       dispatch(loadBoard(response.data));
  //     }); //혹시라도 데이터를 더 넣어야하거나 헤더 컨피그 설정 추가하고싶으면 두번째 인자에 넣음
  //   };
  // };

  return (
    <WriteWrap>
      <FormWrap>
        <Title>{1 === 1 ? "글 쓰기" : "글 수정"}</Title>

        <div>
          <label htmlFor="file">
            <div>이미지 첨부</div>
          </label>
          <input
            type="file"
            multiple
            id="file"
            accept="image/jpg, image/png, image/jpeg"
            onChange={(e) => {
              // encodeFileToBase64(e.target.files);
              setImg(e.target.files);
            }}
          />
        </div>
        <br />
        <Img
          src={
            imageSrc
              ? imageSrc
              : "https://t1.daumcdn.net/cfile/blog/225FFE4451C3F7C219"
          }
          alt="content-image"
        />
        <br />
        <TextInput
          type="text"
          name="content"
          ref={text}
          placeholder="글 내용을 입력해주세요."
        ></TextInput>
        <InputButtonWrap>
          <InputLink to="/">뒤로가기</InputLink>
          <InputButton
            type="button"
            onClick={() => {
              upLoadFB();
              // callSomethingAxios();
            }}
            value={1 === 1 ? "게시글 작성" : "게시글 수정"}
          />
        </InputButtonWrap>
      </FormWrap>
    </WriteWrap>
  );
};

export default Write;

//Wrap
const WriteWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin: 0 auto;
  width: 50%;
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
const FormWrap = styled.form`
  text-align: center;
`;
//font
const Title = styled.h1`
  color: #c61b43;
`;

//input
const TextInput = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid #d3d2d2;
  border-radius: 6px;
`;
const Img = styled.img`
  width: 500px;
`;

//버튼
const InputButtonWrap = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 5px;
  border: 1px solid #d3d2d2;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const InputLink = styled(Link)`
  color: white;
  padding: 10px;
  border-radius: 6px;
  margin-left: 16px;
  background-color: #e8e7e7;
  text-decoration: none;
`;
const InputButton = styled.input`
  border: none;
  color: white;
  padding: 10px;
  border-radius: 6px;
  margin-right: 16px;
  background-color: #ff586e;
`;
