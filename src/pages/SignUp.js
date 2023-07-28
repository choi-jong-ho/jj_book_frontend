import React, {useState, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button, Container, Alert} from 'react-bootstrap';
import AddressSearch from "../modal/AddressSearch";
import '../css/pages/SignUp.css'

const SignUp = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [add, setAdd] = useState('');
    const [phone, setPhone] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [detailedAddress, setDetailedAddress] = useState('');
    const [error, setError] = useState('');
    const [validation, setValidation] = useState({address: '', email: '', userName: '', password: '', phone: ''});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let address = add + detailedAddress
        const formData = {
            email,
            password,
            userName,
            phone,
            address,
        };

        // setValidation 새 객체로 초기화하여 이전 검사 결과를 제거합니다.
        setValidation({
            address: '',
            email: '',
            userName: '',
            password: '',
            phone: '',
        });

        try {
            const response = await fetch('/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            // 네트워크 에러 발생 시 상태 받아오기
            if (!response.ok) {
                await validationResultUpdater(data);
                throw Error(`${response.status}: ${response.statusText}`);
            }

            setError('');
            navigate('/');
        } catch (error) {
            if (error.message.startsWith('400')) {
                // 회원가입 실패시 (네트워크 400 에러시) 처리
                setError('회원 가입에 실패하였습니다. 회원 정보를 다시 입력해주세요.')
            } else if (error.message.startsWith('500')) {

            } else {
                setError('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
            }
            navigate('/auth/signUp');
        }
    };

    const validationResultUpdater  = (data) => {
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
                        onChange={(e)=> handlePasswordChange(e, true)}
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
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        isInvalid={validation.userName !== ''}
                    />
                    <Form.Control.Feedback type="invalid" className='sign-err-msg'>
                        {validation.userName}
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
                        value={null}
                        isInvalid={validation.address !== ''}
                        disabled={true}
                    />
                    <AddressSearch address={add} setAddress={setAdd} validation={validation}/>
                </Form.Group>

                {/* 주소 값이 있을 때만 상세 주소 입력 상자 표시 */}
                {add && (
                    <Form.Group className='info-box'>
                        <Form.Label>상세 주소</Form.Label>
                        <Form.Control
                            type="text"
                            value={detailedAddress}
                            onChange={(e) => setDetailedAddress(e.target.value)}
                            placeholder="상세 주소를 입력해주세요"
                        />
                    </Form.Group>
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