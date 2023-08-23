import React, {useCallback, useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom';
import {Table, Button} from "react-bootstrap";
import axios from "axios";
import '../../css/pages/myPage/AddressList.css';

const AddressList = () => {
    const navigate = useNavigate();
    const [addrData, setAddrData] = useState([]);

    useEffect(() => {
        getAddrList();
    }, []);

    const getAddrList = async (newPage) => {
        try {
            let response = {};

            if(newPage) {
                response = await axios.get(`/address/list/${newPage}`);
            }
            if(!newPage) {
                response = await axios.get('/address/list');
            }
            const data = response.data[0].content;
            setAddrData(data);
        } catch (e) {
            console.log('주소목록 조회 오류', e);
        }
    }

    const addressDelete = async (addId) => {
        try {
            const formData = {
                id: addId
            }
            const response = await axios.post(`/address/delete`, formData);
            console.log('response', response);
            alert('주소 삭제가 정상적으로 처리되었습니다.');
            getAddrList();
        } catch (e) {
            console.log('주소 삭제 실패', e);
        }
    }

    const navigateToEdit = useCallback((addrId) => {
        navigate(`/mypage/addrEdit/${addrId}`);
    }, [navigate]);

    const primaryAddr = async (add) => {
        try {
            const formData = {
                addrCategory: add.addrCategory,
                address: add.address,
                addressDetail: add.addressDetail,
                id: add.id,
                postcode: add.postcode,
                repAddYn: 'Y'
            }
            const response = await axios.post(`/address/${add.id}`, formData);
            console.log('response', response);
            alert('기본 주소 설정 완료');
            getAddrList();
        } catch (e) {
            console.log('기본 주소 설정 실패', e);
        }
    }

    const goToUploadAddr = () => {
        navigate('/mypage/addrupload');
    }

    return (
        <div className='addressList-container'>
            <Table className='list-table' bordered hover>
                <thead>
                <tr>
                    <td className='address-list-td'>주소</td>
                    <td className='address-list-td'>기능</td>
                </tr>
                </thead>
                <tbody>
                {
                    addrData.map(add => (
                        <tr key={add.id}>
                            <td>
                                <div className='address-list-item'>
                                    {
                                        add.repAddYn === 'Y' ?
                                            (<span>대표 주소</span>) : null
                                    }
                                    <span>우편 번호: {add.postcode}</span>
                                    <span>{add.address + ' ' + add.addressDetail}</span>
                                </div>
                            </td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => navigateToEdit(add.id)}
                                >
                                    수정
                                </Button>
                                {
                                    add.repAddYn === 'Y' ?
                                        null : (
                                            <Button
                                                variant="danger"
                                                onClick={() => addressDelete(add.id, addrData)}
                                            >
                                                삭제
                                            </Button>
                                        )
                                }
                                {
                                    add.repAddYn === 'Y' ?
                                        null : (
                                            <Button
                                                variant="success"
                                                onClick={() => primaryAddr(add)}
                                            >
                                                기본 주소 설정
                                            </Button>
                                        )
                                }
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
            <Button
                variant="primary"
                onClick={goToUploadAddr}
            >
                배송지 추가하기
            </Button>
        </div>
    )
}

export default AddressList;