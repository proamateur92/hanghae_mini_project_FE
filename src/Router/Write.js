import React, { useEffect } from "react";
import moment from "moment";
import { useState } from "react";

//Router
import { Link, useNavigate, useParams } from "react-router-dom";
//styled
import styled from "styled-components";
//redux
import { useDispatch, useSelector } from "react-redux";
import { createBoard, updateBoard } from "../redux/modules/boardSlice";
import { loadBoard } from "../redux/modules/boardSlice";
//firebase
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../shared/firebase";
//axios
import axios from "axios";
//Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";



const Write = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const board = useSelector((list) => list.board);
  //Parmas
  const { id } = useParams();
  //edit_mode
  const is_edit = id ? true : false;
  const _post = is_edit ? board.list.find((p) => p.id  === parseInt(id))  : null;
  //Ref
  const text = React.useRef(null);
  //img_Ref
  const file_link_ref = React.useRef([]);
  const [img, setImg] = React.useState("");
  const [showImages, setShowImages] = useState(is_edit?[...board.list[id-1]?.imageURL]:[]);

  useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요! ㅜㅜ");
      window.alert("포스트 정보가 없어요! ㅜㅜ");
      navigate("/")
      return;
    }
  }, []);

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
      id
    };
    if(is_edit){
      await dispatch(updateBoardDB({ ...new_contents_obj }, id));
    } else {
      await dispatch(createBoardDB({ ...new_contents_obj }));
    }
  };

  //미들웨어
  //생성
  const createBoardDB = (contents_obj) => {
    return async function (dispatch) {
      await axios
        .post("http://localhost:5000/boards", contents_obj)
        .then((response) => {
        });
      dispatch(createBoard(contents_obj));
      navigate(-1);
    };
  };
  //수정
  const updateBoardDB = (contents_obj, id) => {
  return async function (dispatch) {
    await axios
        // .post("http://localhost:5000/boards", contents_obj)
        // .then((response) => {
          // console.log("aa",response)
        // });
    dispatch(updateBoard(contents_obj, id));
  };
};

  //사진 여러장 넣기
  const handleAddImages = (e) => {
    const imageLists = e.target.files;
    let imageUrlLists = [...showImages];
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }
    //3장 제한
    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0, 3);
    }
    setShowImages(imageUrlLists);
    
  };
  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((l, index) => index !== id));
    console.log("dsa",showImages, id)
  };
  //사진 슬라이드
  const settings = {
    dots: true, //carousel 밑에 지정 콘텐츠로 바로 이동할 수 있는 버튼을 뜻한다. flase 할시 사라진다.
    infinite: true, //콘텐츠 끝까지 갔을 때 다음 콘텐츠를 처음 콘텐츠로 가져와 반복한다.
    speed: 500,  //콘텐츠를 넘어갈 때 속도이다. 단위 (ms)이다. 1000ms = 1s
    slidesToShow: 1, //한 화면에 보이는 콘텐츠 개수를 말한다.
    slidesToScroll: 1 //한 번에 넘어가는 콘텐츠 수이다. 2로 정하면 2개씩 넘어간다.
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
        <Title>{is_edit ? "글 수정" : "글 쓰기"}</Title>
        <ImgInputWrap>
          <label htmlFor="file" onChange={handleAddImages}>
            <div>이미지 첨부</div>
            <input
              type="file"
              multiple
              id="file"
              accept="image/jpg, image/png, image/jpeg"
              onChange={(e) => {
                setImg(e.target.files);
              }}
            />
          </label>
          <Slider {...settings}>
            {showImages.length === 0 ? <Temporary>임시 이미지</Temporary> : showImages.map((image, id) => (
              <ImgWrap key={id}>
                {/* <img src={image?image:"https://t1.daumcdn.net/cfile/blog/225FFE4451C3F7C219"} alt={`${image}-${id}`} /> */}
                <Img image={image}>{`${image}-${id}`}</Img>
                <ImgDelBtn
                  icon={faTrashCan}
                  size="lg"
                  onClick={() => handleDeleteImage(id)}
                />
              </ImgWrap>
            ))}
            
          </Slider>
        </ImgInputWrap>
        <br />
        <TextInput
          type="text"
          name="content"
          ref={text}
          defaultValue={is_edit? board.list[id - 1]?.content : null}
          placeholder="글 내용을 입력해주세요."
        ></TextInput>
        <InputButtonWrap>
          <InputLink to="/">뒤로가기</InputLink>
          {is_edit ? (
            <InputButton
              type="button"
              onClick={() => {
                upLoadFB();
              }}
              value="게시글 수정" //수정 코드 만들어야함.
            />
          ) : (
            <InputButton
              type="button"
              onClick={() => {
                upLoadFB();
              }}
              value="게시글 작성"
            />
          )}
        </InputButtonWrap>
      </FormWrap>
    </WriteWrap>
  );
};

export default Write;

//Wrap
const WriteWrap = styled.div`
  display: flex;
  box-sizing: border-box;
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
const ImgInputWrap = styled.div`
border: 1px solid #d3d2d2;
border-radius:4px;
padding:30px;
width:500px;
`
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
const Img = styled.div`
  width:500px;
  height:300px;
  border: 1px solid #d3d2d2;
  background-image:url(${(props) => (props.image)}) ;
  background-position:center;
  text-indent:-9999px;
`;
const Temporary = styled.div`
  width:500px;
  height:300px;
  text-indent:-9999px;
  border: 1px solid #d3d2d2;
  background-image:url("https://i.pinimg.com/564x/65/03/f2/6503f27ab49db51a7224cd20a9d438f4.jpg");
  background-position:center;
`
const ImgWrap = styled.div`
position: relative;
`;
const ImgDelBtn = styled(FontAwesomeIcon)`
position:absolute;
right:0;
bottom:0;
background-color:rgba(0,0,0,0.5);
padding:10px;
border-radius:4px 0 0 0;
color:white;
transition: background-color 0.1s, transform 3s;
&:hover {
  color:black;
  background-color:rgba(255,255,255,0.5);
  }
`;

//버튼
const InputButtonWrap = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 6px;
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
