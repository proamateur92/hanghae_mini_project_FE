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

    const onChangeSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }
    const getInputData = () => {
      if (search === "") {
        window.alert("검색어를 입력하세요!");
        return;
      }

      const content = search;
      let contents_obj = {
        value: content,
      };
      return contents_obj;
    };

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
            placeholder="검색 하세요."
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
`;

const SearchText = styled.input`
  width:100%;
  box-sizing: border-box;
  height:50px;
  border:none;
  border:1px solid #7d7d7d;
  /* padding: 0; */
  margin:0;
  border-radius:5px 0 0 5px;
  padding-left:20px;
`;
const SearchBtn = styled.button`
  background-color:transparent;
  cursor:pointer;
  border:1px solid #7d7d7d;
  border-radius:0 5px 5px 0;
  height:50px;
  width:50px;
  color:#7d7d7d;
  
`;