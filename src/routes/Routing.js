import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Main from "../pages/main/Main";
import Login from "../pages/Login&SignUp/Login";
import SignUp from "../pages/Login&SignUp/SignUp";
import MyPageMain from "../pages/myPage/MyPageMain";
import Upload from "../pages/Item/Upload";
import Edit from "../pages/Item/Edit";
import ItemManagement from "../pages/Item/ItemManagement";
import ItemDetail from "../pages/Item/ItemDetail";
import PrivateRoute from "./PrivateRoute";
import ProtectRoute from "./ProtectRoute";

const Routing = () => {
    return (
        <Routes>
            {/*로그인이 아니여도 사용가능*/}
            <Route path="/" element={<Main/>}/>
            <Route path="/member/login" element={<Login/>}/>
            <Route path="/member/signup" element={<SignUp/>}/>

            {/*로그인 필요*/}
            <Route element={<PrivateRoute/>}>
                <Route path="/mypage/*" element={<MyPageMain/>} />
            </Route>

            {/*권한 필요*/}
            <Route element={<ProtectRoute />}>
                <Route path="/admin/item/new" element={<Upload/>} />
                <Route path="/admin/item/:itemId" element={<Edit/>} />
                <Route path="/admin/item" element={<ItemManagement/>} />
                <Route path="/admin/item/detail/:itemId" element={<ItemDetail/>} />
            </Route>

        </Routes>
    )
}

export default Routing;