import React, {Fragment, useCallback, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {logoutActionHandler} from '../../store/auth';
import AuthContext from "../../store/AuthContext";
import './Header.css';

const Header = () => {
    const {isLoggedIn, setIsLoggedIn, user, setUser} = useContext(AuthContext); // 로그인 상태 관리
    const navigate = useNavigate();

    const navigateToMain = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const navigateToItemMng = useCallback(() => {
        navigate('/admin/item');
    }, [navigate]);

    const navigateToLogin = useCallback(() => {
        navigate('/member/login');
    }, [navigate]);

    const navigateToSignUp = useCallback(() => {
        navigate('/member/signUp');
    }, [navigate]);

    const navigateToMyPage = useCallback(() => {
        navigate('/mypage/profile');
    }, [navigate]);

    const navigateToUpload = useCallback(() => {
        navigate('/admin/item/new');
    }, [navigate]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser([]);
        logoutActionHandler();
    };

    return (
        <div className='header-container'>
            <div className='header-wrap'>
                <div className='header-box'>
                    <div className='header-box-left'>
                        <img className='header-logo' width="70" height="70"
                             src="https://img.icons8.com/external-goofy-color-kerismaker/96/external-library-education-goofy-color-kerismaker.png"
                             alt="external-library-education-goofy-color-kerismaker" onClick={navigateToMain}/>
                    </div>
                    <div className='header-box-center'>
                        <div className='header-item' onClick={navigateToItemMng}>
                            <img width="30" height="30"
                                 src="https://img.icons8.com/wired/64/list--v1.png"
                                 alt="상품 관리"/>
                            상품관리
                        </div>
                        <div className='header-item' onClick={navigateToUpload}>
                            <img width="30" height="30"
                                 src="https://img.icons8.com/isometric-line/50/experimental-product-isometric-line.png"
                                 alt="상품 등록"/>
                            상품등록
                        </div>
                    </div>
                    <div className='header-box-right'>
                        {isLoggedIn ? (
                            <Fragment>
                                <div className='header-item' onClick={handleLogout}>
                                    <img width="30" height="30"
                                         src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/external-logout-interface-dreamstale-lineal-dreamstale.png"
                                         alt="로그아웃"/>
                                    로그아웃
                                </div>
                                <div className='header-item' onClick={navigateToMyPage}>
                                    <img width="30" height="30"
                                         src="https://img.icons8.com/dotty/80/user-location.png"
                                         alt="마이페이지"/>
                                    마이페이지
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <div className='header-item' onClick={navigateToLogin}>
                                    <img width="30" height="30"
                                         src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/external-login-call-to-action-bearicons-detailed-outline-bearicons-1.png"
                                         alt="로그인"/>
                                    로그인
                                </div>
                                <div className='header-item' onClick={navigateToSignUp}>
                                    <img width="30" height="30"
                                         src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/external-sign-up-call-to-action-bearicons-detailed-outline-bearicons-1.png"
                                         alt="회원가입" id='회원가입'/>
                                    회원가입
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Header);
