import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {Form, Button, Alert} from 'react-bootstrap';
import './Edit.css';
import axios from "axios";

const Edit = () => {
    const { itemId } = useParams();
    const [itemValue, setItemValue] = useState({
        itemSellStatus: 'SELL',
        itemNm: '',
        price: 0,
        stockNumber: 0,
        itemDetail: '',
        id: 0,
    });
    const [itemImgFile, setItemImgFile] = useState([{}]);
    const [validation, setValidation] = useState({itemDetail: '', itemNm: '', stockNumber: '', price: ''});
    const [error, setError] = useState('');

    const [imgIdList, setImgIdList] = useState([]);
    const [imgData, setImgData] = useState([]);

    const getItemInfo = async () => {
        try {
            const response = await axios.get(`/admin/item/${itemId[0]}`);
            console.log('서버에서 받아온 item 데이터', response);
            const data = response.data;
            setItemValue({
                itemSellStatus: data.itemSellStatus,
                itemNm: data.itemNm,
                price: data.price,
                stockNumber: data.stockNumber,
                itemDetail: data.itemDetail,
                id: data.id
            });
            setImgData(data.itemImgDtoList);

            let itemIdArr = [];
            data.itemImgDtoList.map((img) => {
                itemIdArr.push(img.id);
            });
            setImgIdList(itemIdArr);
        } catch (e) {
            console.log('데이터 가져오기 에러', e);
        }
    }

    useEffect(() => {
        getItemInfo();
    }, []);

    const handleInputChange = (event, key) => {
        setItemValue({...itemValue, [key]: event.target.value});
    };

    // const handleFileSelect = (event, index) => {
    //     const updatedSelectedFiles = [...itemImgFile];
    //     updatedSelectedFiles[index] = event.target.files[0];
    //     setItemImgFile(updatedSelectedFiles);
    // };

    const handleFileSelect = (event, index) => {
        const updatedSelectedFiles = [...imgData];
        updatedSelectedFiles[index] = event.target.files[0];
        setImgData(updatedSelectedFiles);
    };

    // const handleAddFileInput = () => {
    //     setItemImgFile([...itemImgFile, {}]);
    // };

    const handleAddFileInput = () => {
        setImgData([...imgData, {}]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('itemSellStatus', itemValue.itemSellStatus,);
        formData.append('itemNm', itemValue.itemNm);
        formData.append('price', itemValue.price);
        formData.append('stockNumber', itemValue.stockNumber);
        formData.append('itemDetail', itemValue.itemDetail);
        formData.append('id', itemValue.id);
        formData.append('itemImgIds', imgIdList);

        itemImgFile.forEach((file) => {
            formData.append('itemImgFile', file);
        });
        console.log('서버에 보내기 전 데이터', formData);

        try {
            const response = await axios.post(`/admin/item/${itemId[0]}`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            console.log('서버에 보낸 후 데이터', response.data);
            alert('상품 수정 성공');
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
        <div className="edit-container">
            <h1>상품 수정</h1>
            <div className="edit-wrap">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='edit-info-box'>
                        <Form.Label>상품 상태</Form.Label>
                        <Form.Select onChange={(e) => handleInputChange(e, 'itemSellStatus')}
                                     value={itemValue.itemSellStatus}>
                            <option value='SELL'>판매</option>
                            <option value='SOLD_OUT'>품절</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='edit-info-box'>
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
                    <Form.Group className='edit-info-box'>
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
                    <Form.Group className='edit-info-box'>
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
                    <Form.Group className='edit-info-box'>
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
                    <div className='item-img-container'>
                        <Button
                            className='add-img'
                            variant="secondary"
                            type="button"
                            onClick={handleAddFileInput}
                        >
                            이미지 추가
                        </Button>
                        <div className='item-img-wrap'>
                            {
                                imgData.map((_, index) => (
                                    <Form.Group key={index} className="img-info-box">
                                        <img className='item-img' src={imgData[index]?.imgUrl}/>
                                        <Form.Label>상품 이미지 {index + 1}</Form.Label>
                                        <Form.Control
                                            className='img-control'
                                            type="file"
                                            onChange={(event) => handleFileSelect(event, index)}
                                        />
                                    </Form.Group>
                                ))
                            }
                        </div>
                    </div>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        수정하기
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Edit;