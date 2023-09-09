import React, {Fragment, useContext, useEffect, useState} from "react";
import './Profile.css'
import {Button} from 'react-bootstrap';
import AuthContext from "../../store/AuthContext";

const Profile = () => {
    const {user} = useContext(AuthContext);

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        console.log('user', user);
    }, []);

    return (
        <div className='profile-container'>
            <h2>사용자 정보</h2>
            <div className='profile-wrap'>
                <div className='profile-info'>
                    <div className='profile-info-title'>이름</div>
                    <div className='profile-info-detail'>해당 내용 들어가있음</div>
                </div>
                <div className='profile-info'>
                    <div className='profile-info-title'>이메일</div>
                    <div className='profile-info-detail'>해당 내용 들어가있음</div>
                </div>
                <div className='profile-info'>
                    <div className='profile-info-title'>번호</div>
                    <div className='profile-info-detail'>해당 내용 들어가있음</div>
                </div>
                <div className='profile-info'>
                    <div className='profile-info-title'>등급</div>
                    <div className='profile-info-detail'>해당 내용 들어가있음</div>
                </div>
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