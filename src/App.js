import React, {useContext, useEffect} from 'react';
import ScrollToTop from './pages/util/scrollTop';
import Routing from "./routes/Routing";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Fragment } from "react";
import './css/App.css'
import AuthContext from "./store/AuthContext";
import {loginExpiration} from "./store/Auth";

const App = () => {
    const { setIsLoggedIn, setUser } = useContext(AuthContext); // 로그인 상태 관리를 위한 AuthContext 추가

    useEffect(() => {
        loginExpiration();
        loadUser();
        const currentTime = new Date().getTime();
        console.log('시간 확인하기', currentTime);
    }, []);
    const loadUser = () => {
        const user = localStorage.getItem('user');
        if (!user) return;
        setIsLoggedIn(true);
        setUser(JSON.parse(user));
    }

    return (
        <Fragment>
            <ScrollToTop/>
            <div className='App'>
                <Header/>
                <Routing/>
                <Footer/>
            </div>
        </Fragment>
    );
}

export default App;
