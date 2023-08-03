import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Main from "../pages/main/main";
import Login from "../pages/Login&SignUp/Login";
import SignUp from "../pages/Login&SignUp/SignUp";
import MyPageMain from "../pages/myPage/myPageMain";
import AddressList from "../pages/myPage/addressList";
import Profile from "../pages/myPage/profile";

const Routing = () => {
    return (
        // <Routes>
        //     <Route path="/" element={<Main/>}/>
        //     <Route path="/auth/login" element={<Login/>}/>
        //     <Route path="/auth/signup" element={<SignUp/>}/>
        //     <Route path="/mypage/*" element={<MyPageMain/>}>
        //         <Route path='profile' element={<Profile/>}/>
        //         <Route path="addresslist" element={<AddressList/>}/>
        //     </Route>
        // </Routes>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/auth/login" element={<Login/>}/>
            <Route path="/auth/signup" element={<SignUp/>}/>
            <Route path="/mypage/main" element={<MyPageMain/>}>
                {/*<Route path='profile' element={<Profile/>}/>*/}
                {/*<Route path="addresslist" element={<AddressList/>}/>*/}
            </Route>
        </Routes>
    )
}

export default Routing;