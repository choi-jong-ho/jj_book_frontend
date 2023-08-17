import React, {useState, Fragment} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button, Container, Alert} from 'react-bootstrap';
import AddressSearch from "../../modal/AddressSearch";
import '../../css/pages/Login&SignUp/SignUp.css'
import axios from "axios";

const SignUp = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [validation, setValidation] = useState({
        address: '',
        addressDetail: '',
        email: '',
        name: '',
        password: '',
        phone: ''
    });
    const [error, setError] = useState('');
    // 주소 데이터
    const [addressObj, setAddressObj] = useState({
        address: '',
        addressDetail: '',
        postcode: '',
        addrCategory: '',
        repAddYn: 'Y'
    });

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email,
            password,
            name,
            phone,
            repAddYn: addressObj.repAddYn,
            address: addressObj.address,
            addressDetail: addressObj.addressDetail,
            postcode: addressObj.postcode,
            addrCategory: addressObj.addrCategory,
        };

        // setValidation 새 객체로 초기화하여 이전 검사 결과를 제거합니다.
        setValidation({
            address: '',
            addressDetail: '',
            email: '',
            name: '',
            password: '',
            phone: '',
        });

        try {
            const response = await axios.post('/member/signup', formData);

            console.log('response', response);

            setError('');
            navigate('/member/login');
        } catch (e) {
            if (e.response.status === 400) {
                validationResultUpdater(e.response.data);
                setError('회원 가입에 실패하였습니다. 회원 정보를 다시 입력해주세요.');
            }
            console.log(e);
            // navigate('/auth/signup');
        }
    };

    const validationResultUpdater = (data) => {
        for (let i = 0; i < data.length; i++) {
            setValidation((cur) => {
                let newValidation = {...cur};
                newValidation[data[i].field] = data[i].defaultMessage;
                return newValidation;
            });
        }
    }

    const handlePasswordChange = (e, isConfirmPassword) => {
        if (isConfirmPassword) {
            setConfirmPassword(e.target.value);
        } else {
            setPassword(e.target.value);
        }

        const currentPassword = isConfirmPassword ? e.target.value : password;
        const comparingPassword = isConfirmPassword ? password : confirmPassword;

        setPasswordError(currentPassword !== comparingPassword);
    };

    const handleAddressChange = (e, key) => {
        let updateAddressObj = {...addressObj}
        updateAddressObj[key] = e.target.value;
        setAddressObj(updateAddressObj);
    }


    return (
        <Container className="container-SignUp">
            <h1>회원가입</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className='info-box'>
                    <Form.Label>아이디</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={validation.email !== ''}
                    />
                    <Form.Control.Feedback type="invalid" className='sign-err-msg'>
                        {validation.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='info-box'>
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => handlePasswordChange(e, false)}
                        isInvalid={validation.password !== ''}
                    />
                    <Form.Control.Feedback type="isValid" className='sign-err-msg'>
                        {validation.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='info-box'>
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => handlePasswordChange(e, true)}
                        isInvalid={passwordError}
                    />
                    <Form.Control.Feedback type="invalid">
                        비밀번호가 일치하지 않습니다.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='info-box'>
                    <Form.Label>사용자 이름</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isInvalid={validation.name !== ''}
                    />
                    <Form.Control.Feedback type="invalid" className='sign-err-msg'>
                        {validation.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='info-box'>
                    <Form.Label>핸드폰 번호</Form.Label>
                    <Form.Control
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        isInvalid={validation.phone !== ''}
                    />
                    <Form.Control.Feedback type="invalid" className='sign-err-msg'>
                        {validation.phone}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='info-box'>
                    <Form.Label>거주지</Form.Label>
                    <Form.Control
                        className='address'
                        type="text"
                        value={addressObj.address}
                        isInvalid={validation.address !== ''}
                        disabled={true}
                    />
                    <AddressSearch addressObj={addressObj} setAddressObj={setAddressObj}/>
                    <Form.Control.Feedback type="invalid" className='sign-err-msg'>
                        {validation.address}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* 주소 값이 있을 때만 상세 주소 입력 상자 표시 */}
                {addressObj.address && (
                    <Fragment>
                        <Form.Group className='info-box'>
                            <Form.Label>상세 주소</Form.Label>
                            <Form.Control
                                type="text"
                                value={addressObj.addressDetail}
                                onChange={(e) => handleAddressChange(e, 'addressDetail')}
                                placeholder="상세 주소를 입력해주세요"
                            />
                        </Form.Group>
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
                    </Fragment>
                )}
                <Button
                    variant="primary"
                    type="submit"
                    disabled={passwordError || password === '' || confirmPassword === ''}
                >
                    가입하기
                </Button>
            </Form>
        </Container>
    );
};

export default SignUp;