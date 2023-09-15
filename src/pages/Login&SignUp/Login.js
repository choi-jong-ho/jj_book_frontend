import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../store/AuthContext";
import {Form, Button, Container, Alert} from 'react-bootstrap';
import './Login.css';
import {loginItemSetting} from '../../store/Auth'
import KakaoLogin from "react-kakao-login";

import axios from 'axios';
import NaverLogin from "./NaverLogin";
import KakaoAuth from "./KakaoAuth";

const Login = () => {
    const {setIsLoggedIn, setUser} = useContext(AuthContext); // 로그인 상태 관리를 위한 AuthContext 추가

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // form 데이터 형식으로 보내기
        // const formData = new FormData();
        //
        //
        // formData.append('email', email);
        // formData.append('password', password);

        const formData = {
            email: email,
            password : password,
        }

        try {
            await axios.post('/member/login', formData);

            await getMemberInfo();

            setError(''); // 에러 메시지 초기화
            navigate('/'); // 로그인 후 페이지 이동
        } catch (error) {
            console.error('Error:', error);
            setError('로그인하려면 유효한 아이디 또는 비밀번호를 입력하세요.');
        }
    };

    const getMemberInfo = async () => {
        try {
            const response = await axios.get('/member/info');
            localStorage.setItem('user', JSON.stringify(response.data));
            setIsLoggedIn(true);
            setUser(response.data);
            loginItemSetting();
        } catch (e) {
            console.log('유저 정보 가져오기 오류', e);
        }
    }

    // const REST_API_KEY = '139ab3d09d8f122781ceba9017cebae2';
    // const REDIRECT_URI = 'http://localhost:8080';
    // const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    //
    // const loginHandler = () => {
    //     window.location.href = link;
    // };

    const loginHandler = () => {
        navigate('/kakao/login');
    };

    // const code = new URL(window.location.href).searchParams.get("code");
    //
    // console.log('code', code); // 이 코드를 백엔드로 넘겨준 다음

    // 자바스크립트 로그인 => REST API로 바꿔야함
    // const JAVA_SCRIPT_API_KEY = '14a56cae9a2eb65db0f2f98638b01554'
    // const kakaoOnSuccess = async (data)=>{
    //     console.log('kakaoOnSuccess', data);
    //     const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
    // }
    // const kakaoOnFailure = (error) => {
    //     console.log('kakaoOnFailure', error);
    // };

    return (
        <div className="login-container">
            <div className="login-wrap">
                <h2>로그인</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='login-box'>
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className='login-box'>
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        로그인하기
                    </Button>
                </Form>
            </div>
            <div className='login-other'>
                    {/*<KakaoLogin*/}
                    {/*    token={JAVA_SCRIPT_API_KEY}*/}
                    {/*    onSuccess={kakaoOnSuccess}*/}
                    {/*    onFail={kakaoOnFailure}*/}
                    {/*/>*/}
                <div className='login-platform'>
                    <KakaoAuth />
                    <NaverLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;