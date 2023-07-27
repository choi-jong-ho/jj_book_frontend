import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import AddressSearch from "../modal/AddressSearch";
import '../css/pages/SignUp.css'

const SignUp = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [add, setAdd] = useState('');
    const [phone, setPhone] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [detailedAddress, setDetailedAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let address = add + detailedAddress
        const formData = {
            email,
            password,
            name,
            phone,
            address,
        };

        try {
            const response = await fetch('/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);

        if (e.target.value !== confirmPassword) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);

        if (password !== e.target.value) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    return (

        <Container className="container-SignUp">
            <h1>회원가입</h1>
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
                        onChange={handlePasswordChange}
                        required
                    />
                </Form.Group>

                <Form.Group className='info-box'>
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        isInvalid={passwordError}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        비밀번호가 일치하지 않습니다.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='info-box'>
                    <Form.Label>사용자 이름</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className='info-box'>
                    <Form.Label>핸드폰 번호</Form.Label>
                    <Form.Control
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className='info-box'>
                    <Form.Label>거주지</Form.Label>
                    <AddressSearch address={add} setAddress={ setAdd}/>
                </Form.Group>

                {/* 주소 값이 있을 때만 상세 주소 입력 상자 표시 */}
                {add && (
                    <Form.Group className='info-box'>
                        <Form.Label>상세 주소</Form.Label>
                        <Form.Control
                            type="text"
                            value={detailedAddress}
                            onChange={(e) => setDetailedAddress(e.target.value)}
                            placeholder="상세 주소를 입력해주세요"
                        />
                    </Form.Group>
                )}

                <Button
                    variant="primary"
                    type="submit"
                    disabled={passwordError || password === '' || confirmPassword === ''}
                >
                    가입하기
                </Button>
            </Form>
        </Container>
    );
};

export default SignUp;