import React, {useEffect, useState} from "react";
import './ItemManagement.css';
import List from './List';
import ItemPagination from "./ItemPagination";
import SearchBar from "./SearchBar";
import axios from "axios";
const ItemManagement = () => {
    const [items, setItems] = useState({});
    const [itemInfo, setItemInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [filters, setFilters] = useState({ searchDateType: 'all', searchSellStatus: '', searchBy: '', searchQuery: '', page: 0 });

    useEffect(() => {
        getItemList();
    }, []);

    useEffect(() => {
        loadData();
    }, [filters]);

    const loadData = async () => {
        console.log('filters', filters);
        try {
            const response = await axios.get(`/admin/items/${currentPage}/${filters.searchQuery}`, {
                params: {
                    searchDateType: filters.searchDateType,
                    searchBy: filters.searchBy,
                }
            });
            const { data } = response;
            console.log('data', data);
        } catch (error) {
            console.log('Error loading data:', error);
            setItems([]);
        }
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setFilters({ ...filters, page: 0 });
    };

    const getItemList = async (newPage) => {
        try {
            let response = {};
            if(newPage) {
                response = await axios.get(`/admin/items/${newPage}`, {
                    params: {
                        searchDateType: "all",
                        searchBy: "",
                    }
                });
            }
            if(!newPage) {
                response = await axios.get('/admin/item/list', {
                    params: {
                        searchDateType: "all",
                        searchBy: "",
                    }
                });
            }
            console.log('받아온 데이터', response);
            console.log('item 데이터', response.data[0]);
            const getData = response.data[0].content;
            setItems(response.data[0]);
            setItemInfo(getData);
            setCurrentPage(response.data[0].number)
        } catch (e) {
            console.log('상품목록 가져오기 에러', e);
        }
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        getItemList(newPage);
        // getItemPageList(newPage);
    };

    return (
        <div className='item-management-container'>
            <div className='item-management-wrap'>
                <List itemInfo={itemInfo} setItemInfo={setItemInfo} />
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