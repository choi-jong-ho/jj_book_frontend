import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../store/AuthContext";
import {Form, Button, Container, Alert} from 'react-bootstrap';
import '../../css/pages/Login&SignUp/Login.css';
import {loginItemSetting} from '../../store/Auth'

import axios from 'axios';

const Login = () => {
    const {setIsLoggedIn, setUser} = useContext(AuthContext); // 로그인 상태 관리를 위한 AuthContext 추가

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // form 데이터 형식으로 보내기
        const formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        try {
            await axios.post('/member/login', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

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

    return (
        <Container className="container-Login">
            <h1>로그인</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className='info-box'>
                    <Form.Label>아이디</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className='info-box'>
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
        </Container>
    );
};

export default Login;