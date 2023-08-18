import React, {useCallback} from "react";
import {Table, Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import './List.css';
import axios from "axios";

const List = ({itemInfo}) => {
    const navigate = useNavigate();

    const navigateToEdit = useCallback((itemNumber) => {
        navigate(`/admin/item/${itemNumber}`);
    }, [navigate]);

    const handleDelete = async (id, useYn) => {

        const formData = {
            id: id,
            useYn: useYn,
        };
        try {
            const response = await axios.post('/admin/item/delete', formData);
            alert('상품 삭제 성공');
        } catch (e) {
            if (e.response.status === 400) {
            }
            console.log('오류 내용', e);
        };
    };

    return (
        <div className='list-container'>
            <div className='list-title'>
                <h1>상품 목록</h1>
            </div>
            <Table className='list-table' bordered hover>
                <thead>
                <tr>
                    <td>상품명</td>
                    <td>등록자</td>
                    <td>등록일</td>
                    <td>상태</td>
                    <td>가격</td>
                    <td>기능</td>
                </tr>
                </thead>
                <tbody>
                {
                    itemInfo.map(row => (
                        <tr key={row.id}>
                            <td>{row.itemNm}</td>
                            <td>{row.createdBy}</td>
                            <td>{row.regTime}</td>
                            <td>{row.itemSellStatus === 'SELL' ? '판매중' : '품절'}</td>
                            <td>{row.price}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    className='add-button' ㄹ
                                    type="button"
                                    onClick={() => navigateToEdit(row.id)}
                                >
                                    수정
                                </Button>
                                <Button
                                    variant="danger"
                                    className='add-button'
                                    type="button"
                                    onClick={() => handleDelete(row.id, "N")}
                                >
                                    삭제
                                </Button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    )

}

export default List;