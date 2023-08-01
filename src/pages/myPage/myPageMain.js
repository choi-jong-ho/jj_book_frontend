import React, {useContext, useEffect} from "react";
import '../../css/pages/myPage/myPageMain.css';
import Aside from "./aside";
import {Route, Routes} from "react-router-dom";
import Profile from "./profile";
import AddressList from "./addressList";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../store/AuthContext";

const MyPageMain = () => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = () => {
        if(!isLoggedIn) {
            navigate('/auth/login');
        }
    }

    return (
        <div className='my-page-wrap'>
            <Aside/>
            <div className='my-page-container'>
                <Routes path="/mypage" element={<MyPageMain/>}>
                    <Route path='profile' element={<Profile/>}/>
                    <Route path="addresslist" element={<AddressList/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default MyPageMain;