import React from "react";
import '../../css/pages/myPage/aside.css';
import { Link } from "react-router-dom";

const Aside = () => {
    return (
        <div className='my-page-aside'>
            <ul>
                <li className='logo'>
                    <div>아이콘 사진</div>
                    <div>웹 사이트 로고</div>
                </li>
                <div className='menu-list'>
                    <li className='aside-item'>
                        <ul className='sub-list'>주문내역
                            <li className='sub-list'>주문/배송목록</li>
                            <li className='sub-list'>선물함</li>
                            <li className='sub-list'>주문취소 목록</li>
                        </ul>
                    </li>
                    <li className='aside-item'>
                        <ul className='sub-list'>회원정보관리
                            <li className='sub-list'><Link to="/mypage/profile">회원정보 수정</Link></li>
                            <li className='sub-list'><Link to="/mypage/addresslist">배송주소록</Link></li>
                            <li className='sub-list'>회원 탈퇴</li>
                        </ul>
                    </li>
                    <li className='aside-item'>고객센터
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