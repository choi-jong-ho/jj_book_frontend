import React from "react";
import {Table} from 'react-bootstrap';
// import axios from "axios";
import './List.css';

const List = ({itemInfo}) => {

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
                        </tr>
                    ))
                    }
                    </tbody>
                </Table>
        </div>
    )

}

export default List;