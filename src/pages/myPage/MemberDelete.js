import React, {useContext, useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import '../../css/pages/myPage/ withfrawal.css';
import AuthContext from "../../store/AuthContext";
import axios from "axios";

const Withdrawal = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    // const [password, setPassword] = useState('');

    // const checkPassword = (e) => {
    //     setPassword(e.target.value);
    // }

    // const confirmBtn = () => {
    //     if(window.confirm('회원님 정말 탈퇴하시겠습니까?')) {
    //         console.log('true');
    //         navigate('/');
    //     } else {
    //         console.log('false');
    //     }
    // }

    const handleOnRemoveSubmit = async (e, useYn) => {
        e.preventDefault();

        const formData = {
            'useYn' : useYn
        }

        try {
            const response = await axios.post('/member/delete', formData);
            console.log('회원 탈퇴', response);
            alert('회원탈퇴 되었습니다. 그동안 감사했습니다.');
            navigate('/');
        } catch (e) {
            console.log('회원 탈퇴 오류', e);
        }

    }

    return(
        <Container className="withdrawal-container">
            <h1>회원 탈퇴</h1>
            <Form onSubmit={handleOnRemoveSubmit} className= 'addressList-info'>
                {/*<Form.Group className='info-box'>*/}
                {/*    <Form.Label>비밀번호 확인</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type="password"*/}
                {/*        value={password}*/}
                {/*        onChange={(e) => checkPassword(e)}*/}
                {/*    />*/}
                {/*</Form.Group>*/}

                <Button
                    variant="primary"
                    type="submit"
                    // disabled={password.length < 8}
                    onClick={(e)=>handleOnRemoveSubmit(e, 'N')}
                >
                    탈퇴하기
                </Button>
            </Form>
        </Container>
    )
}

export default Withdrawal;