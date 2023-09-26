// 토큰을 만드는 함수
import {GET} from "./fetch-auth-action";

export const createTokenHeader = (token) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
}
// 토큰의 만료시간을 계산하는 함수
export const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};

// localStorage 내부에 저장해주는 함수
export const loginTokenHandler = (token, expirationTime) => {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', String(expirationTime));

    const remainingTime = calculateRemainingTime(expirationTime);
    return remainingTime;
}
export const getUserActionHandler = async (token) => {
    try {
        const URL = '/member/me';
        const response = await GET(URL, createTokenHeader(token));
        return response;
    } catch (error) {
        console.error("getUserActionHandler 오류 : ", error);
        // 에러가 발생한 경우에는 null을 반환하거나 적절한 처리를 추가하세요.
        return null;
    }
};

// 로그아웃
export const logoutActionHandler = () => {
    localStorage.removeItem('login-token');
    localStorage.removeItem('user');
};

export const loginItemSetting = () => {
    let now = new Date().getTime(); // 현재 날짜와 시간
    const timeLimit = 1000 * 60 * 60 * 3; // 3시간
    localStorage.setItem('expirationTime', now + timeLimit);
}

// 만료 시간 경과
export const loginExpiration = () => {
    let now = new Date().getTime(); // 현재 날짜와 시간
    const getLoginExpiration = localStorage.getItem('expirationTime');

    if (now > getLoginExpiration) {
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('user');
        localStorage.removeItem('login-token');
    }
}