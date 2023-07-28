import React from "react";
import '../../css/pages/myPage/myPageMain.css';
import Aside from "./aside";

const MyPageMain = () => {
    return (
        <div className='my-page-wrap'>
            <Aside />
            <div className='my-page-content'><h2>마이페이지 메인</h2></div>
        </div>
    )
}

export default MyPageMain;