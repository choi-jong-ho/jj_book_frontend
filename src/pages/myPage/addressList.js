import React, {useContext, useEffect, useState} from "react";
import {Form, Button, Container} from 'react-bootstrap';
import AddressSearch from "../../modal/AddressSearch";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import '../../css/pages/myPage/addressList.css'

const AddressList = () => {
    const {isLoggedIn, user} = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [nickname, setNickname] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [isBasic, setIsBasic] = useState('N');
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
            isBasic,
        };

        // setValidation 새 객체로 초기화하여 이전 검사 결과를 제거합니다.
        setValidation({
            email: '',
            address1: '',
            address2: '',
            nickname: '',
            isBasic: '',
        });

        try {
            const response = await fetch('/member/addressreg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // setError('');
            // navigate('/');
        } catch (error) {
            // if (error.message.startsWith('400')) {
            //     // 회원가입 실패시 (네트워크 400 에러시) 처리
            //     setError('회원 가입에 실패하였습니다. 회원 정보를 다시 입력해주세요.')
            // } else if (error.message.startsWith('500')) {
            //
            // } else {
            //     setError('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
            // }
            // navigate('/auth/signUp');
            console.log('에러 발생');
        }
    };

    const handleChangeCheckBox = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleChangeBasicPath = (event) => {
        console.log(event);
        if (isBasic === 'N') {
            setIsBasic('Y');
        }
        if (isBasic === 'Y') {
            setIsBasic('N');
        }
    };

    return (
        <Container className="addressList-container">
            <h1>주소지 추가</h1>
            <Form onSubmit={handleSubmit} className= 'addressList-info'>
                <Form.Group className='info-box'>
                    <Form.Label>아이디</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        readOnly={true}
                    />
                </Form.Group>
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
                            checked={selectedOption === '집'}
                            onChange={handleChangeCheckBox}
                        />
                        <Form.Check
                            className='check-box'
                            type="radio"
                            label='회사'
                            value="회사"
                            checked={selectedOption === '회사'}
                            onChange={handleChangeCheckBox}
                        />
                        <Form.Check
                            className='check-box'
                            type="radio"
                            label='친적'
                            value="친적"
                            checked={selectedOption === '친적'}
                            onChange={handleChangeCheckBox}
                        />
                    </div>
                </Form.Group>

                <Form.Group className='info-box'>
                    <Form.Check
                        type="switch"
                        label="기본 배송지로 저장"
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
        </Container>
    )
}

export default AddressList;