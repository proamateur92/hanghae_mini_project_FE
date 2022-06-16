import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { searchBoardDB } from "../redux/modules/boardSlice";
import { useDispatch } from "react-redux";
import styled from 'styled-components';

import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faPencil, faSearch, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Serch = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");


    // 엔터 누를때 search로 데이터 보냄
    const onChangeSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    //검색한 데이터를 변수에 담음
    const getInputData = () => {
      //빈칸일시 return
      if (search === "") {
        window.alert("검색어를 입력하세요!");
        return;
      }
      //검색한 value값
      const content = search;
      let contents_obj = {
        value: content,
      };
      return contents_obj;
    };

    //upLoad시 리듀서에 보냄
    const upLoad = (e) => {
        e.preventDefault();
        const upLoad_obj = getInputData();
        if(!upLoad_obj) return;
        dispatch(searchBoardDB(upLoad_obj));
    }

    return (
      <>
        <Container onSubmit={(e) => (
            upLoad(e)
        )}>
          <SearchText
            type="text"
            value={search}
            placeholder="Search"
            onChange={onChangeSearch}
            // onkeypress={()=>{
              // if( event.keyCode == 13 ) {
                // upLoad()
              // }
            // }}
          />  
          <SearchBtn><FontAwesomeIcon icon={faSearch} size='lg' /></SearchBtn>
        </Container>
        
      </>
    );
};

export default Serch;

const Container = styled.form`
  display:flex;
  justify-content:center;
  margin-top:120px;
  margin-bottom:80px;
`;

const SearchText = styled.input`
  width:60%;
  box-sizing: border-box;
  height:50px;
  border:none;
  box-shadow: 2px 1px 5px gray;
  margin:0;
  border-radius:20px;
  padding-left:20px;
  margin-right:20px;
  font-size:20px;
`;
const SearchBtn = styled.button`
  background-color:transparent;
  cursor:pointer;
  border:none;
  border-radius:50%;
  box-shadow: 2px 1px 5px gray;
  height:50px;
  width:50px;
  color:#7d7d7d;
  transition: 0.4s;
  &:hover {
    font-size:18px;
  }
`;