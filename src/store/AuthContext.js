import React, {useState, createContext, useEffect} from 'react';
import {getUserActionHandler} from "./auth";

const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {
    },
    user: null,
    setUser: () => {
    },
});

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // 로컬 저장소에서 로그인 상태 및 사용자 정보 존재 여부 확인
    useEffect(() => {
        // const token = localStorage.getItem('token');
        // if (token) {
        //     const handleLoginCheck = async () => {
        //         const userData = await getUserActionHandler(token);
        //         console.log('userData', userData);
        //         if (userData !== null) {
        //             setIsLoggedIn(true);
        //             setUser(userData.data);
        //         } else {
        //             // userData가 null일 때 처리할 작업을 여기에 추가하세요.
        //         }
        //     };
        //     handleLoginCheck();
        // }

    }, []);
;
    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;