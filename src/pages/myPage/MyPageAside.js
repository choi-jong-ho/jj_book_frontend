import React from "react";
import { NavLink  } from 'react-router-dom';
import '../../css/pages/myPage/MyPageAside.css';

const MyPageAside = () => {
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
                            <li className='sub-list'><NavLink to='/mypage/cart' className="nav-link" activeClassName="active-link">장바구니</NavLink></li>
                        </ul>
                    </li>
                    <li className='aside-item'>주문내역
                        <ul className='sub-title'>
                            <li className='sub-list'><NavLink to='/mypage/orderList' className="nav-link" activeClassName="active-link">주문/배송목록</NavLink></li>
                            <li className='sub-list'><NavLink to='/mypage/reviewList' className="nav-link" activeClassName="active-link">리뷰목록</NavLink></li>
                            {/*<li className='sub-list'><NavLink to=''>선물함</NavLink></li>*/}
                            {/*<li className='sub-list'><Link to='/'>주문취소 목록</Link></li>*/}
                        </ul>
                    </li>
                    <li className='aside-item'>회원정보관리
                        <ul className='sub-title'>
                            <li className='sub-list'><NavLink to='/mypage/profile' className="nav-link">회원정보 수정</NavLink></li>
                            <li className='sub-list'><NavLink to='/mypage/address' className="nav-link">배송주소록</NavLink></li>
                            <li className='sub-list'><NavLink to='/mypage/withdrawal' className="nav-link">회원 탈퇴</NavLink></li>
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
