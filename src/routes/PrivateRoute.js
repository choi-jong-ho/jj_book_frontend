import React, {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import AuthContext from "../store/AuthContext";

const PrivateRoute = () => {
    const {isLoggedIn} = useContext(AuthContext);

    if (isLoggedIn) return <Outlet/>;

    const confirmNavigation = window.confirm("로그인이 필요한 페이지입니다.\n로그인 페이지로 이동하시겠습니까?");

    return <Navigate replace to={confirmNavigation ? "/member/login" : "/"} />;
}

export default PrivateRoute;