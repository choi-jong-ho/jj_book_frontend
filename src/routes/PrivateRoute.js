import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {

    const token = localStorage.getItem('login-token');

    if (token) return <Outlet/>;

    const confirmNavigation = window.confirm("로그인이 필요한 페이지입니다.\n로그인 페이지로 이동하시겠습니까?");

    return <Navigate replace to={confirmNavigation ? "/member/login" : "/"} />;
}

export default PrivateRoute;