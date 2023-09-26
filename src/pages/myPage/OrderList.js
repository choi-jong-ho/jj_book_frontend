import React, {Fragment, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import './OrderList.css';
import {Button, Table} from "react-bootstrap";
import ItemPagination from "../../components/Pagination/ItemPagination";

const OrderList = () => {
    const getToken = localStorage.getItem('login-token');
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [orderObj, setOrderObj] = useState([]);

    useEffect(() => {
        getOrderList();
    }, []);

    const getOrderList = async (newPage) => {
        try {
            let response = {};

            if (newPage) {
                response = await axios.get(`/order/list/${newPage}`, {
                    headers: {
                        "Content-Type": "Application/json",
                        "X-AUTH-TOKEN" : getToken,
                    }
                });
            }
            if (!newPage) {
                response = await axios.get('/order/list', {
                    headers: {
                        "Content-Type": "Application/json",
                        "X-AUTH-TOKEN" : getToken,
                    }
                });
            }

            const data = response.data;

            setOrderObj(data[0]);
            setOrderData(data[0].content);
        } catch (e) {
            console.log('구매 목록 조회 오류', e);
        }
    }

    const orderCancel = async (orderId) => {
        try {
            await axios.post(`/order/${orderId}/cancel`, {
                headers: {
                    "Content-Type": "Application/json",
                    "X-AUTH-TOKEN" : getToken,
                }
            });
            alert('주문 취소 완료되었습니다.');
        } catch (e) {
            console.log('주문 취소 실패', e);
        }
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        getOrderList(newPage);
    };

    const goToReviewWrite = (itemId) => {
        navigate(`/mypage/review/${itemId}`, {state: {id : itemId}});
    }

    return (
        <div className='order-list-container'>
            <div className='order-list-title'>
                <h2>구매이력 조회</h2>
            </div>
            {
                orderData ? (
                    <Table bordered hover>
                        <thead>
                        <tr>
                            <td className='cart-list-td'>상품 이미지</td>
                            <td className='cart-list-td'>상품 이름</td>
                            <td className='cart-list-td'>상품 수량/가격</td>
                            <td className='cart-list-td'>기능</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            orderData.map(orderItem => (
                                <tr key={orderItem.orderId}>
                                    <td className='order-list-td'>
                                        <div>
                                            <img className='order-item-img' src={orderItem.orderItemDtoList[0].imgUrl}
                                                 alt='주문한 상품 이미지'/>
                                        </div>
                                    </td>
                                    <td className='order-list-td'>
                                        <div className='order-item-info'>
                                            <h4>{orderItem.orderItemDtoList[0].itemNm}</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='order-item-price'>
                                            <span>{orderItem.orderItemDtoList[0].count}/{orderItem.orderItemDtoList[0].orderPrice}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='order-item-func'>
                                            {
                                                orderItem.orderStatus === 'ORDER' ? (
                                                    <Fragment>
                                                        <Button
                                                            className='order-list-button'
                                                            variant="danger"
                                                            onClick={() => orderCancel(orderItem.orderId)}
                                                        >
                                                            주문 취소
                                                        </Button>
                                                        <Button
                                                            variant="success"
                                                            onClick={() => goToReviewWrite(orderItem.orderItemDtoList[0].itemId)}
                                                        >
                                                            리뷰 쓰기
                                                        </Button>
                                                    </Fragment>
                                                ) : (
                                                    <Button
                                                        variant="secondary"
                                                        disabled={true}
                                                    >
                                                        취소 완료
                                                    </Button>
                                                )
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                ) : (
                    <div>구매한 이력이 없습니다.</div>
                )
            }
            <ItemPagination totalPages={orderObj.totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
        </div>
    )
}

export default OrderList;