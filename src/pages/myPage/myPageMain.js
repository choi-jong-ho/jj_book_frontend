import React, {useContext, useEffect, useState} from "react";
import '../../css/pages/myPage/myPageMain.css';
import Aside from "./aside";
import {Route, Routes} from "react-router-dom";
import Profile from "./profile";
import AddressList from "./addressList";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import MyPageHeader from "./myPageHeader";
import MyPageFooter from "./myPageFooter";
import '../../css/pages/myPage/myPageMain.css'

const MyPageMain = () => {
    const {isLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        // checkUser();
    }, []);

    const checkUser = () => {
        if (!isLoggedIn) {
            navigate('/auth/login');
        }
    }

    return (
        <div className='my-page'>
            <div className='my-page-wrap'>
                <MyPageHeader/>
                <div className='my-page-main'>
                    <div className='my-page-left'>
                        <Aside/>
                    </div>
                    <div className='my-page-container'>
                        <h1>마이페이지 메인</h1>
                        {/*<Routes path="/mypage" >*/}
                        {/*    <Route path='profile' element={<Profile/>}/>*/}
                        {/*    <Route path="addresslist" element={<AddressList/>}/>*/}
                        {/*</Routes>*/}
                    </div>
                </div>
                <MyPageFooter/>
            </div>
        </div>
    )
}

export default MyPageMain;