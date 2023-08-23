import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import './ItemDetail.css';
import axios from "axios";
import ReviewWrite from "../Review/ReviewWrite";

const ItemDetail = () => {
    const {itemId} = useParams();
    const navigate = useNavigate();
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
            console.log('서버에서 받아온 detail', response);
            const data = response.data;
            setProductValue({
                id: data.id,
                itemSellStatus: data.itemSellStatus,
                itemNm: data.itemNm,
                price: data.price,
                stockNumber: data.stockNumber,
                itemDetail: data.itemDetail,
                imgData: data.itemImgDtoList[0]
            });

            setPayment(count * data.price);

            console.log('data.itemImgDtoList[0]', data.itemImgDtoList[0]);

        } catch (e) {
            console.log('상품 데이터 가져오기 에러', e);
        }
    }

    const orderHandle = async () => {
        const formData = {
            itemId: itemId,
            count: count,
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
        const formData = {
            itemId: itemId,
            count: count
        };

        try {
            const response = await axios.post('/cart/new', formData, {
                headers: {
                    "Content-Type": "Application/json"
                }
            });
            checkCart();
        } catch (e) {
            console.log('장바구니 담기 실패', e);
        }
    }

    const checkCart = () => {
        if (window.confirm("장바구니로 이동하시겠습니까?")) {
            navigate('/mypage/main');
        } else {
            alert('장바구니에 성공적으로 담겼습니다.');
        }
    };


    useEffect(() => {
        getItemInfo();
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
                    <div className='product-img-section'>
                        {/*<img src={productValue.imgData.imgUrl} alt='상품 이미지'/>*/}
                    </div>
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
                {/*임시 공간*/}
                <div>
                    <ReviewWrite productValue={productValue}/>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;