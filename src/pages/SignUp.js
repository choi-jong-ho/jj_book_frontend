import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const SignUp = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`회원가입 정보: 이메일(${email}), 비밀번호(${password}), 이름(${name})`);
    };

    return (
        <Container>
            <h1>회원가입</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>아이디</Form.Label>
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

                <Form.Group>
                    <Form.Label>사용자 이름</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>핸드폰 번호</Form.Label>
                    <Form.Control
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>거주지</Form.Label>
                    <Form.Control
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    가입하기
                </Button>
            </Form>
        </Container>
    );
};

export default SignUp;