import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import AddressSearch from '../../modal/AddressSearch';
import { useNavigate } from 'react-router-dom';
import './AddrUpload.css';
import axios from 'axios';

const AddAddress = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [addressObj, setAddressObj] = useState({
    address: '',
    addressDetail: '',
    postcode: '',
    addrCategory: '',
    repAddYn: 'N',
  });

  const isFormValid = () => {
    return (
      addressObj.address.length > 0 &&
      addressObj.addressDetail.length > 0 &&
      addressObj.addrCategory.length > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return; // 입력값의 길이가 유효하지 않으면 아무 작업도 실행하지 않음
    }

    const formData = {
      email,
      repAddYn: addressObj.repAddYn,
      address: addressObj.address,
      addressDetail: addressObj.addressDetail,
      postcode: addressObj.postcode,
      addrCategory: addressObj.addrCategory,
    };

    try {
      const response = await axios.post('/address/new', formData);

      console.log('거주지 추가', response);
      navigate('/mypage/address');
    } catch (error) {
      console.log('에러 발생');
    }
  };

  const handleChangeBasicPath = (event) => {
    let updateAddressObj = { ...addressObj };
    if (updateAddressObj.repAddYn === 'N') {
      updateAddressObj.repAddYn = 'Y';
    } else if (updateAddressObj.repAddYn === 'Y') {
      updateAddressObj.repAddYn = 'N';
    }
  };

  const handleAddressChange = (e, key) => {
    let updateAddressObj = { ...addressObj };
    updateAddressObj[key] = e.target.value;
    setAddressObj(updateAddressObj);
  };

  return (
    <div className='add-address-container'>
      <h1>주소지 추가</h1>
      <Form
        onSubmit={handleSubmit}
        className='addressList-info'
      >
        <AddressSearch
          addressObj={addressObj}
          setAddressObj={setAddressObj}
        />
        {/* 주소 값이 있을 때만 상세 주소 입력 상자 표시 */}
        {addressObj.address && (
          <Form.Group className='info-box'>
            <Form.Label>상세 주소</Form.Label>
            <Form.Control
              type='text'
              value={addressObj.addressDetail}
              onChange={(e) => handleAddressChange(e, 'addressDetail')}
              placeholder='상세 주소를 입력해주세요'
            />
          </Form.Group>
        )}
        <Form.Group className='info-box'>
          <Form.Label>배송지 분류</Form.Label>
          <div className='check-box-container'>
            <Form.Check
              className='check-box'
              type='radio'
              label='집'
              value='1'
              checked={addressObj.addrCategory === '1'}
              onChange={(e) => handleAddressChange(e, 'addrCategory')}
            />
            <Form.Check
              className='check-box'
              type='radio'
              label='회사'
              value='2'
              checked={addressObj.addrCategory === '2'}
              onChange={(e) => handleAddressChange(e, 'addrCategory')}
            />
            <Form.Check
              className='check-box'
              type='radio'
              label='친적'
              value='3'
              checked={addressObj.addrCategory === '3'}
              onChange={(e) => handleAddressChange(e, 'addrCategory')}
            />
          </div>
        </Form.Group>
        <Form.Group className='info-box'>
          <Form.Label>기본 배송지로 저장</Form.Label>
          <Form.Check
            className='switch'
            type='switch'
            onChange={handleChangeBasicPath}
          />
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          disabled={!isFormValid()}
        >
          추가하기
        </Button>
      </Form>
    </div>
  );
};

export default AddAddress;
