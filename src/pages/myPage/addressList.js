import React, {useState} from "react";
import {Form, Button, Container} from 'react-bootstrap';
import AddressSearch from "../../modal/AddressSearch";
const AddressList = () => {
    const [address, setAddress] = useState('');
return(
    <Container className="container-SignUp">
        <h1>주소지 추가</h1>
        <Form onSubmit={null}>
            {/*<Form.Group className='info-box'>*/}
            {/*    <Form.Label>거주지</Form.Label>*/}
            {/*    <Form.Control*/}
            {/*        className='address'*/}
            {/*        type="text"*/}
            {/*        value={null}*/}
            {/*        disabled={true}*/}
            {/*    />*/}
            {/*    <AddressSearch address={address} setAddress={setAddress}/>*/}
            {/*</Form.Group>*/}
            <AddressSearch address={address} setAddress={setAddress}/>
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