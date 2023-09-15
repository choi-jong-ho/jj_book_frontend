import React, {useState} from "react";
import { useEffect } from "react";
import axios from "axios"
import {Button} from "react-bootstrap";

const KakaoCallback = () => {
    const params= new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    const grantType = "authorization_code";
    const REST_API_KEY = `139ab3d09d8f122781ceba9017cebae2`;
    const REDIRECT_URI = `http://localhost:8080/kakaoAuth`;
    const SERVICE_APP_ADMIN_KEY = '8d356aba7d75d061b0dacfc8206c3fc3'

    const [kakaoToken, setKakaoToken] = useState('');
    const [kakao, setKakao] = useState();

    useEffect( async () => {
        await getKaKaoData();
    }, []);

    const getKaKaoData = async () => {
        try {
            const response = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`);
            console.log('카카오 데이터', response);
            setKakaoToken(response.data.access_token);
            const { access_token } = response.data;
            const kakaoUser = await axios.post(
                "https://kapi.kakao.com/v2/user/me",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                }
            );
            console.log('kakaoUser 데이터', kakaoUser);
            setKakao(kakaoUser);
        } catch (e) {
            console.log('카카오 데이터 가져오기 실패', e);
        }
    }

    // const kakaoLogOut = async () => {
    //     console.log('kakaoToken', kakaoToken);
    //     try {
    //         const response = await axios.post(`https://kapi.kakao.com/v1/user/logout`, {},{
    //             headers: {
    //                 Authorization: `Bearer ${kakaoToken}`,
    //                 "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    //             },
    //         })
    //         console.log('카카오 로그아웃', response);
    //     } catch (e) {
    //         console.log('카카오 로그아웃 오류', e);
    //     }
    // }

    const kakaoLogOut = async () => {
        console.log('kakaokakaoLogOut', kakao);
        try {
            const response = await axios.post(`https://kapi.kakao.com/v1/user/unlink`, `target_id_type=user_id&target_id=${kakao.data.id}`,{
                headers: {
                    Authorization: `KakaoAK ${SERVICE_APP_ADMIN_KEY}`,
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            console.log('카카오 로그아웃', response);
        } catch (e) {
            console.log('카카오 로그아웃 오류', e);
        }
    }


    // const test = new URL(window.location.href).searchParams.get("code");
    // console.log('code', test);

    return(
        <div>
            <Button variant="primary" onClick={() => kakaoLogOut()}>카카오 로그아웃</Button>
        </div>
    )
}
export default KakaoCallback;