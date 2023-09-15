import React, {useEffect} from "react";
import KakaoLogin from "react-kakao-login";
import './KaKaoAuth.css';
const KakaoAuth = () =>{
    const JAVA_SCRIPT_API_KEY='139ab3d09d8f122781ceba9017cebae2' //REST API KEY
    const redirect_uri = 'http://localhost:8080/kakaoAuth' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${JAVA_SCRIPT_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }

    return(
            <img className='kakao-login-img' src='/images/login/kakao_login.png' onClick={handleLogin}/>
    )
}

export default KakaoAuth;