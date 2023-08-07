import React, {useState, useRef, useEffect} from "react";
import {Button} from 'react-bootstrap';
import '../../css/slider/imgSlider.css';

const ImgSlider = () => {
    const slideRef = useRef();
    const [slideWidth, setSlideWidth] = useState(0);
    const [curSlide, setCurSlide] = useState(1);
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
        setSlideWidth(slideRef.current.clientWidth); // 현재 슬라이드의 너비를 구함
    }, []);

    const moveSlide = (direction) => {
        const newSlide = curSlide + direction;

        if (newSlide <= testArr.length && newSlide > 0) {
            setCurSlide(newSlide);
        }
    };

    const handlePaginationClick = (index) => {
        setCurSlide(index + 1);
    };

    return (
        <div className='slide-wrap'>
            <Button className="slide_prev_button slide_button" onClick={() => moveSlide(-1)}>◀</Button>
            <div ref={slideRef} className='slide'>
                {testArr.map((x, index) => (
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
                        className={index === curSlide - 1 ? 'active' : ''}
                    >
                        •
                    </li>
                ))}
            </ul>
            <Button className="slide_next_button slide_button" onClick={() => moveSlide(1)}>▶</Button>
        </div>
    )
}

export default ImgSlider;