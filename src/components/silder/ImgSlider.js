import React, {useState, useRef, useEffect} from "react";
import {Button} from 'react-bootstrap';
import '../../css/slider/imgSlider.css';

const ImgSlider = () => {
    const slideRef = useRef();
    const loopInterval = useRef(null);

    const [slideWidth, setSlideWidth] = useState(0);
    const [curSlide, setCurSlide] = useState(1);
    // 드래그(스와이프) 이벤트를 위한 변수 초기화
    const [startPoint, setStartPoint] = useState(0);
    const [endPoint, setEndPoint] = useState(0);

    const [slides, setSlides] = useState([]);

    let testArr = ['1', '2', '3', '4', '5'];

    useEffect(() => {
        // 무한 슬라이드를 위한 시작, 끝 슬라이드 복사
        const startSlide = testArr[0];
        const endSlide = testArr[testArr.length - 1];

        const newSlides = [endSlide, ...testArr, startSlide];

        // 업데이트된 새로운 슬라이드 배열 설정
        setSlides(newSlides);

        setSlideWidth(slideRef.current.clientWidth); // 현재 슬라이드의 너비를 구함

        setCurSlide(2);
    }, []);

    const moveToSlide = (direction) => {
        if (direction === "next") {
            setCurSlide(curSlide < slides.length - 2 ? curSlide + 1 : 1);
        }

        if (direction === "prev") {
            setCurSlide(curSlide > 1 ? curSlide - 1 : slides.length - 2);
        }
    };

    useEffect(() => {
        loopInterval.current = setInterval(() => {
            // handleNextMove();
            moveToSlide('next');
        }, 3000);

        // 정리 함수
        return () => {
            // 인터벌 중지, 메모리 누수 방지 효과
            clearInterval(loopInterval.current);
        };
    }, [moveToSlide]);

    const handlePaginationClick = (index) => {
        setCurSlide(index + 2);
    };

    const handleMouseDown = (e) => {
        setStartPoint(e.pageX); // 마우스 드래그 시작 위치 저장
    };

    const handleMouseUp = (e) => {
        setEndPoint(e.pageX);
        moveToSlide(startPoint < endPoint ? "prev" : "next");
    };

    const handleMouseEnterLeave = (enter) => {
        if (enter) {
            clearInterval(loopInterval.current);
        } else {
            loopInterval.current = setInterval(() => moveToSlide("next"), 3000);
        }
    };

    return (
        <div className='slide-wrap'>
            <Button className="slide_prev_button slide_button" onClick={() => moveToSlide('prev')}>◀</Button>
            <div
                ref={slideRef}
                className='slide'
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseEnter={() => handleMouseEnterLeave(true)}
                onMouseLeave={() => handleMouseEnterLeave(false)}
            >
                {slides.map((x, index) => (
                    <div
                        className='slide_item'
                        key={x}
                        style={{
                            transform: `translateX(${-slideWidth * (curSlide - 1)}px)`,
                        }}
                    >
                        {x}
                    </div>
                ))}
            </div>
            <ul className="slide_pagination">
                {testArr.map((_, index) => (
                    <li
                        key={index}
                        onClick={() => handlePaginationClick(index)}
                        className={index === curSlide - 2 ? 'active' : ''}
                    >
                        •
                    </li>
                ))}
            </ul>
            <Button className="slide_next_button slide_button" onClick={() => moveToSlide('next')}>▶</Button>
        </div>
    )
}

export default ImgSlider;