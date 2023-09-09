import React from "react";
import MyPageAside from "./MyPageAside";
import MyPageHeader from "./MyPageHeader";
import MyPageFooter from "./MyPageFooter";
import {Route, Routes} from 'react-router-dom';
import Profile from "./Profile";
import MyPageAddress from "./MyPageAddress";
import Withdrawal from "./MemberDelete";
import OrderList from "./OrderList";
import Cart from "../Cart/Cart";
import '../../css/pages/myPage/MyPageMain.css';
import AddrUpload from "./AddrUpload";
import AddrEdit from "./AddrEdit";
import ReviewWrite from "../Review/ReviewWrite";
import ReviewList from "../Review/ReviewList";

const MyPageMain = () => {

    return (
        <div className="my-page">
            <div className="my-page-wrap">
                <MyPageHeader/>
                <div className="my-page-main">
                    <div className="my-page-left">
                        <MyPageAside/>
                    </div>
                    <div className="my-page-container">
                        <Routes>
                            <Route path="/" element={<Profile/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/address" element={<MyPageAddress/>}/>
                            <Route path="/addrupload" element={<AddrUpload/>}/>
                            <Route path="/addrEdit/:addrId" element={<AddrEdit/>}/>
                            <Route path="/withdrawal" element={<Withdrawal/>}/>
                            <Route path="/orderList" element={<OrderList/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="/review/:orderId" element={<ReviewWrite/>}/>
                            <Route path="/reviewList" element={<ReviewList/>}/>
                        </Routes>
                    </div>
                </div>
                <MyPageFooter/>
            </div>
        </div>
    )
}

export default MyPageMain;
