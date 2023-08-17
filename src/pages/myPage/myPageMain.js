import React, {useContext, useEffect, useState} from "react";
import '../../css/pages/myPage/myPageMain.css';
import MyPageAside from "./MyPageAside";
import Profile from "./profile";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import MyPageHeader from "./myPageHeader";
import MyPageFooter from "./myPageFooter";
import Withdrawal from "./MemberDelete";
import '../../css/pages/myPage/myPageMain.css'
import AddAddress from "./addAddress";
import OrderList from "./OrderList";
import CartList from "../Cart/CartList";
const MyPageMain = () => {
    const {isLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const [curPage, setCurPage] = useState('profile');

    useEffect(() => {
        // checkUser();
    }, []);

    const checkUser = () => {
        if (!isLoggedIn) {
            navigate('/auth/login');
        }
    }

    const changePage = (pagePath) => {
        console.log('changePage');
        setCurPage(pagePath);
    }

    const renderMyPageContent = () => {
        switch (curPage) {
            case 'profile' :
                return <Profile/>;
            case 'address-list':
                return <AddAddress />
            case 'withdrawal':
                return <Withdrawal/>;
            case 'orderList':
                return <OrderList/>;
            case 'cartList':
                return <CartList/>;
            default :
                return <Profile/>;
        }
    }

    return (
        <div className='my-page'>
            <div className='my-page-wrap'>
                <MyPageHeader/>
                <div className='my-page-main'>
                    <div className='my-page-left'>
                        <MyPageAside changePage={changePage}/>
                    </div>
                    <div className='my-page-container'>
                        {renderMyPageContent()}
                    </div>
                </div>
                <MyPageFooter/>
            </div>
        </div>
    )
}

export default MyPageMain;