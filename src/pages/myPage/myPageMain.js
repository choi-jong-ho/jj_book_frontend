import React from "react";
import '../../css/pages/myPage/myPageMain.css';
import Aside from "./aside";
import {Route, Routes} from "react-router-dom";
import Profile from "./profile";
import AddressList from "./addressList";
// import Profile from "./profile";

const MyPageMain = () => {
    return (
        <div className='my-page-wrap'>
            <Aside/>
            <div className='my-page-container'>
                <Routes>
                    <Route path='profile' element={<Profile/>}/>
                    <Route path="addresslist" element={<AddressList/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default MyPageMain;