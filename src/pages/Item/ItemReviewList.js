import React, { useEffect, useState, useContext } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import './ItemReviewList.css';

const ItemReviewList = () => {
  const { itemId } = useParams();
  const { state } = useContext(AuthContext);
  const [reviewData, setReviewData] = useState([]);

  const reviewAll = async () => {
    const formData = {
      itemId: itemId,
    };
    try {
      const response = await axios.get(`/review/listAll`, {
        headers: {
          'Content-Type': 'Application/json',
          'X-AUTH-TOKEN': state.token,
        },
        params: formData,
      });
      setReviewData(response.data[0].content);
    } catch (e) {
      console.log('상품 리뷰 가져오기 에러', e);
    }
  };

  useEffect(() => {
    reviewAll();
  }, []);

  const likeUnLikeButton = async (reviewId) => {
    if (!state.token) {
      window.alert('로그인이 필요한 기능입니다.');
      return;
    }

    try {
      await axios.post(
        `/like/${reviewId}`,
        {},
        {
          headers: {
            'Content-Type': 'Application/json',
            'X-AUTH-TOKEN': state.token,
          },
        }
      );
      reviewAll();
    } catch (e) {
      if (e.response.status == 400) {
        if (
          window.confirm(`이미 좋아요 버튼을 누르셨습니다. 취소하시겠습니까?`)
        ) {
          cancelButton(reviewId);
        }
      }
      console.log(`리뷰 좋아요 실패`, e);
    }
  };

  const cancelButton = async (reviewId) => {
    if (!state.token) {
      window.alert('로그인이 필요한 기능입니다.');
      return;
    }

    try {
      await axios.post(
        `/like/cancel/${reviewId}`,
        {},
        {
          headers: {
            'Content-Type': 'Application/json',
            'X-AUTH-TOKEN': state.token,
          },
        }
      );
      reviewAll();
    } catch (e) {
      console.log(`리뷰 좋아요 취소 실패`, e);
    }
  };

  return (
    <div className='product-review-table'>
      {reviewData.length > 0 ? (
        <Table
          className='review-table'
          bordered
          hover
        >
          <thead>
            <tr>
              <td className='review-writer'>작성자</td>
              <td className='review-star'>별점</td>
              <td className='review-conment'>내용</td>
            </tr>
          </thead>
          <tbody>
            {reviewData.map((review) => (
              <tr>
                <td>{review.email}</td>
                <td>
                  <div className='null-star'>
                    ★★★★★
                    <span
                      className='fill-star'
                      style={{ width: `${review.rating * 17}px` }}
                    >
                      ★★★★★
                    </span>
                  </div>
                </td>
                <td className='review-content'>{review.contents}</td>
                <td className='review-button'>
                  <button
                    className='like-button'
                    onClick={() => likeUnLikeButton(review.reviewId)}
                  >
                    ♡ 좋아요 {review.likeCount}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <span>아직 작성된 리뷰가 없습니다.</span>
      )}
    </div>
  );
};

export default ItemReviewList;
