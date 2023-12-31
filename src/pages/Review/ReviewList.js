import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import AuthContext from '../../store/AuthContext';
import './ReviewList.css';

const ReviewList = () => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    getReviewList();
  }, []);

  const getReviewList = async () => {
    try {
      const response = await axios.get(`/review/list`, {
        headers: { 'X-AUTH-TOKEN': state.token },
      });
      console.log('리뷰 리스트 가져오기', response);
      const data = response.data;
      setReviewData(data[0].content);
    } catch (e) {
      console.log('리뷰 리스트 가져오기 실패', e);
    }
  };

  const goToReviewEdit = (reviewId, data) => {
    navigate(`/mypage/review/edit/${reviewId}`, {
      state: { data: data, id: reviewId },
    });
  };

  const reviewDelete = async (reviewId) => {
    try {
      const formData = {
        reviewId: reviewId,
      };
      await axios.post(`/review/delete`, formData);
      alert('리뷰 삭제 성공');
      await getReviewList();
    } catch (e) {
      console.log('리뷰 삭제 실패', e);
    }
  };
  return (
    <div className='review-list-container'>
      <h2>리뷰 리스트</h2>
      {reviewData ? (
        <Table
          bordered
          hover
        >
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
            {reviewData.map((review) => (
              <tr key={review.reviewId}>
                <td className='review-list-td'>
                  <div>
                    {review.reviewItemDtoList[0].imgUrl && (
                      <img
                        className='review-item-img'
                        src={reviewData.reviewItemDtoList[0].imgUrl}
                        alt='리뷰 이미지'
                      />
                    )}
                  </div>
                </td>
                <td className='review-list-td'>
                  <div className='review-item-title'>
                    <h3>{review.reviewItemDtoList[0].itemNm}</h3>
                  </div>
                </td>
                <td className='review-list-td'>
                  <div className='null-star'>
                    ★★★★★
                    <span
                      className='fill-star'
                      style={{
                        width: `${review.reviewItemDtoList[0].rating * 17}px`,
                      }}
                    >
                      ★★★★★
                    </span>
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
                      variant='success'
                      onClick={() =>
                        goToReviewEdit(
                          review.reviewId,
                          review.reviewItemDtoList[0]
                        )
                      }
                    >
                      수정
                    </Button>
                    <Button
                      variant='danger'
                      onClick={() => {
                        reviewDelete(review.reviewId);
                      }}
                    >
                      삭제
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>작성한 리뷰가 없습니다.</div>
      )}
    </div>
  );
};

export default ReviewList;
