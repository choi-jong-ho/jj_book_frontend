import React from 'react';
import MainTop from "./mainTop";
import '../../css/pages/main/main.css'

const Main = () => {

    return (
        <div className='main'>
            <div className='main-wrap'>
                <MainTop/>
                <section className='top-section'><h2>탑</h2></section>
                <section className='center-section'><h2>중앙</h2></section>
                <section className='bottom-section'><h2>바텀</h2></section>
            </div>
        </div>
    )
}

export default Main;