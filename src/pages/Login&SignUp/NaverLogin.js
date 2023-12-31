// import React from "react";
//
// const NaverLogin = () => {
//     const NAVER_CLIENT_ID = 'A5jzUyS3PBAw_HQ7lN3R';
//     const REDIRECT_URL= 'http://localhost:8080/naverlogin';
//     const STATE = 'false';
//     const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URL}`;
//
//     const login = () => {
//         window.location.href = NAVER_AUTH_URL;
//     }
//     return(
//         <button onClick={login}>네이버 로그인</button>
//     )
// }
//
// export default NaverLogin;

import React from "react";
import { useEffect } from 'react'

const NaverLogin = () => {


    const { naver } = window
    const NAVER_CLIENT_ID = 'A5jzUyS3PBAw_HQ7lN3R'; // 발급 받은 Client ID 입력
    const NAVER_CALLBACK_URL = 'http://localhost:8080/naverlogin'; // 작성했던 Callback URL 입력

    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            // 팝업창으로 로그인을 진행할 것인지?
            isPopup: false,
            // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
            loginButton: { color: 'green', type: 3, height: 48 },
            callbackHandle: true,
        })
        naverLogin.init()

        // 선언된 naverLogin 을 이용하여 유저 (사용자) 정보를 불러오는데
        // 함수 내부에서 naverLogin을 선언하였기에 지역변수처리가 되어
        // userinfo 정보를 추출하는 것은 지역변수와 같은 함수에서 진행주어야한다.

        // 아래와 같이 로그인한 유저 ( 사용자 ) 정보를 직접 접근하여 추출가능하다.
        // 이때, 데이터는 첫 연동시 정보 동의한 데이터만 추출 가능하다.

        // 백엔드 개발자가 정보를 전달해준다면 아래 요기! 라고 작성된 부분까지는
        // 코드 생략이 가능하다.

        naverLogin.getLoginStatus(async function (status) {
            if (status) {
                // 아래처럼 선택하여 추출이 가능하고,
                const userid = naverLogin.user.getEmail()
                const username = naverLogin.user.getName()
                // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
                // setUserInfo(naverLogin.user)
            }
        })
        // 요기!
    }

    // 네이버 소셜 로그인 (네아로) 는 URL 에 엑세스 어스코드가 붙어서 전달된다.
    // 우선 아래와 같이 어스코드를 추출 할 수 있으며,
    // 3부에 작성 될 Redirect 페이지를 통해 빠르고, 깨끗하게 처리가 가능하다.

    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken()
    }

    const getToken = () => {
        const token = window.location.href.split('=')[1].split('&')[0]
        // console.log, alert 창을 통해 어스코드가 잘 추출 되는지 확인하자!

        // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
        // localStorage.setItem('access_token', token)
        // setGetToken(token)
    }

    useEffect(() => {
        initializeNaverLogin()
        userAccessToken()
        console.log('네이버 로그인');
    }, []);

    return (
        <div id="naverIdLogin"></div>
    )

}

export default NaverLogin;