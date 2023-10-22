import React, { useEffect, useState } from 'react';
import './AutoImgSlider.css';

const AutoImgSlider = () => {
    const testArr = ['/images/item/book1.png', '/images/item/book2.png', '/images/item/book3.png', '/images/item/book4.png', '/images/item/book5.png'];

    const [curSlide, setCurSlide] = useState(0);

    // Interval ID를 저장할 상태
    const [intervalId, setIntervalId] = useState(null);
    const MOVE_SLIDE_INDEX = 1;
    const FIRST_SLIDE_INDEX = 0;
    const LAST_SLIDE_INDEX = testArr.length - 1;
    const SLIDE_WIDTH = 1000;

    const autoMoveSlide = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }

        setIntervalId(
            setInterval(() => {
                setCurSlide((prevState) =>
                    prevState < LAST_SLIDE_INDEX
                        ? prevState + MOVE_SLIDE_INDEX
                        : FIRST_SLIDE_INDEX
                );
            }, 3000)
        );
    };

    useEffect(() => {
        autoMoveSlide();

        return () => clearInterval(intervalId);
    }, []);

    const moveToSlide = (value) => {
        if (value === 'next') {
            // 슬라이드 끝점에 도달했을 때 curSlide의 값을 바꿔 처음으로 돌아가게 한다.
            setCurSlide((prevState) =>
                prevState <= LAST_SLIDE_INDEX - MOVE_SLIDE_INDEX
                    ? prevState + MOVE_SLIDE_INDEX
                    : FIRST_SLIDE_INDEX
            );
        }
        if (value === 'prev') {
            // 슬라이드 시작점에 도달했을 때 curSlide의 값을 바꿔 마지막으로 돌아가게 한다.
            setCurSlide((prevState) =>
                prevState > FIRST_SLIDE_INDEX
                    ? prevState - MOVE_SLIDE_INDEX
                    : LAST_SLIDE_INDEX
            );
        }
    };

    const handlePaginationClick = (index) => {
        setCurSlide(index);
        autoMoveSlide();
    };

    return (
        <div className='slide-container'>
            <div className='slide-left'>
                <img onClick={() => moveToSlide('prev')} width="25" height="25" src="https://img.icons8.com/ios-filled/50/back.png" alt="이전"/>
            </div>
            <div className='slide-wrap'>
                <div className='slide-main'>
                    {testArr.map((item, index) => (
                        <div
                            className='slide-item'
                            key={index}
                            style={{
                                transform: `translateX(${-SLIDE_WIDTH * curSlide}px)`,
                            }}
                        >
                            <img className='slide-img' src={item} alt='배너 이미지'/>
                        </div>
                    ))}
                </div>
                <ol className='slide-pagination'>
                    {testArr.map((_, index) => (
                        <li
                            key={index}
                            className={`slide-pagination-list ${
                                curSlide === index ? 'current' : ''
                            }`}
                            onClick={() => handlePaginationClick(index)}
                        >
                            {index + 1}
                        </li>
                    ))}
                </ol>
            </div>
            <div className='slide-right'>
                <img onClick={() => moveToSlide('next')} width="25" height="25" src="https://img.icons8.com/ios-filled/50/forward--v1.png" alt="다음"/>
            </div>
        </div>
    );
};

export default AutoImgSlider;
