import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import './ItemDetail.css';
import axios from "axios";

const ItemDetail = () => {
    const {itemId} = useParams();
    const [count, setCount] = useState(1);
    const [payment, setPayment] = useState(0);

    const [productValue, setProductValue] = useState({
        itemSellStatus: 'SELL',
        itemNm: '',
        price: 0,
        stockNumber: 0,
        itemDetail: '',
        id: 0,
    });

    const getItemInfo = async () => {
        try {
            const response = await axios.get(`/admin/item/${itemId}`);
            console.log('서버에서 받아온 item 데이터', response);
            const data = response.data;
            setProductValue({
                itemSellStatus: data.itemSellStatus,
                itemNm: data.itemNm,
                price: data.price,
                stockNumber: data.stockNumber,
                itemDetail: data.itemDetail,
                id: data.id
            });

            setPayment(count * data.price);

        } catch (e) {
            console.log('상품 데이터 가져오기 에러', e);
        }
    }

    const orderHandle = async () => {
        console.log('itemId', itemId);
        console.log('count', count);
        const formData = {
            itemId: itemId,
            count : count,
        };
        try {
            const response = await axios.post('/order/new', formData);

            console.log('response', response);
            alert('주문 성공했습니다.');
        } catch (e) {
            console.log('주문 실패', e);
        }
    }

    const cartHandle = async () => {
        // console.log('itemId', itemId);
        // console.log('count', count);
        const formData = {
            itemId: itemId,
            count : count,
        };
        try {
            const response = await axios.post('/cart/new', formData);

            console.log('response', response);
            alert('장바구니에 담았습니다.');
        } catch (e) {
            console.log('장바구니 담기 실패', e);
        }
    }

    useEffect(() => {
        getItemInfo();
        console.log('itemId', itemId);
    }, []);

    useEffect(() => {
        setPayment(count * productValue.price);
        console.log('itemId', itemId);
    }, [count]);

    const handleChangeCount = (e) => {
        setCount(e.target.value);
    }
    return (
        <div className='detail-container'>
            <div className='detail-wrap'>
                <div className='product-atf'>
                    <div className='product-img-section'></div>
                    <div className='product-info'>
                        <div className='item-info'>
                            <span>
                                {
                                    productValue.itemSellStatus === 'SELL' ? '판매중' : '품절'
                                }
                            </span>
                            <h2>상품 이름</h2>
                            <span>상품 가격: {productValue.price}</span>
                            <label htmlFor="product-count">수량</label>
                            <input className='product-count' id='product-count' type="number" value={count}
                                   onChange={(e) => handleChangeCount(e)}/>
                        </div>
                        <div className='payment-info'>
                            <span>결제 금액</span>
                            <span>{payment} 원</span>
                            <div className='item-detail-button'>
                                <Button
                                    variant="success"
                                    type="button"
                                    onClick={cartHandle}
                                >
                                    장바구니 담기
                                </Button>
                                <Button
                                    variant="primary"
                                    type="button"
                                    onClick={orderHandle}
                                >
                                    주문하기
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='product-detail'>
                    <h2>상품 상세 설명</h2>
                    <p>{productValue.itemDetail}</p>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;