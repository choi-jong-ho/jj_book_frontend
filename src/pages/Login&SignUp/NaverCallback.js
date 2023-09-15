import React, {useEffect} from "react";

const NaverCallback = () => {

    // useEffect(() => {
    //     const code = new URL(window.location.href).searchParams.get("code");
    //     console.log('NaverCallback', code);
    // }, []);
    const code = new URL(window.location.href).searchParams.get("code");
    console.log('NaverCallback', code);

    return(
        <h2>로딩 중~</h2>
    )
}

export default NaverCallback;