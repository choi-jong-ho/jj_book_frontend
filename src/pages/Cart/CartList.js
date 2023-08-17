import React, {useEffect, useState} from "react";
import axios from "axios";
import './CartList.css';
import {Button} from "react-bootstrap";

const CartList = () => {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        getCartList();
    }, []);

    const getCartList = async () => {
        try {
            const response = await axios.get(`/cart/list`);
            console.log('response', response);
            const data = response.data;
            console.log('data[0].content[0]', data[0].content[0]);
            console.log('data[0].content[0]', typeof data[0].content[0]);
            setCartData(data[0].content[0].cartItemDtoList);
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
    return (
        <div className='order-list-container'>
            <h2>장바구니 목록</h2>
            {
                cartData ? (
                    cartData.map(item => (
                            <div className='order-list-wrap'>
                                <div className='order-item-header'>
                                </div>
                                <div className='order-item-main'>
                                    <div className='order-item-img'>
                                        <img className='order-item-img' src={item.imgUrl}/>
                                    </div>
                                    <div className='order-item-info'>
                                        <h3>{item.itemNm}</h3>
                                        <span>수량: {item.count}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    )

                ) : (<div>구매한 이력이 없습니다.</div>)
            }
        </div>
    )
}

export default CartList;