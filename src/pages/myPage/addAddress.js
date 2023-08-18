import React, {useContext, useEffect, useState} from "react";
import {Form, Button, Container} from 'react-bootstrap';
import AddressSearch from "../../modal/AddressSearch";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import '../../css/pages/myPage/addressList.css'
import axios from "axios";
import addressList from "./AddressList";
import AddressList from "./AddressList";

const AddAddress = () => {
    const {isLoggedIn, user} = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [validation, setValidation] = useState({address1: ''});
    const [addressObj, setAddressObj] = useState({
        address: '',
        addressDetail: '',
        postcode: '',
        addrCategory: '',
        repAddYn: 'Y'
    });

    // getADD
    const [addrData, setAddrData] = useState([]);

    useEffect(() => {
        // checkUser();
        getAddrList();
    }, []);

    const checkUser = () => {
        if (!isLoggedIn) {
            navigate('/auth/login');
        } else {
            setEmail(user.email);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email,
            repAddYn: addressObj.repAddYn,
            address: addressObj.address,
            addressDetail: addressObj.addressDetail,
            postcode: addressObj.postcode,
            addrCategory: addressObj.addrCategory,
        };

        // setValidation 새 객체로 초기화하여 이전 검사 결과를 제거합니다.
        setValidation({
            email: '',
            address: '',
            addressDetail: '',
            addrCategory: '',
            isDefault: '',
        });

        try {

            const response = await axios.post('/address/new', formData);

            console.log('거주지 추가', response);
            navigate('/mypage/main');
        } catch (error) {
            console.log('에러 발생');
        }
    };

    const getAddrList = async (newPage) => {
        try {
            let response = {};

            if(newPage) {
                response = await axios.get(`/address/list/${newPage}`);
            }
            if(!newPage) {
                response = await axios.get('/address/list');
            }
            console.log('주소 가져오기 response', response);
            const data = response.data[0].content;
            setAddrData(data);
        } catch (e) {
            console.log('주소목록 조회 오류', e);
        }
    }

    const handleChangeBasicPath = (event) => {
        let updateAddressObj = {...addressObj}
        if (updateAddressObj['repAddYn'] === 'N') {
            updateAddressObj['repAddYn'] = 'Y';
        }
        if (updateAddressObj['repAddYn'] === 'Y') {
            updateAddressObj['repAddYn'] = 'N';
        }
    };

    const handleAddressChange = (e, key) => {
        let updateAddressObj = {...addressObj}
        updateAddressObj[key] = e.target.value;
        setAddressObj(updateAddressObj);
    }

    return (
        <div className="add-address-container">
            <h1>주소지 추가</h1>
            <Form onSubmit={handleSubmit} className='addressList-info'>
                <AddressSearch addressObj={addressObj} setAddressObj={setAddressObj}/>

                {/* 주소 값이 있을 때만 상세 주소 입력 상자 표시 */}
                {addressObj.address && (
                    <Form.Group className='info-box'>
                        <Form.Label>상세 주소</Form.Label>
                        <Form.Control
                            type="text"
                            value={addressObj.addressDetail}
                            onChange={(e) => handleAddressChange(e, 'addressDetail')}
                            placeholder="상세 주소를 입력해주세요"
                        />
                    </Form.Group>
                )}

                <Form.Group className='info-box'>
                    <Form.Label>배송지 분류</Form.Label>
                    <div className='check-box-container'>
                        <Form.Check
                            className='check-box'
                            type="radio"
                            label='집'
                            value="1"
                            checked={addressObj.addrCategory === '1'}
                            onChange={(e) => handleAddressChange(e, 'addrCategory')}
                        />
                        <Form.Check
                            className='check-box'
                            type="radio"
                            label='회사'
                            value="2"
                            checked={addressObj.addrCategory === '2'}
                            onChange={(e) => handleAddressChange(e, 'addrCategory')}
                        />
                        <Form.Check
                            className='check-box'
                            type="radio"
                            label='친적'
                            value="3"
                            checked={addressObj.addrCategory === '3'}
                            onChange={(e) => handleAddressChange(e, 'addrCategory')}
                        />
                    </div>
                </Form.Group>

                <Form.Group className='info-box'>
                    <Form.Label>기본 배송지로 저장</Form.Label>
                    <Form.Check
                        className='switch'
                        type="switch"
                        onChange={handleChangeBasicPath}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                >
                    추가하기
                </Button>
            </Form>
            <AddressList addrData={addrData}/>
        </div>
    )
}

export default AddAddress;