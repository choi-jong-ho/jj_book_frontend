import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import axios from 'axios';

const KakaoCallback = () => {
  const { actions } = useContext(AuthContext);
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const fetchKakaoLogin = async () => {
      try {
        const response = await axios.get(`/login/kakao?code=${code}`);
        localStorage.setItem(
          'login-token',
          JSON.stringify(response.data.jwtToken)
        );
        actions.setToken(response.data.jwtToken);
        localStorage.setItem(
          'access_Token',
          JSON.stringify(response.data.access_Token)
        );
        await getMemberInfo(response.data.jwtToken);
      } catch (e) {
        console.log('카카오 인가 코드 백엔드 전송 실패', e);
      }
    };

    fetchKakaoLogin();
  }, []);

  const getMemberInfo = async (token) => {
    try {
      const response = await axios.get('/member/info', {
        headers: { 'X-AUTH-TOKEN': token },
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem(
        'authorities',
        response.data.authorities[0].authority
      );
      actions.setUser(response.data);
      actions.setAuthorities(response.data.authorities[0].authority);
      navigate('/');
    } catch (e) {
      console.log('유저 정보 가져오기 오류', e);
    }
  };

  return <div>카카오 계정으로 간편 로그인 중입니다.</div>;
};
export default KakaoCallback;
