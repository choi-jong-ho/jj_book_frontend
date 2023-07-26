import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../css/pages/Login.css';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`로그인 정보: 이메일(${id}), 비밀번호(${password})`);
    };

    return (
        <Container className="container-Login">
            <h1>로그인</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='info-box'>
                    <Form.Label>아이디</Form.Label>
                    <Form.Control
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
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