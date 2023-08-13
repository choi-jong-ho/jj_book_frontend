import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Main from "../pages/main/Main";
import Login from "../pages/Login&SignUp/Login";
import SignUp from "../pages/Login&SignUp/SignUp";
import MyPageMain from "../pages/myPage/myPageMain";
import Upload from "../pages/Item/Upload";
import Edit from "../pages/Item/Edit";
import ItemManagement from "../pages/Item/ItemManagement";
import ItemDetail from "../pages/Item/ItemDetail";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/member/login" element={<Login/>}/>
            <Route path="/member/signup" element={<SignUp/>}/>
            <Route path="/mypage/main" element={<MyPageMain/>}>
                {/*<Route path='profile' element={<Profile/>}/>*/}
                {/*<Route path="addresslist" element={<AddAdress/>}/>*/}
            </Route>
            <Route path="/admin/item/new" element={<Upload/>} />
            <Route path="/admin/item/:itemId" element={<Edit/>} />
            <Route path="/admin/item" element={<ItemManagement/>} />
            <Route path="/admin/item/detail/:itemId" element={<ItemDetail/>} />
        </Routes>
    )
}

export default Routing;