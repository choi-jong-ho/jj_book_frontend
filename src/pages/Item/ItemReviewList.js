import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import axios from "axios";
import {useParams} from "react-router-dom";
import './ItemReviewList.css';

const ItemReviewList = () => {
    const {itemId} = useParams();
    const [reviewData, setReviewData] = useState([]);
    const reviewAll = async () => {

        const formData = {
            itemId: itemId
        }
        try {
            const response = await axios.get(`/review/listAll`, {
                params: formData
            });
            setReviewData(response.data[0].content);
            console.log('reviewAll', response);
        } catch (e) {
            console.log('상품 리뷰 가져오기 에러', e);
        }
    }

    useEffect(() => {
        reviewAll();
    }, []);

    return (
        <div className='product-review-table'>
            {reviewData.length > 0 ? <Table className='review-table' bordered hover>
                <thead>
                <tr>
                    <td className='review-writer'>작성자</td>
                    <td className='review-star'>별점</td>
                    <td className='review-conment'>내용</td>
                </tr>
                </thead>
                <tbody>
                {
                    reviewData.map(review => (
                        <tr>
                            <td className='review-writer'>{review.email}</td>
                            <td>
                                <div className='null-star'>★★★★★
                                    <span className='fill-star'
                                          style={{width: `${review.rating * 17}px`}}>★★★★★</span>
                                </div>
                            </td>
                            <td className='review-content'>{review.contents}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table> : <span>아직 작성된 리뷰가 없습니다.</span>}
        </div>
    )
}

export default ItemReviewList;