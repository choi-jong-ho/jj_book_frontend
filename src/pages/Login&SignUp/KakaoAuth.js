import React from 'react';
import './KaKaoAuth.css';
const KakaoAuth = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <img
      className='kakao-login-img'
      src='/images/login/kakao_login.png'
      onClick={handleLogin}
    />
  );
};

export default KakaoAuth;
