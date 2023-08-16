import React, {useEffect, useState} from "react";
import './ItemManagement.css';
import List from './List';
import ItemPagination from "./ItemPagination";
import SearchBar from "../../components/Search/SearchBar";
import axios from "axios";
const ItemManagement = () => {
    const [items, setItems] = useState({});
    const [itemInfo, setItemInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [filters, setFilters] = useState({ searchDateType: 'all', searchSellStatus: '', searchBy: 'itemNm', searchQuery: '', page: 0, searchByUseYn: "Y"});

    const [dataNull, setDataNull] = useState(false);

    useEffect(() => {
        getItemList();
    }, []);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setFilters({ ...filters, page: 0 });
        getItemList();
    };

    const getItemList = async (newPage) => {
        try {
            let response = {};

            if(newPage) {
                response = await axios.get(`/admin/item/list/${newPage}`, {
                    params: filters
                });
            }
            if(!newPage) {
                response = await axios.get('/admin/item/list', {
                    params: filters
                });
            }

            const getData = response.data[0].content;

            if(getData.length !== 0) {
                setDataNull(true);
                setItems(response.data[0]);
                setItemInfo(getData);
                setCurrentPage(response.data[0].number)
            }

            if (getData.length === 0) {
                setDataNull(false);
            }

        } catch (e) {
            console.log('상품목록 가져오기 에러', e);
        }
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        getItemList(newPage);
    };

    return (
        <div className='item-management-container'>
            <div className='item-management-wrap'>
                {
                    dataNull ? (
                        <List itemInfo={itemInfo} setItemInfo={setItemInfo} />
                    ) : (
                        <div><h1>데이터가 없습니다.</h1></div>
                    )
                }
            </div>
            <div className='item-pagination'>
                <ItemPagination totalPages={items.totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
            </div>
            <div className='item-serach'>
                <SearchBar handleFilterChange={handleFilterChange} handleSearch={handleSearch}/>
            </div>
        </div>
    )
}

export default ItemManagement;