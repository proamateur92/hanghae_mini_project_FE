import React, { useEffect } from "react";
import moment from "moment";
import { useState } from "react";

//Router
import { Link, useNavigate, useParams } from "react-router-dom";
//styled
import styled from "styled-components";
//redux
import { useDispatch, useSelector } from "react-redux";
import { createBoardDB, updateBoardDB } from "../redux/modules/boardSlice";
import { loadBoard } from "../redux/modules/boardSlice";
//firebase
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../shared/firebase";
import { getStorage,  updateMetadata } from "firebase/storage";
//Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
//uuid
import { v4 as uuidv4 } from 'uuid';
//instance
import instance from "../shared/axios";
//cookie
import { getCookie } from '../shared/cookie';
const Write = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const board = useSelector((list) => list.board);
  //Parmas
  const { id } = useParams();
  //edit_mode
  const is_edit = id ? true : false;
  const _post = is_edit ? board.list.find((p) => p._id === id)  : null; // board list articleId랑 params 아이디랑 비교해서 일치하는 배열

  //Ref
  const text = React.useRef(null);
  const file_link_ref = React.useRef(is_edit?_post?.imageURL:[]);
  const [imageFB, setImageFB] = React.useState("");
  const [showImages, setShowImages] = useState(is_edit?_post?.imageURL:[]);
  
  //cokie
  const user_name = localStorage.getItem("nickname")

  useEffect(() => {
    if (is_edit && !_post) {
      window.alert("포스트 정보가 없어요! ㅜㅜ");
      navigate("/")
      return;
    }    
    
  }, []);

  
  
  
  //서버에 넘겨줄 데이터 목록
  const getInputData = () => {
    const content = text.current?.value;
    const imageUrl = file_link_ref.current;
    const CreateAt = moment().format("YYYY-MM-DD HH:mm:ss");
    const updateAt = moment().format("YYYY-MM-DD HH:mm:ss");
    const userName = user_name
    console.log(imageUrl);

    if (is_edit) {
      let contents_obj = {
        updateAt,
        CreateAt:_post?.CreateAt,
        _id:_post?._id,
        nickname: userName,
        content: content,
        imageURL: imageUrl,
        __v: 0,
      };
      return contents_obj
    } else {
      let contents_obj = {
        CreateAt,
        updateAt,
        _id:_post?._id,
        nickname: userName,
        content: content,
        imageURL: imageUrl,
        __v: 0,
      };
      return contents_obj
    }
    // return contents_obj;
  };

  //데이터를 스토리지에 올림
  const upLoadFB = async () => {
    for (let i = 0; i < imageFB.length; i++) {
      const uploded_file = await uploadBytes(
        ref(storage, `images/${imageFB[i].name}`), //경로
        imageFB[i] //어떤파일 올릴지
      );
      console.log('업로드',uploded_file.ref)
      const file_url = await getDownloadURL(uploded_file.ref);
      //링크를 담는다.
      file_link_ref.current = [...file_link_ref.current, file_url];
    }

    //데이터를 미들웨어에 옮김
    const contents_obj = getInputData();
    if (!contents_obj) return;
    const new_contents_obj = {
      ...contents_obj,
      id
    };  
    if (!contents_obj.content) {
      alert("글 내용을 입력해주세요.");
      return false;
    }

    if(is_edit){
      //미들웨어로 디스패치
      await dispatch(updateBoardDB({ ...new_contents_obj }, id));
    } else {
      await dispatch(createBoardDB({ ...new_contents_obj }));
    }
    await navigate(-1);
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
    let del = file_link_ref.current.filter((l, index) => l !== file_link_ref.current[id]);
    file_link_ref.current = [...del];
  };
  
  //사진 슬라이드
  const settings = {
    dots: true, //carousel 밑에 지정 콘텐츠로 바로 이동할 수 있는 버튼을 뜻한다. flase 할시 사라진다.
    infinite: true, //콘텐츠 끝까지 갔을 때 다음 콘텐츠를 처음 콘텐츠로 가져와 반복한다.
    speed: 500,  //콘텐츠를 넘어갈 때 속도이다. 단위 (ms)이다. 1000ms = 1s
    slidesToShow: 1, //한 화면에 보이는 콘텐츠 개수를 말한다.
    slidesToScroll: 1 //한 번에 넘어가는 콘텐츠 수이다. 2로 정하면 2개씩 넘어간다.
  };

  return (
    <WriteWrap>
      <FormWrap>
        <Title>{is_edit ? "Update" : "Write"}</Title>
        <ImgInputWrap>
          <label htmlFor="file" onChange={handleAddImages}>
            <ImageBtn>이미지 첨부</ImageBtn>
            {/* <p>3장까지만 첨부 가능</p> */}
            <input
              type="file"
              multiple
              id="file"
              accept="image/jpg, image/png, image/jpeg"
              onChange={(e) => {
                setImageFB(e.target.files);
              }}
            />
          </label>
          <Slider {...settings}>
            { showImages?.length === 0  ?  <Temporary>임시 이미지</Temporary> : showImages?.length === undefined ? 
            null : showImages.map((image, idx) => (
              <ImgWrap key={idx}>
                {/* <img src={image?image:"https://t1.daumcdn.net/cfile/blog/225FFE4451C3F7C219"} alt={`${image}-${id}`} /> */}
                <Img image={image}>{`${image}-${idx}`}</Img> 
                <ImgDelBtn
                  icon={faTrashCan}
                  size="lg"
                  onClick={() => handleDeleteImage(idx)}
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
          defaultValue={is_edit? _post?.content : null}
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
  margin-top:5vh;
  width: 50%;
  /* font-size:20px; */
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
/* border: 1px solid #d3d2d2; */
/* border-top:1px solid #d3d2d2; */
/* border-bottom:1px solid #d3d2d2; ; */
/* border-radius:4px; */
padding:0 30px ; 
width:500px;
`
const FormWrap = styled.form`
  text-align: center;
  border-radius:8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;
//font
const Title = styled.h1`
  color: #5a7197;
  font-size:40px;
  width:90%;
  border-bottom:1px solid #d3d2d2; ;
  padding:20px 0;
  margin:0 auto;
`;

//input
const TextInput = styled.textarea`
  box-sizing:border-box;
  width: 90%;
  height: 200px;
  border: 1px solid #d3d2d2;
  border-radius: 6px;
  font-size:26px;
  padding:20px
`;
const Img = styled.div`
  width:500px;
  height:300px;
  border: 1px solid #d3d2d2;
  background-image:url(${(props) => (props.image)}) ;
  background-position:center;
  background-size:contain;
  background-repeat:no-repeat ;
  text-indent:-9999px;
`;
const Temporary = styled.div`
  width:500px;
  height:300px;
  text-indent:-9999px;
  /* border: 1px solid #d3d2d2; */
  background-image:url("https://cdn.icon-icons.com/icons2/2436/PNG/512/photo_image_icon_147448.png");
  background-position:center;
  background-size:contain;
  background-repeat: no-repeat;
`
const ImgWrap = styled.div`
position: relative;
background-color:black;
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
//사진 첨부 버튼
const ImageBtn = styled.div`
padding:10px 20px;
border-radius:4px;
border:1px solid #e8e4da;
margin: 20px 0;
`

//버튼
const InputButtonWrap = styled.div`
  width: 100%;
  height: 60px;
  /* border-radius: 6px; */
  border: 1px solid #d3d2d2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top:20px;
  border-radius:0 0 8px 8px;
`;
const InputLink = styled(Link)`
  color: white;
  padding: 10px;
  border-radius: 6px;
  margin-left: 16px;
  background-color: #e8e7e7;
  font-size:20px;
  text-decoration: none;
  &:hover {
    color:#5a7197;
  }
`;
const InputButton = styled.input`
  border: none;
  color: white;
  padding: 10px;
  border-radius: 6px;
  margin-right: 16px;
  font-size:20px;
  background-color: #5a7197;
  transition: background-color 0.3s;
  transition: color 0.3s;
  &:hover {
    background-color:rgba(90, 113, 151, 0.2);
    color:#5a7197
  }
`;
