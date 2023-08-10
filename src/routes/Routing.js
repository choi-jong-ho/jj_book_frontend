import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Main from "../pages/main/Main";
import Login from "../pages/Login&SignUp/Login";
import SignUp from "../pages/Login&SignUp/SignUp";
import MyPageMain from "../pages/myPage/myPageMain";
// import AddAdress from "../pages/myPage/addAdress";
// import Profile from "../pages/myPage/profile";
import Upload from "../pages/Item/Upload";
import Edit from "../pages/Item/Edit";
import ItemManagement from "../pages/Item/ItemManagement";

const Routing = () => {
    return (
        // <Routes>
        //     <Route path="/" element={<Main/>}/>
        //     <Route path="/auth/login" element={<Login/>}/>
        //     <Route path="/auth/signup" element={<SignUp/>}/>
        //     <Route path="/mypage/*" element={<MyPageMain/>}>
        //         <Route path='profile' element={<Profile/>}/>
        //         <Route path="addresslist" element={<AddAdress/>}/>
        //     </Route>
        // </Routes>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/member/login" element={<Login/>}/>
            <Route path="/member/signup" element={<SignUp/>}/>
            <Route path="/mypage/main" element={<MyPageMain/>}>
                {/*<Route path='profile' element={<Profile/>}/>*/}
                {/*<Route path="addresslist" element={<AddAdress/>}/>*/}
            </Route>
            <Route path="/admin/item/new" element={<Upload/>} />
            <Route path="/admin/item/13" element={<Edit/>} />
            <Route path="/admin/item" element={<ItemManagement/>}>

            </Route>
        </Routes>
    )
}

export default Routing;