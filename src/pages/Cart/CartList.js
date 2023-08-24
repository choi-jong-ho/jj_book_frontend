import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Table, Button} from 'react-bootstrap';
import './CartList.css';

const CartList = ({cartData, countList, setCountList, cartCancel, cartUpdate}) => {
    const navigate = useNavigate();

    const navigateToProductDetail = useCallback((itemNumber) => {
        navigate(`/admin/item/detail/${itemNumber}`);
    }, [navigate]);

    const handleChangeCount = (e, index) => {
        const updateCartCount = [...countList];
        updateCartCount[index] = e.target.value;
        setCountList(updateCartCount);
    }

    return (
        <div className='cart-list-container'>
            <Table className='list-table' bordered hover>
                <thead>
                <tr>
                    <td className='cart-list-td'>
                        <label className='cart-list-label' htmlFor="checkAll" >전체 선택</label>
                        <input type="checkbox" id='checkAll' />
                    </td>
                    <td className='cart-list-td'>상품정보</td>
                    <td className='cart-list-td'>상품금액</td>
                    <td className='cart-list-td'>기능</td>
                </tr>
                </thead>
                <tbody>
                {
                    cartData.map((cartItem, index) => (
                        <tr key={cartItem.cartItemId}>
                            <td>
                                <div className='cart-list-item-checkBox'>
                                    <input type='checkbox' value={cartItem.cartItemId}/>
                                </div>
                            </td>
                            <td>
                                <div className='cart-item-warp'>
                                <img className='cart-list-item-img' src={cartItem.imgUrl} alt="장바구니 상품 이미지"/>
                                <div className='order-item-info'>
                                    <h3>{cartItem.itemNm}</h3>
                                    <label className='cart-item-label' htmlFor="cart-item-count">수량</label>
                                    <input
                                        id='cart-item-count'
                                        type='number'
                                        min={1}
                                        value={countList[index]}
                                        onChange={(e) => handleChangeCount(e, index)}/>
                                </div>
                            </div>
                            </td>
                            <td>
                                <div className='cart-list-item-total-price'>
                                    {cartItem.price * countList[index]}
                                </div>
                            </td>
                            <td>
                                <div className='cart-list-func'>
                                    <Button
                                        variant="success"
                                        onClick={() => cartUpdate(cartItem.cartItemId, index)}
                                    >
                                        수정
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => cartCancel(cartItem.cartItemId)}
                                    >
                                        제거
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={() => navigateToProductDetail(cartItem.cartItemId)}
                                    >
                                        상품 보기
                                    </Button>
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