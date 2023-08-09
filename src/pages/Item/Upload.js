import React, {useState} from 'react';
import {Form, Button, Container, Alert} from 'react-bootstrap';
import './Upload.css';
import axios from "axios";

const Upload = () => {
    const [itemValue, setItemValue] = useState({
        itemSellStatus: 'SELL',
        itemNm: '',
        price: 0,
        stockNumber: 0,
        itemDetail: ''
    });
    const [itemImgFile, setItemImgFile] = useState([{}]);
    const [validation, setValidation] = useState({itemDetail: '', itemNm: '', stockNumber: '', price: ''});
    const [error, setError] = useState('');


    const handleInputChange = (event, key) => {
        setItemValue({...itemValue, [key]: event.target.value});
    };

    const handleFileSelect = (event, index) => {
        const updatedSelectedFiles = [...itemImgFile];
        updatedSelectedFiles[index] = event.target.files[0];
        setItemImgFile(updatedSelectedFiles);
    };

    const handleAddFileInput = () => {
        setItemImgFile([...itemImgFile, {}]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('itemSellStatus', itemValue.itemSellStatus,);
        formData.append('itemNm', itemValue.itemNm);
        formData.append('price', itemValue.price);
        formData.append('stockNumber', itemValue.stockNumber);
        formData.append('itemDetail', itemValue.itemDetail);

        itemImgFile.forEach((file) => {
            formData.append('itemImgFile', file);
        });
        console.log('formData', formData);

        try {
            const response = await axios.post('/admin/item/new', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            console.log('response', response.data);
            alert('상품 등록 성공');
        } catch (e) {
            console.log('오류 내용', e);
            if (e.response.status === 400) {
                validationResultUpdater(e.response.data);
                setError('상품 등록에 실패하였습니다. 다시 입력해주세요.');
            }
            console.error(error);
        }
        ;
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

    return (
        <div className="upload-container">
            <h1>상품 등록 </h1>
            <div className="upload-wrap">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>상품 상태</Form.Label>
                        <Form.Select onChange={(e) => handleInputChange(e, 'itemSellStatus')}
                                     value={itemValue.itemSellStatus}>
                            <option value='SELL'>판매</option>
                            <option value='SOLD_OUT'>품절</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='info-box'>
                        <Form.Label>상품명</Form.Label>
                        <Form.Control
                            type="text"
                            value={itemValue.itemNm}
                            onChange={(e) => handleInputChange(e, 'itemNm')}
                            isInvalid={validation.itemNm !== ''}
                        />
                        <Form.Control.Feedback type="invalid" className='upload-err-msg'>
                            {validation.itemNm}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='info-box'>
                        <Form.Label>가격</Form.Label>
                        <Form.Control
                            type="text"
                            value={itemValue.price}
                            onChange={(e) => handleInputChange(e, 'price')}
                            isInvalid={validation.price !== ''}
                        />
                        <Form.Control.Feedback type="invalid" className='upload-err-msg'>
                            {validation.price}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='info-box'>
                        <Form.Label>재고</Form.Label>
                        <Form.Control
                            type="text"
                            value={itemValue.stockNumber}
                            onChange={(e) => handleInputChange(e, 'stockNumber')}
                            isInvalid={validation.stockNumber !== ''}
                        />
                        <Form.Control.Feedback type="invalid" className='upload-err-msg'>
                            {validation.stockNumber}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='info-box'>
                        <Form.Label>상품 상세 내용</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={itemValue.itemDetail}
                            onChange={(e) => handleInputChange(e, 'itemDetail')}
                            isInvalid={validation.itemDetail !== ''}
                        />
                        <Form.Control.Feedback type="invalid" className='upload-err-msg'>
                            {validation.itemDetail}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className='item-img-wrap'>
                        <Button
                            className='add-img'
                            variant="secondary"
                            type="button"
                            onClick={handleAddFileInput}
                        >
                            이미지 추가
                        </Button>
                        {
                            itemImgFile.map((_, index) => (
                                <Form.Group key={index} className="img-info-box">
                                    <Form.Label>상품 이미지 {index + 1}</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(event) => handleFileSelect(event, index)}
                                    />
                                </Form.Group>
                            ))
                        }
                    </div>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        저장하기
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Upload;