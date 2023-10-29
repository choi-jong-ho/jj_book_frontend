import React, { useState, createContext, useEffect } from 'react';

const AuthContext = createContext({
  state: {
    token: '',
    user: null,
    authorities: '',
  },
  actions: {
    setToken: () => {},
    setUser: () => {},
    setAuthorities: () => {},
  },
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [authorities, setAuthorities] = useState('');

  const value = {
    state: { token, user, authorities },
    actions: { setToken, setUser, setAuthorities },
  };

  const loginToken = JSON.parse(localStorage.getItem('login-token'));
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const userAuthorities = localStorage.getItem('authorities');

  useEffect(() => {
    console.log('새로고침 할 때 마다 실행되는가?');
    if (loginToken) {
      setToken(loginToken);
      setUser(userInfo);
      setAuthorities(userAuthorities);
    }
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContext;
