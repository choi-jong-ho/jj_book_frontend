import React, {useContext, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import '../../css/pages/myPage/ withfrawal.css';
import AuthContext from "../../store/AuthContext";
import axios from "axios";

const Withdrawal = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const checkPassword = (e) => {
        setPassword(e.target.value);
    }

    const confirmBtn = () => {
        if(window.confirm('회원님 정말 탈퇴하시겠습니까?')) {
            console.log('true');
            navigate('/');
        } else {
            console.log('false');
        }
    }

    const handleOnRemoveSubmit = async (e) => {
        e.preventDefault();
        const email = user.name;
        const formData = {
            email,
            password
        };

        try {
            const response = await axios.post('/auth/signup', formData);
            console.log('회원 탈퇴', response);
            navigate('/');
        } catch (e) {
            console.log(e);
        }

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
                    onClick={confirmBtn}
                >
                    탈퇴하기
                </Button>
            </Form>
        </Container>
    )
}

export default Withdrawal;