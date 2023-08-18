import React from "react";
import '../../css/pages/myPage/MyPageAside.css';

const MyPageAside = ({changePage}) => {
    return (
        <div className='my-page-aside'>
            <ul>
                <li className='logo'>
                    <div>아이콘 사진</div>
                    <div>웹 사이트 로고</div>
                </li>
                <div className='menu-list'>
                    <li className='aside-item'>장바구니
                        <ul className='sub-title'>
                            <li className='sub-list' onClick={() => changePage('cart')}>장바구니</li>
                        </ul>
                    </li>
                    <li className='aside-item'>주문내역
                        <ul className='sub-title'>
                            <li className='sub-list' onClick={() => changePage('orderList')}>주문/배송목록</li>
                            <li className='sub-list'>선물함</li>
                            <li className='sub-list'>주문취소 목록</li>
                        </ul>
                    </li>
                    <li className='aside-item'>회원정보관리
                        <ul className='sub-title'>
                            <li className='sub-list' onClick={() => changePage('profile')}>회원정보 수정</li>
                            <li className='sub-list' onClick={() => changePage('address-list')}>배송주소록</li>
                            <li className='sub-list' onClick={() => changePage('withdrawal')}>회원 탈퇴</li>
                        </ul>
                    </li>
                    <li className='aside-item'>고객센터
                        <ul className='sub-title'>
                            <li className='sub-list'>1:1 문의</li>
                            <li className='sub-list'>자주 묻는 질문 FAQ</li>
                        </ul>
                    </li>
                </div>
            </ul>
        </div>
    )
}

export default MyPageAside;