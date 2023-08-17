import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const AddressSearch = ({address, setAddress, validation}) => {
    const [showPostcode, setShowPostcode] = useState(false);

    const handlePostcodeComplete = (data) => {
        console.log('handlePostcodeComplete', data)
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setAddress(fullAddress);
        setShowPostcode(false);
    };

    const handleModalToggle = (isOpen) => {
        setShowPostcode(isOpen);
    };


    return (
        <div>
            <InputGroup>
                <Form.Control
                    type="text"
                    value={address}
                    readOnly
                    onClick={() => handleModalToggle(true)}
                    style={{ cursor: 'pointer' }} // 입력 상자를 클릭하여 검색 모달을 여는 것을 나타내기 위해 마우스 포인터 스타일 변경
                    isInvalid={validation.address1 !== ''}
                />
                {/* 유저가 버튼을 클릭하면 handleShowModal 함수가 호출되어 모달창이 열림 */}
                <Button onClick={()=> handleModalToggle(true)}>주소 검색</Button>
                <Form.Control.Feedback type="invalid" className='sign-err-msg'>
                    {validation.address1}
                </Form.Control.Feedback>
            </InputGroup>

            {/* 입력값이 변경되어 모달창이 열릴 때, DaumPostcode 컴포넌트로 주소 검색 기능을 구현 */}
            <Modal show={showPostcode} onHide={()=> handleModalToggle(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>주소 검색</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DaumPostcode onComplete={handlePostcodeComplete} autoClose={true} width={'100%'} height={450} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => handleModalToggle(false)} size='sm'>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddressSearch;