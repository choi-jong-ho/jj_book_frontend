import React, {useEffect, useRef, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import './ReviewEdit.css';

const ReviewEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const reviewId = location.state.id;
    const reviewData = location.state.data;
    const [name, setName] = useState('');
    const [contents, setContents] = useState('');
    const [rating, setRating] = useState(0);
    const starSpan = useRef(null);

    useEffect(() => {
        console.log('reviewData', reviewData);
        console.log('reviewId', reviewId);
        setName(reviewData.itemNm);
        setRating(reviewData.rating);
        setContents(reviewData.contents);
    }, []);

    useEffect(() => {
        if (starSpan.current) {
            starSpan.current.style.width = `${rating * 17}px`;
        }
    }, [rating]);
    const handleReviewEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('contents', contents);
        formData.append('rating', rating);
        formData.append('id', reviewId);

        try {
            const response = await axios.post(`/review/update/${reviewId}`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            console.log('리뷰 수정 응답', response);
            alert('리뷰 수정 성공');
            // navigate(`/admin/item/detail/${itemId}`);
        } catch (e) {
            console.log('리뷰 수정 오류 내용', e);
        };
    };

    const handleInputChange = (e) => {
        setRating(e.target.value);
    };

    const handleContentChange = (e) => {
        setContents(e.target.value);
    }

    return (
        <div className='review-edit-container'>
            <div className='review-edit-title'>
                <h2>리뷰 수정</h2>
            </div>
            <div className='review-wrap'>
                <Form onSubmit={handleReviewEditSubmit}>
                    <div className='review-box'>
                        <Form.Group className='review-item-name'>
                            <div className='item-name'>상품 이름</div>
                            <span>{name}</span>
                        </Form.Group>
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
                            수정하기
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default ReviewEdit;