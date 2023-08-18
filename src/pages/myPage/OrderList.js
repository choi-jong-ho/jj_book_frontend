import React, {useEffect, useState} from "react";
import axios from "axios";
import './OrderList.css';
import {Button} from "react-bootstrap";
import ItemPagination from "../../components/Pagination/ItemPagination";

const OrderList = () => {
    const [orderData, setOrderData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [orderObj, setOrderObj] = useState([]);

    useEffect(() => {
        getOrderList();
    }, []);

    const getOrderList = async (newPage) => {
        try {
            let response = {};

            if(newPage) {
                response = await axios.get(`/order/list/${newPage}`);
            }
            if(!newPage) {
                response = await axios.get('/order/list');
            }

            // response = await axios.get(`/order/list`);
            console.log('response', response);
            const data = response.data;
            setOrderObj(data[0]);
            setOrderData(data[0].content);
        } catch (e) {
            console.log('구매 목록 조회 오류', e);
        }
    }

    const orderCancel = async (orderId) => {
        try {
            const response = await axios.post(`/order/${orderId}/cancel`);
            alert('주문 취소가 완료되었습니다.');
        } catch (e) {
            console.log('주문 취소 실패', e);
        }
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        getOrderList(newPage);
    };

    const test = async (newPage) => {
        try {
            // const formData = {
            //     size: 5
            // }

            const formData = new FormData();
            formData.append('size', '5');

            let response = {};
            if(newPage) {
                response = await axios.get(`/order/list/${newPage}`, formData);
            }
            if(!newPage) {
                response = await axios.get('/order/list', formData);
            }

            // response = await axios.get(`/order/list`);
            console.log('response', response);
            const data = response.data;
            setOrderObj(data[0]);
            setOrderData(data[0].content);
        } catch (e) {
            console.log('구매 목록 조회 오류', e);
        }
    }

    return (
        <div className='order-list-container'>
            {/*<Button*/}
            {/*    onClick={()=> test}*/}
            {/*>*/}
            {/*    테스트 버튼*/}
            {/*</Button>*/}
            <h2>구매이력 조회</h2>
            {
                orderData ? (
                    orderData.map(item => (
                        <div className='order-list-wrap'>
                            <div className='order-item-header'>
                                <div className='order-item-time'>
                                    {item.orderDate} 주문
                                </div>
                                {
                                    item.orderStatus === 'ORDER' ? (
                                        <Button
                                            variant="danger"
                                            onClick={() => orderCancel(item.orderId)}
                                        >주문 취소</Button>
                                    ) : (
                                        <Button
                                            variant="secondary"
                                            disabled={true}
                                        >취소 완료</Button>
                                    )
                                }
                            </div>
                            <div className='order-item-main'>
                                <div className='order-item-img'>
                                    <img className='order-item-img' src={item.orderItemDtoList[0].imgUrl}/>
                                </div>
                                <div className='order-item-info'>
                                    <h2>{item.orderItemDtoList[0].itemNm}</h2>
                                    <span>가격: {item.orderItemDtoList[0].orderPrice} 수량: {item.orderItemDtoList[0].count}</span>
                                    <span>합계 {item.orderItemDtoList[0].orderPrice * item.orderItemDtoList[0].count} </span>
                                </div>
                            </div>
                        </div>
                        )
                    )

                ) : (<div>구매한 이력이 없습니다.</div>)
            }
                <ItemPagination totalPages={orderObj.totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
        </div>
    )
}

export default OrderList;