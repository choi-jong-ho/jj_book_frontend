import React from 'react';
import ShopSection from "../partials/ShopSection";

const Main = () => {

    return(
        <div>
            <div className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">상품 이미지 슬라이드 공간(추후 분리)</h1>
                        <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
                    </div>
                </div>
            </div>
            <ShopSection />
        </div>
    )
}

export default Main;