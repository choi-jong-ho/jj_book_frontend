import React, {useState, useRef, useEffect} from "react";
import {Button} from 'react-bootstrap';
import '../../css/slider/imgSlider.css';

const ImgSlider = () => {
    const slideRef = useRef();
    const [slideWidth, setSlideWidth] = useState(0);
    const [curSlide, setCurSlide] = useState(1);
    // 드래그(스와이프) 이벤트를 위한 변수 초기화
    const [startPoint, setStartPoint] = useState(0);
    const [endPoint, setEndPoint] = useState(0);

    const [slides, setSlides] = useState([]);

    let testArr = ['1', '2', '3', '4', '5'];

    // 나중에 창의 크기 변화에 따라 슬라이드의 크기도 같이 변화 기능 추가하기 위한 중간 단계 코드

    // useEffect(() => {
    //     const slide = slideRef.current;
    //
    //     const handleResize = debounce(() => {
    //         setSlideWidth(slide.clientWidth);
    //     }, 300);
    //
    //     window.addEventListener("resize", handleResize);
    //
    //     // 컴포넌트가 마운트될 때 초기 slideWidth를 설정합니다.
    //     handleResize();
    //
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);

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

    // const moveSlide = (direction) => {
    //     const newSlide = curSlide + direction;
    //
    //     if (newSlide <= testArr.length && newSlide > 0) {
    //         setCurSlide(newSlide);
    //     }
    // };

// 무한 이후 이동
    const handleNextMove = () => {
        if (curSlide < slides.length - 2) {
            setCurSlide(curSlide + 1);
        } else {
            setCurSlide(1);
        }
    };

// 무한 이전 이동
    const handlePrevMove = () => {
        if (curSlide > 1) {
            setCurSlide(curSlide - 1);
        } else {
            setCurSlide(slides.length - 2);
        }
    };

    const handlePaginationClick = (index) => {
        setCurSlide(index + 2);
    };

    const handleMouseDown = (e) => {
        setStartPoint(e.pageX); // 마우스 드래그 시작 위치 저장
    };

    const handleMouseUp = (e) => {
        setEndPoint(e.pageX); // 마우스 드래그 끝 위치 저장
        if (startPoint < endPoint) {
            // 마우스가 오른쪽으로 드래그 된 경우
            handlePrevMove();
        } else if (startPoint > endPoint) {
            // 마우스가 왼쪽으로 드래그 된 경우
            handleNextMove();
        }
    };

    return (
        <div className='slide-wrap'>
            <Button className="slide_prev_button slide_button" onClick={handlePrevMove}>◀</Button>
            <div
                ref={slideRef}
                className='slide'
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}>
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
            <Button className="slide_next_button slide_button" onClick={handleNextMove}>▶</Button>
        </div>
    )
}

export default ImgSlider;