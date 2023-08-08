import React, {useState} from 'react';
import {Form, Button, Container, Alert} from 'react-bootstrap';
import './Upload.css';
import axios from "axios";

const Upload = () => {
    const [itemValue, setItemValue] = useState({
        itemSellStatus: '',
        name: '',
        price: 0,
        stockNumber: 0,
        itemDetail: ''
    });
    const [selectedFiles, setSelectedFiles] = useState([{}]);

    const handleInputChange = (event, key) => {
        setItemValue({...itemValue, [key]: event.target.value});
    };

    const handleFileSelect = (event, index) => {
        const updatedSelectedFiles = [...selectedFiles];
        updatedSelectedFiles[index] = event.target.files[0];
        setSelectedFiles(updatedSelectedFiles);
    };

    const handleAddFileInput = () => {
        setSelectedFiles([...selectedFiles, {}]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('status', itemValue.itemSellStatus,);
        formData.append('name', itemValue.name);
        formData.append('price', itemValue.price);
        formData.append('stockNumber', itemValue.stockNumber);
        formData.append('itemDetail', itemValue.itemDetail);

        selectedFiles.forEach((file, index) => {
            if (file) {
                formData.append(`images[${index}]`, file);
            }
        });

        console.log('formData', formData);

        try {
            const response = await axios.post('/admin/item/new', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            console.log(response.data);
            alert('상품 등록 성공');
        } catch (error) {
            console.error(error);
            alert('상품 등록 실패');
        }
        ;
    };

    return (
        <div className="upload-container">
            <div className="upload-wrap">
                <h1>상품 등록 </h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>상품 상태</Form.Label>
                        <Form.Select onChange={(e) => handleInputChange(e, 'itemSellStatus')}
                                     value={itemValue.itemSellStatus}>
                            <option value='판매'>판매</option>
                            <option value='품절'>품절</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='info-box'>
                        <Form.Label>상품명</Form.Label>
                        <Form.Control
                            type="text"
                            value={itemValue.name}
                            onChange={(e) => handleInputChange(e, 'name')}
                        />
                    </Form.Group>
                    <Form.Group className='info-box'>
                        <Form.Label>가격</Form.Label>
                        <Form.Control
                            type="text"
                            value={itemValue.price}
                            onChange={(e) => handleInputChange(e, 'price')}
                        />
                    </Form.Group>
                    <Form.Group className='info-box'>
                        <Form.Label>재고</Form.Label>
                        <Form.Control
                            type="text"
                            value={itemValue.stockNumber}
                            onChange={(e) => handleInputChange(e, 'stockNumber')}
                        />
                    </Form.Group>
                    <Form.Group className='info-box'>
                        <Form.Label>상품 상세 내용</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={itemValue.itemDetail}
                            onChange={(e) => handleInputChange(e, 'itemDetail')}
                        />
                    </Form.Group>

                    {
                        selectedFiles.map((_, index) => (
                            <Form.Group key={index} className='info-box'>
                                <Form.Label>상품 이미지 {index + 1}</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(event) => handleFileSelect(event, index)}
                                />
                            </Form.Group>
                        ))}
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={handleAddFileInput}
                    >
                        이미지 추가
                    </Button>
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