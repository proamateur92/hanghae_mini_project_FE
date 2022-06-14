import React, { useState } from 'react';
import { searchBoardDB } from "../redux/modules/boardSlice";
import { useDispatch } from "react-redux";
const Serch = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }
    const getInputData = () => {
        const content = search;
        let contents_obj = {
            content
        }
        return contents_obj
    }

    const upLoad = () => {
        const upLoad_obj = getInputData();
        if(!upLoad_obj) return;
        dispatch(searchBoardDB(upLoad_obj));
    }

    return (
        <form>
            <input type="text" value={search} placeholder="검색하세요." onChange={onChangeSearch}></input>
            <input type="button" value={"검색"} onClick={upLoad}/>
        </form>
    );
};

export default Serch;