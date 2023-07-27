import React, { useState, createContext } from 'react';

const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState([]);
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;