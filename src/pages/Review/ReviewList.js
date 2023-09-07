import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Table} from "react-bootstrap";
import './ReviewList.css';

const ReviewList = () => {
    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        getReviewList();
    }, []);

    const getReviewList = async () => {
        try {
            const response = await axios.get(`/review/list`);
            console.log('리뷰 리스트 가져오기', response);
            const data = response.data;
            setReviewData(data[0].content);
        } catch (e) {
            console.log('리뷰 리스트 가져오기 실패', e);
        }
    }
    return (
        <div className='review-list-container'>
                <h2>리뷰 리스트</h2>
                {
                    reviewData ? (
                        <Table bordered hover>
                            <thead>
                            <tr>
                                <td className='cart-list-td'>리뷰 이미지</td>
                                <td className='cart-list-td'>상품 이름</td>
                                <td className='cart-list-td'>별점</td>
                                <td className='cart-list-td'>내용</td>
                                <td className='cart-list-td'>기능</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                reviewData.map(review => (
                                    <tr key={review.reviewId}>
                                        <td className='review-list-td'>
                                            <div>
                                                {
                                                    review.reviewItemDtoList[0].imgUrl &&
                                                    <img className='review-item-img' src={reviewData.reviewItemDtoList[0].imgUrl} alt='리뷰 이미지'/>
                                                }
                                            </div>
                                        </td>
                                        <td className='review-list-td'>
                                            <div className='review-item-title'>
                                                <h3>{review.reviewItemDtoList[0].itemNm}</h3>
                                            </div>
                                        </td>
                                        <td className='review-list-td'>
                                            <div className='null-star'>★★★★★
                                                <span className='fill-star'
                                                      style={{width: `${review.reviewItemDtoList[0].rating * 17}px`}}>★★★★★</span>
                                            </div>
                                        </td>
                                        <td className='review-list-td'>
                                            <div className='review-item-detail'>
                                                <span>{review.reviewItemDtoList[0].contents}</span>
                                            </div>
                                        </td>
                                        <td className='review-list-td'>
                                            <div className='review-item-func'>
                                                <Button
                                                    variant="success"
                                                >
                                                    수정
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                >
                                                    삭제
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    ) : (
                        <div>작성한 리뷰가 없습니다.</div>
                    )
                }
        </div>
    )
}

export default ReviewList;