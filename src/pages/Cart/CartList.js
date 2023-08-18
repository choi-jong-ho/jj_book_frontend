import React from "react";
import {Table, Button} from 'react-bootstrap';
import './CartList.css';

const CartList = ({cartData}) => {

    return (
        <div className='cart-list-container'>
            <Table className='list-table' bordered hover>
                <thead>
                <tr>
                    <td className='cart-list-td'>
                        <input type="checkbox" id='checkAll' />전체 선택
                    </td>
                    <td className='cart-list-td'>상품정보</td>
                    <td className='cart-list-td'>상품금액</td>
                </tr>
                </thead>
                <tbody>
                {
                    cartData.map(item => (
                        <tr key={item.itemId}>
                            <td>
                                <div className='cart-list-item-checkBox'>
                                    <input type='checkbox' value={item.itemId}/>
                                </div>
                            </td>
                            <td>
                                <div className='cart-item-warp'>
                                <img className='cart-list-item-img' src={item.imgUrl} alt="장바구니 상품 이미지"/>
                                <div className='order-item-info'>
                                    <h3>{item.itemNm}</h3>
                                    <span>수량: {item.count}</span>
                                    <span>가격: {item.price}</span>
                                </div>
                            </div>
                            </td>
                            <td>
                                <div className='cart-list-item-total-price'>
                                    {item.price}
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    )
}

export default CartList;