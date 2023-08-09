import React from "react";
import './ItemManagement.css';
import List from './List';
import ItemPagination from "./ItemPagination";
import SearchBar from "./SearchBar";
const ItemManagement = () => {


    // const handleSearch = (searchTerm, category) => {
    //     // 검색 키워드와 선택된 카테고리로 검색을 수행합니다.
    //     console.log(`검색어: ${searchTerm}, 카테고리: ${category}`);
    // };

    return (
        <div className='item-management-container'>
            <div className='item-management-wrap'>
                <List />
            </div>
            <div className='item-pagination'>
                <ItemPagination />
            </div>
            <div className='item-serach'>
                <SearchBar />
            </div>
        </div>
    )
}

export default ItemManagement;