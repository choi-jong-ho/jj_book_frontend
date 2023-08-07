import React, {useContext, useEffect, useState} from "react";
import {Form, Button, Container} from 'react-bootstrap';
import AddressSearch from "../../modal/AddressSearch";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import '../../css/pages/myPage/addressList.css'
import axios from "axios";

const AddAdress = () => {
    const {isLoggedIn, user} = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [nickname, setNickname] = useState('');
    const [isDefault, setIsDefault] = useState('N');
    const [validation, setValidation] = useState({address1: ''});

    useEffect(() => {
        // checkUser();
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
            address1,
            address2,
            nickname,
            isDefault,
        };

        // setValidation 새 객체로 초기화하여 이전 검사 결과를 제거합니다.
        setValidation({
            email: '',
            address1: '',
            address2: '',
            nickname: '',
            isDefault: '',
        });

        try {

            const response = await axios.post('/member/addressreg', formData);

            console.log('거주지 추가', response);
            navigate('/mypage/main');
        } catch (error) {
            console.log('에러 발생');
        }
    };

    const handleChangeCheckBox = (event) => {
        setNickname(event.target.value);
    };

    const handleChangeBasicPath = (event) => {
        if (isDefault === 'N') {
            setIsDefault('Y');
        }
        if (isDefault === 'Y') {
            setIsDefault('N');
        }
    };

    return (
        <div className="add-address-container">
            <h1>주소지 추가</h1>
            <Form onSubmit={handleSubmit} className= 'addressList-info'>
                <AddressSearch address={address1} setAddress={setAddress1} validation={validation}/>

                {/* 주소 값이 있을 때만 상세 주소 입력 상자 표시 */}
                {address1 && (
                    <Form.Group className='info-box'>
                        <Form.Label>상세 주소</Form.Label>
                        <Form.Control
                            type="text"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
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
                            value="집"
                            checked={nickname === '집'}
                            onChange={(e) => handleChangeCheckBox(e)}
                        />
                        <Form.Check
                            className='check-box'
                            type="radio"
                            label='회사'
                            value="회사"
                            checked={nickname === '회사'}
                            onChange={(e) => handleChangeCheckBox(e)}
                        />
                        <Form.Check
                            className='check-box'
                            type="radio"
                            label='친적'
                            value="친적"
                            checked={nickname === '친적'}
                            onChange={(e) => handleChangeCheckBox(e)}
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
        </div>
    )
}

export default AddAdress;