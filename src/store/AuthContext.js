import React, { useState, createContext, useEffect } from 'react';
import {getUserActionHandler} from "./auth";

const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: null,
    setUser: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState([]);

    // 로컬 저장소에서 로그인 상태 및 사용자 정보 존재 여부 확인
    useEffect(() => {
        if (localStorage.getItem('token')) {
            handleLoginCheck();
        }
    }, []);

    const handleLoginCheck = async () => {
        const check = await getUserActionHandler(localStorage.getItem('token'));
        setIsLoggedIn(true);
        setUser(check.data);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;