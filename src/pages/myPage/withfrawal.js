import React, {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import '../../css/pages/myPage/ withfrawal.css';

const Withdrawal = () => {
    const [password, setPassword] = useState('');

    const checkPassword = (e) => {
        setPassword(e.target.value);
    }
    return(
        <Container className="withdrawal-container">
            <h1>회원 탈퇴</h1>
            <Form onSubmit={null} className= 'addressList-info'>
                <Form.Group className='info-box'>
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => checkPassword(e)}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={password.length < 8}
                >
                    탈퇴하기
                </Button>
            </Form>
        </Container>
    )
}

export default Withdrawal;