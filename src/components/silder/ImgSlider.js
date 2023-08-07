import React, {useState, useRef, useEffect} from "react";
import {Button} from 'react-bootstrap';
import '../../css/slider/imgSlider.css';
// import { debounce } from 'lodash';

const ImgSlider = () => {
    const slideRef = useRef();
    const [slideWidth, setSlideWidth] = useState(0);
    let curSlide = 1;
    let testArr = ['1', '2', '3', '4', '5']

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
        setSlideWidth(slideRef.current.clientWidth);
    }, []);

    const moveSlide = (direction) => {
        curSlide += direction;
        if (curSlide <= testArr.length && curSlide > 0) {
            const offset = slideWidth * (curSlide - 1);
            // Array.from(slideRef.current.children).forEach((item) => {
            //     item.style.left = `-${offset}px`;
            // });
            Array.from(document.querySelectorAll(".slide_item")).forEach((item) => {
                item.style.left = `-${offset}px`;
            });
        } else {
            curSlide -= direction;
        }
    };

    const updatePagination = () => {
        Array.from(document.querySelectorAll(".slide_pagination > li")).forEach(
            (item, index) => {
                if (index === curSlide - 1) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            }
        );
    };

    const handlePaginationClick = (index) => {
        curSlide = index + 1;
        const offset = slideWidth * (curSlide - 1);
        Array.from(slideRef.current.children).forEach((item) => {
            item.style.left = `-${offset}px`;
        });

        updatePagination();
    };

    return (
        <div className='slide-wrap'>
            <Button className="slide_prev_button slide_button" onClick={() => moveSlide(-1)}>◀</Button>
            <div ref={slideRef} className='slide'>
                {
                    testArr.map((x) => {
                        return <div className='slide_item' key={x}>{x}</div>
                    })
                }
            </div>
            <ul className="slide_pagination">
                {Array.from({length: testArr.length}).map((_, index) => (
                    <li key={index} onClick={() => handlePaginationClick(index)}>
                        •
                    </li>
                ))}
            </ul>
            <Button className="slide_next_button slide_button" onClick={() => moveSlide(1)}>▶</Button>
        </div>
    )
}

export default ImgSlider;