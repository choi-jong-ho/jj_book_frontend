import React, {useContext, useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import './ItemDetail.css';
import axios from "axios";
import ItemReviewList from "./ItemReviewList";
import AuthContext from "../../store/AuthContext";

const ItemDetail = () => {
    const { state } = useContext(AuthContext);
    const {itemId} = useParams();
    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [payment, setPayment] = useState(0);
    const [productValue, setProductValue] = useState({
        id: 0, itemSellStatus: 'SELL', itemNm: '', price: 0, stockNumber: 0, itemDetail: '', imgData: {},
    });

    const getItemInfo = async () => {
        try {
            const response = await axios.get(`/item/${itemId}`, {
                headers: {
                    "X-AUTH-TOKEN" : state.token,
                }
            });
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

        } catch (e) {
            console.log('상품 데이터 가져오기 에러', e);
        }
    }
    const orderHandle = async () => {
        const formData = {
            itemId: itemId, count: count,
        };

        try {
            const response = await axios.post('/order/new', formData, {
                headers: {
                    "Content-Type": "Application/json",
                    "X-AUTH-TOKEN" : state.token,
                }
            });

            console.log('response', response);
            alert('주문 성공했습니다.');
        } catch (e) {
            console.log('주문 실패', e);
        }
    }

    const cartHandle = async () => {
        const formData = {
            itemId: itemId, count: count
        };

        try {
            await axios.post('/cart/new', formData, {
                headers: {
                    "Content-Type": "Application/json",
                    "X-AUTH-TOKEN" : state.token,
                }
            });
            alert('장바구니에 성공적으로 담겼습니다.');
            checkCart();
        } catch (e) {
            console.log('장바구니 담기 실패', e);
        }
    }

    const checkCart = () => {
        if (window.confirm("장바구니로 이동하시겠습니까?")) navigate('/mypage/main');
    };

    useEffect(() => {
        getItemInfo();
        // reviewAll();
    }, []);


    useEffect(() => {
        setPayment(count * productValue.price);
    }, [count]);

    const handleChangeCount = (e) => {
        setCount(e.target.value);
    }
    return (
        <div className='detail-container'>
            <div className='detail-wrap'>
                <div className='product-atf'>
                    <div className='product-img-section'>
                        <img className='detail-img' src={productValue.imgData.imgUrl} alt='상품 이미지'/>
                    </div>
                    <div className='product-info'>
                        <div className='item-info'>
                            <div className='product-status'>
                                {productValue.itemSellStatus === 'SELL' ? <div className='cell'>판매중</div> :
                                    <div className='out'>품절</div>}
                            </div>
                            <h2>상품 이름</h2>
                            <span>상품 가격: {productValue.price} 원</span>
                            <div className='product-count-wrap'>
                                <label htmlFor="product-count">수량</label>
                                <input id='product-count' type="number" value={count} min="1"
                                       onChange={(e) => handleChangeCount(e)}/>
                            </div>
                        </div>
                        <div className='payment-info'>
                            <span className='item-detail-span'>총 상품금액:</span>
                            <span className='total-payment'>{payment}</span>
                            <span className='item-detail-span'>원</span>
                        </div>
                        <div className='item-detail-button'>
                            <Button
                                className='product-cart-button'
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
                <div className='product-detail'>
                    <div className='product-detail-sub'>
                        <div className='product-info-title'>
                            <h2>책 소개</h2>
                        </div>
                        <div className='product-info-detail'>
                            책의 저자, 줄거리, 기록 등등의 내용
                        </div>
                    </div>
                    <div className='product-detail-sub'>
                        <div className='product-info-title'>
                            <h2>상세 내용</h2>
                        </div>
                        <div className='product-info-detail'>
                            {productValue.itemDetail}
                        </div>
                    </div>
                </div>
                <ItemReviewList/>
            </div>
        </div>
    )
}

export default ItemDetail;