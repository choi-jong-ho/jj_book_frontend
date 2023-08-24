import React, {useEffect} from "react";
import axios from "axios";

const ReviewList = () => {

    useEffect(() => {
        getReviewList();
    }, []);

    const getReviewList = async () => {
        try {
            const response = await axios.get(`/review/list`);
            console.log('리뷰 리스트 가져오기', response);
        } catch (e) {
            console.log('리뷰 리스트 가져오기 실패', e);
        }

    }
    return (
        <div className='review-list-container'>
            <div className='review-list-wrap'>
                <h1>리뷰 리스트</h1>
            </div>
        </div>
    )
}

export default ReviewList;