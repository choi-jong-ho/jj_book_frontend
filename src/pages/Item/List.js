import React, {useEffect} from "react";
import {Table} from 'react-bootstrap';
// import axios from "axios";
import './List.css';

const List = () => {

    const data = [
        {id: 1, name: 'John', itemSellStatus: 'SELL', price: 3000},
        {id: 2, name: 'Doe', itemSellStatus: 25, price: 3000},
        {id: 3, name: 'Jane', itemSellStatus: 22, price: 3000},
        {id: 4, name: 'Smith', itemSellStatus: 30, price: 3000},
    ];

    useEffect(() => {
        // getItemList();
    }, []);
    // const getItemList = async () => {
    //     try {
    //         // const response = await axios.get('/admin/item/list', {
    //         const response = await axios.get('/admin/items/2', {
    //             params: {
    //                 searchDateType: "all",
    //                 searchBy: "테스트",
    //             }
    //         });
    //         console.log('받아온 데이터', response);
    //
    //     } catch (e) {
    //         console.log('상품목록 가져오기 에러', e);
    //     }
    // }

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
                        <td>상태</td>
                        <td>가격</td>
                        {/*<td>등록자</td>*/}
                        {/*<td>등록일</td>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(row => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.itemSellStatus}</td>
                            <td>{row.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
        </div>
    )

}

export default List;