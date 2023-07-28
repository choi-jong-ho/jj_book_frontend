import React from "react";
import '../../css/pages/myPage/aside.css';

const Aside = () => {
    return (
        <div className='my-page-aside'>
            <ul>
                <li className='logo'>
                    <div>아이콘 사진</div>
                    <div>웹 사이트 로고</div>
                </li>
                <div className='menu-list'>
                    <li className='aside-item'><a href="/">쇼핑내역</a>
                        <ul className='sub-list'>
                            <li className='sub-list'>주문/배송목록</li>
                            <li className='sub-list'>선물함</li>
                            <li className='sub-list'>주문취소 목록</li>
                        </ul>
                    </li>
                    <li className='aside-item'><a href="/">회원 정보 관리</a>
                        <ul className='sub-list'>
                            <li className='sub-list'>배송주소록</li>
                            <li className='sub-list'>회원정보관리</li>
                            <li className='sub-list'>나의 회원등급</li>
                        </ul>
                    </li>
                    <li className='aside-item'><a href="/">문의내역</a>
                        <ul className='sub-list'>
                            <li className='sub-list'>1:1 문의</li>
                            <li className='sub-list'>자주 묻는 질문 FAQ</li>
                        </ul>

                    </li>
                </div>
            </ul>
        </div>
    )
}

export default Aside;