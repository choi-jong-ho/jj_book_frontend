import React, {Fragment, useContext, useEffect, useState} from "react";
import './Profile.css'
import {Button} from 'react-bootstrap';
import axios from "axios";
import {loginItemSetting} from "../../store/Auth";
import AuthContext from "../../store/AuthContext";

const Profile = () => {
    const {state} = useContext(AuthContext);

    const [userData, setUserData] = useState({});
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        setUserData(JSON.parse(user));
    }, []);

    const profileEdit = async () => {
        console.log('state.token', state.token);
        const formData = {
            phone: userData.phone
        }
        try {
            const response = await axios.post('/member/update', formData,{
                headers: {
                    "X-AUTH-TOKEN" : state.token
                }
            });
            console.log('프로파일 수정 성공', response);
            await getMemberInfo();
            window.location.reload();
        } catch (e) {
            console.log('프로파일 수정 실패', e);
        }
    }

    const getMemberInfo = async () => {
        try {
            const response = await axios.get('/member/info', {
                headers: {
                    "X-AUTH-TOKEN" : state.token
                }
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            setUserData(response.data);
            loginItemSetting();
        } catch (e) {
            console.log('유저 정보 가져오기 오류', e);
        }
    }

    const phoneEdit = (e) => {
        let copyUser = {...userData};
        copyUser['phone'] = e;
        setUserData(copyUser);
    }

    const changeEdit = () => {
        setEdit(true);
    }

    return (
        <div className='profile-container'>
            <h2>사용자 정보</h2>
            <div className='profile-wrap'>
                <div className='profile-info'>
                    <div className='profile-info-title'>이름</div>
                    <div className='profile-info-detail'>{userData.name}</div>
                </div>
                <div className='profile-info'>
                    <div className='profile-info-title'>이메일</div>
                    <div className='profile-info-detail'>{userData.email}</div>
                </div>
                <div className='profile-info'>
                    <div className='profile-info-title'>번호</div>
                    {
                        edit === true ?
                            <Fragment>
                                <input type="tel" value={userData.phone} onChange={(e) => phoneEdit(e.target.value)} />
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={profileEdit}
                                >
                                    저장
                                </Button>
                            </Fragment>
                            :
                            <Fragment>
                                <div className='profile-info-detail'>{userData.phone}</div>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={changeEdit}
                                >
                                    수정
                                </Button>
                            </Fragment>
                    }
                </div>
                <div className='profile-info'>
                    <div className='profile-info-title'>등급</div>
                    <div className='profile-info-detail'>{userData.grade}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile;