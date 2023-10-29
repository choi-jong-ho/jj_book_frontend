import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import { loginItemSetting } from '../../store/Auth';
import { Form, Button, Alert } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';
import NaverLogin from './NaverLogin';
import KakaoAuth from './KakaoAuth';

const Login = () => {
  const { actions } = useContext(AuthContext); // 로그인 상태 관리를 위한 AuthContext 추가

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('/member/login', formData);
      console.log('로그인 데이터', response);
      localStorage.setItem('login-token', JSON.stringify(response.data));
      actions.setToken(response.data);
      await getMemberInfo(response.data);

      setError(''); // 에러 메시지 초기화
    } catch (error) {
      console.error('Error:', error);
      setError('로그인하려면 유효한 아이디 또는 비밀번호를 입력하세요.');
    }
  };

  const getMemberInfo = async (token) => {
    try {
      const response = await axios.get('/member/info', {
        headers: { 'X-AUTH-TOKEN': token },
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('로그인된 유저 데이터', response);
      localStorage.setItem(
        'authorities',
        response.data.authorities[0].authority
      );
      actions.setUser(response.data);
      actions.setAuthorities(response.data.authorities[0].authority);
      loginItemSetting();
      navigate('/'); // 로그인 후 페이지 이동
    } catch (e) {
      console.log('유저 정보 가져오기 오류', e);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-wrap'>
        <h2>로그인</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group className='login-box'>
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='login-box'>
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
          >
            로그인하기
          </Button>
        </Form>
      </div>
      <div className='login-other'>
        <div className='login-platform'>
          <KakaoAuth />
          <NaverLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
