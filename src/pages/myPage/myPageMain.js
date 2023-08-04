import React, {useContext, useEffect, useState} from "react";
import '../../css/pages/myPage/myPageMain.css';
import Aside from "./aside";
import Profile from "./profile";
import AddressList from "./addressList";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import MyPageHeader from "./myPageHeader";
import MyPageFooter from "./myPageFooter";
import Withdrawal from "./withfrawal";
import '../../css/pages/myPage/myPageMain.css'

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
                return <AddressList/>;
            case 'withdrawal':
                return <Withdrawal/>;
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
                        <Aside changePage={changePage}/>
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