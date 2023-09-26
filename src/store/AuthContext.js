import React, {useState, createContext, useEffect} from 'react';

const AuthContext = createContext({
    state: { isLoggedIn: false, token: '', user: null, },
    actions: {
        setIsLoggedIn : () => {},
        setToken: () => {},
        setUser: () => {},
    }
});

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');

    const value = {
        state : {isLoggedIn, token, user},
        actions : {setIsLoggedIn, setToken, setUser}
    }

    const loginToken = JSON.parse(localStorage.getItem('login-token'));

    useEffect(() => {
        if (loginToken) {
            setToken(loginToken);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContext;