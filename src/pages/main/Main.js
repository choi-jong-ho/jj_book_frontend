import React, {useContext, useEffect, useState} from 'react';
// import MainTop from "./mainTop";
import './Main.css';
import MainProduct from "./MainProduct";
import axios from "axios";
import SearchBar from "../../components/Search/SearchBar";
import ItemPagination from "../../components/Pagination/ItemPagination";
import AutoImgSlider from "../../components/silder/AutoImgSlider";
import AuthContext from "../../store/AuthContext";

const Main = () => {
    const {state} = useContext(AuthContext);

    const [items, setItems] = useState({});
    const [itemInfo, setItemInfo] = useState([]);
    const [filters, setFilters] = useState({ searchDateType: 'all', searchSellStatus: '', searchBy: 'itemNm', searchQuery: '', page: 0, searchByUseYn: "Y"});
    const [currentPage, setCurrentPage] = useState(0);
    const [imageUrl, setImageUrl] = useState([]);

    useEffect(() => {
        getItemList();
    }, []);

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
            console.log('response', response);
            const getData = response.data[0].content;
            setItems(response.data[0]);
            setItemInfo(getData);

            const itemIds = getData.map((content) => content.id);
            getItemsImg(itemIds);
        } catch (e) {
            console.log('상품목록 가져오기 에러', e);
        }
    }

    const getItemsImg = async (itemIds) => {
        let imgUrl = [];
        for (const ids of itemIds) {
            try {
                const response = await axios.get(`/admin/item/${ids}`);
                console.log('서버에서 받아온 item 데이터', response);
                const data = response.data;
                imgUrl.push(data.itemImgDtoList[0].imgUrl);
            } catch(e) {
                console.log('아이템 사진 url 가져오기 실패', e);
            }
        }
        setImageUrl(imgUrl);
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setFilters({ ...filters, page: 0 });
        getItemList();
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        getItemList(newPage);
    };


    return (
        <div className='main-container'>
            <div className='main-wrap'>
                <div className='main-top'>
                    <AutoImgSlider />
                </div>
                <div className='main-center'>
                    <SearchBar handleFilterChange={handleFilterChange} handleSearch={handleSearch}/>
                    <MainProduct itemInfo={itemInfo} imageUrl={imageUrl}/>
                    <ItemPagination totalPages={items.totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
                </div>
                <div className='main-bottom'></div>
            </div>
        </div>
    )
}

export default Main;