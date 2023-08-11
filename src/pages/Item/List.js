import React, {useCallback} from "react";
import {Table} from 'react-bootstrap';
// import axios from "axios";
import { Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import './List.css';

const List = ({itemInfo}) => {
    const navigate = useNavigate();

    const navigateToEdit = useCallback((itemNumber) => {
        navigate(`/admin/item/${itemNumber}`);
    }, [navigate]);

    return (
        <div className='list-container'>
            <div className='list-title'>
                <h1>상품 목록</h1>
            </div>
                <Table className='list-table' bordered hover>
                    <thead>
                    <tr>
                        <td>상품아이디</td>
                        <td>상품명</td>
                        <td>등록자</td>
                        <td>상태</td>
                        <td>가격</td>
                        <td>기능</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        itemInfo.map(row => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.itemNm}</td>
                            <td>{row.createdBy}</td>
                            <td>{row.itemSellStatus}</td>
                            <td>{row.price}</td>
                            <td>
                                <Button
                                variant="secondary"
                                type="button"
                                onClick={() => navigateToEdit(row.id)}
                            >
                                수정
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