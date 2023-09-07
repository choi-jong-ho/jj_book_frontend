import React, {useState, useEffect, useRef} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import './ReviewWrite.css';

const ReviewWrite = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const itemId = location.state.id;
    const [contents, setContents] = useState('');
    const [rating, setRating] = useState(0);
    const starSpan = useRef(null);

    useEffect(() => {
        if (starSpan.current) {
            starSpan.current.style.width = `${rating * 17}px`;
        }
    }, [rating]);
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('contents', contents);
        formData.append('rating', rating);
        formData.append('itemId', itemId);

        try {
            await axios.post('/review/new', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            alert('리뷰 등록 성공');
            navigate(`/admin/item/detail/${itemId}`);
        } catch (e) {
            console.log('리뷰 오류 내용', e);
        };
    };

    const handleInputChange = (e) => {
        setRating(e.target.value);
    };

    const handleContentChange = (e) => {
        setContents(e.target.value);
    }

    return(
        <div className='review-container'>
            <div className='review-wrap'>
                <h2>리뷰 작성</h2>
                <Form onSubmit={handleReviewSubmit}>
                    <div className='review-box'>
                        <Form.Group className='review-rating'>
                            <div className='rating-title'>별점</div>
                            <div className='null-star'>★★★★★
                                <span className='fill-star' ref={starSpan}>★★★★★</span>
                                <div className='star-input-box'>
                                    <input
                                        className='star-input'
                                        type='range'
                                        value={rating}
                                        step='1'
                                        min='0'
                                        max='10'
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className='review-detail'>
                            <Form.Label>리뷰 내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={contents}
                                onChange={(e) => handleContentChange(e)}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            저장하기
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default ReviewWrite;