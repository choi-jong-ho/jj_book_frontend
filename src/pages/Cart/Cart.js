import React, { Fragment, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ItemPagination from '../../components/Pagination/ItemPagination';
import CartList from './CartList';
import AuthContext from '../../store/AuthContext';
import './Cart.css';

const Cart = () => {
  const { state } = useContext(AuthContext);

  const [cartData, setCartData] = useState([]);
  const [cartObj, setCartObj] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [countList, setCountList] = useState([]);

  useEffect(() => {
    getCartList();
  }, []);

  const getCartList = async (newPage) => {
    try {
      let response = {};

      if (newPage) {
        response = await axios.get(`/cart/list/${newPage}`, {
          headers: { 'X-AUTH-TOKEN': state.token },
        });
      }

      if (!newPage) {
        response = await axios.get('/cart/list', {
          headers: { 'X-AUTH-TOKEN': state.token },
        });
      }
      const data = response.data;
      setCartObj(data[0]);
      setCartData(data[0].content);
      const itemCount = data[0].content.map((cartItem) => cartItem.count);
      setCountList(itemCount);
    } catch (e) {
      console.log('장바구니 목록 조회 오류', e);
    }
  };

  const cartCancel = async (cartItemId) => {
    const formData = {
      cartItemId: cartItemId,
    };
    try {
      await axios.post(`/cart/delete`, formData);
      alert('장바구니 상품 삭제 성공');
      getCartList();
    } catch (e) {
      console.log('장바구니 상품 삭제 실패', e);
    }
  };

  const cartUpdate = async (cartItemId, index) => {
    const formData = {
      cartItemId: cartItemId,
      count: countList[index],
    };
    try {
      await axios.post(`/cart/update`, formData);
      alert('장바구니 수정 성공');
      getCartList();
    } catch (e) {
      console.log('장바구니 상품 삭제 실패', e);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    getCartList(newPage);
  };
  return (
    <div className='order-list-container'>
      <h2>장바구니 목록</h2>
      {cartData !== null ? (
        <Fragment>
          <CartList
            cartData={cartData}
            setCartData={setCartData}
            countList={countList}
            setCountList={setCountList}
            cartCancel={cartCancel}
            cartUpdate={cartUpdate}
          />
          <ItemPagination
            totalPages={cartObj.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Fragment>
      ) : (
        <div className='cart-list-null'>장바구니 이력이 없습니다.</div>
      )}
    </div>
  );
};

export default Cart;
