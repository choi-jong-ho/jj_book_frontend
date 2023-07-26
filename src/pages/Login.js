import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`로그인 정보: 이메일(${id}), 비밀번호(${password})`);
    };

    return (
        <Container>
            <h1>로그인</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
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