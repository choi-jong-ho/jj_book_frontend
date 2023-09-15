import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const ProtectRoute = () => {
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user);
    console.log('user', userData);

    if(user) {
        if (userData.role === "ADMIN") {
            return <Outlet />
        } else {
            alert('기능을 사용할 권한이 없습니다. 죄송합니다.');
            return <Navigate replace to="/"/>;
        }
    } else {
        const confirmNavigation = window.confirm("로그인이 필요한 페이지입니다.\n로그인 페이지로 이동하시겠습니까?");
        return <Navigate replace to={confirmNavigation ? "/member/login" : "/"} />;
    }
}
export default ProtectRoute;