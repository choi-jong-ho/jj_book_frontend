import React, {useEffect, useState} from 'react';
// import MainTop from "./mainTop";
import ImgSlider from "../../components/silder/ImgSlider";
import './Main.css';
import MainProduct from "./MainProduct";
import axios from "axios";

const Main = () => {
    const [items, setItems] = useState({});
    const [itemInfo, setItemInfo] = useState([]);

    useEffect(() => {
        getItemList();
    }, []);

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
            console.log('item 데이터', response.data[0]);
            const getData = response.data[0].content;
            console.log('getData', getData);
            setItems(response.data[0]);
            setItemInfo(getData);
        } catch (e) {
            console.log('상품목록 가져오기 에러', e);
        }
    }

    return (
        <div className='main-container'>
            <div className='main-wrap'>
                {/*<ImgSlider />*/}
                {/*<MainTop/>*/}
                <section className='top-section'><h2>탑</h2></section>
                <MainProduct itemInfo={itemInfo}/>
                <section className='bottom-section'><h2>바텀</h2></section>
            </div>
        </div>
    )
}

export default Main;