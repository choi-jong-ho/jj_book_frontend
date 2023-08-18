import React from "react";
import {Table, Button} from "react-bootstrap";
import axios from "axios";

const AddressList = ({addrData}) => {

    const addressDelete = async (addId) => {
        try {
            const formData = {
                id: addId
            }
            const response = await axios.post(`/address/delete`, formData);
            console.log('response', response);
            alert('주소 삭제가 정상적으로 처리되었습니다.');
        } catch (e) {
            console.log('주소 삭제 실패', e);
        }
    }

    const addressEdit = async (addId) => {
        console.log('addrData', addrData);
        try {
            const formData = {
                addrCategory: '4',
                address: addrData.address,
                addressDetail: addrData.addressDetail,
                id: addId,
                postcode: addrData.postcode,
                repAddYn: 'N'
            }
            const response = await axios.post(`/address/${addId}`, formData);
            console.log('response', response);
            alert('주소 삭제가 정상적으로 처리되었습니다.');
        } catch (e) {
            console.log('주소 삭제 실패', e);
        }
    }

    return (
        <div className='addressList-container'>
            <Table className='list-table' bordered hover>
                <thead>
                <tr>
                    <td className='cart-list-td'>
                        <input type="checkbox" id='checkAll' />전체 선택
                    </td>
                    <td className='cart-list-td'>수령인</td>
                    <td className='cart-list-td'>주소</td>
                    <td className='cart-list-td'>수정/삭제</td>
                </tr>
                </thead>
                <tbody>
                {
                    addrData.map(add => (
                        <tr key={add.id}>
                            <td>
                                <div className='cart-list-item-checkBox'>
                                    <input type='checkbox' value={add.id}/>
                                </div>
                            </td>
                            <td>
                                <div className='cart-item-warp'>
                                    <span>{add.createdBy}</span>
                                </div>
                            </td>
                            <td>
                                <div className='cart-list-item-total-price'>
                                    <span>우편 번호: {add.postcode}</span>
                                    <span>{add.address + add.addressDetail}</span>
                                </div>
                            </td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={()=>addressEdit(add.id)}
                                >
                                    수정
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={()=>addressDelete(add.id, addrData)}
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

export default AddressList;