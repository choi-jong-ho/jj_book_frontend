import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
const Main = () => {
    const movePage = useNavigate();
    const goLogin = () =>{
        movePage('/Login')
    }

    const goSignUp = () =>{
        movePage('/SignUp')
    }
    return(
        <div>
            <h1>여긴 메인 페이지</h1>
            <Button variant="primary" onClick={goLogin}>로그인</Button>
            <Button variant="primary" onClick={goSignUp}>회원가입</Button>
        </div>
    )
}

export default Main;