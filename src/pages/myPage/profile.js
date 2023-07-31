import React from "react";
import '../../css/pages/myPage/profile.css'
import {Button} from 'react-bootstrap';

const Profile = () => {
    const userInfo = {
        email: 'user@example.com',
        name: '홍길동',
        address: '서울시 강남구',
        phone: '010-1234-5678',
    };
    return (
        <div className='profile-container'>
            <h2>사용자 정보</h2>
            <div className="profileItem">
                <label htmlFor="email">이메일: </label>
                <span id="email">{userInfo.email}</span>
            </div>
            <div className="profileItem">
                <label htmlFor="name">이름: </label>
                <span id="name">{userInfo.name}</span>
            </div>
            <div className="profileItem">
                <label htmlFor="phone">핸드폰 번호: </label>
                <span id="phone">{userInfo.phone}</span>
            </div>
            <div className="profileItem">
                <label htmlFor="address">거주지: </label>
                <span id="address">{userInfo.address}</span>
            </div>
            <Button
                variant="primary"
                type="submit"
            >
                수정하기
            </Button>
        </div>
    )
}

export default Profile;