import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import './Cart.css';
import {Button} from "react-bootstrap";
import ItemPagination from "../../components/Pagination/ItemPagination";
import CartList from "./CartList";

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [cartObj, setCartObj] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        getCartList();
    }, [])
    const getCartList = async (newPage) => {
        try {
            let response = {};

            if(newPage) {
                response = await axios.get(`/cart/list/${newPage}`);
            }
            if(!newPage) {
                response = await axios.get('/cart/list');
            }

            console.log('response', response);
            const data = response.data;
            setCartObj(data[0]);
            setCartData(data[0].content);
        } catch (e) {
            console.log('장바구니 목록 조회 오류', e);
        }
    }

    const cartCancel = async (orderId) => {
        try {
            const response = await axios.get(`/cart/list`);
        } catch (e) {
            console.log('장바구니 페이지네이션 불러오기 실패', e);
        }
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        getCartList(newPage);
    };
    return (
        <div className='order-list-container'>
            <h2>장바구니 목록</h2>
            {
                cartData !== null ? (
                    <Fragment>
                        <CartList cartData={cartData}/>
                        <ItemPagination totalPages={cartObj.totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
                    </Fragment>
                ) : (
                    <div className='cart-list-null'>장바구니 이력이 없습니다.</div>
                )
            }
        </div>
    )
}

export default Cart;