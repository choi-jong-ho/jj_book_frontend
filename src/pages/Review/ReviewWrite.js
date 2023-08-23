import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import axios from "axios";

const ReviewWrite = ({productValue}) => {
    const navigate = useNavigate();
    const [contents, setContents] = useState('');
    const [rating, setRating] = useState(1);
    const handleReviewSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('contents', contents);
        formData.append('rating', rating);
        formData.append('itemId', productValue.id);

        try {
            const response = await axios.post('/review/new', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            alert('리뷰 등록 성공');
            navigate(`/admin/item/detail/${productValue.id}`);
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
                <h2>리뷰 보내기</h2>
                <Form onSubmit={handleReviewSubmit}>
                    <div className='info-box-wrap'>
                        <Form.Group className='info-box'>
                            <Form.Label>별점</Form.Label>
                            <Form.Control
                                type="number"
                                min={1}
                                max={5}
                                value={rating}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group className='info-box'>
                            <Form.Label>리뷰 내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={contents}
                                onChange={(e) => handleContentChange(e)}
                            />
                        </Form.Group>
                    </div>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        저장하기
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ReviewWrite;