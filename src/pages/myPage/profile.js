import React, {useContext, useState} from "react";
import '../../css/pages/myPage/profile.css'
import {Button} from 'react-bootstrap';
import AuthContext from "../../store/AuthContext";

const Profile = () => {
    const {user} = useContext(AuthContext);

    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className='profile-container'>
            <h2>사용자 정보</h2>
            <div className="profileItem">
                <label htmlFor="email">이메일: </label>
                <span id="email">{user.email}</span>
            </div>
            <div className="profileItem">
                <label htmlFor="name">이름: </label>
                <span id="name">{user.userName}</span>
            </div>
            <div className="profileItem">
                <label htmlFor="phone">핸드폰 번호: </label>
                <span id="phone">{user.phone}</span>
            </div>
            <div className="profileItem">
                <label htmlFor="address">거주지: </label>
                <span id="address">임시 출력</span>
            </div>
            <div className="profileItem">
                <label htmlFor="grade">회원 등급: </label>
                <span id="grade">{user.grade}</span>
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