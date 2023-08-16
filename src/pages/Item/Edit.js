import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {Form, Button, Alert} from 'react-bootstrap';
import './Edit.css';
import axios from "axios";

const Edit = () => {
    const {itemId} = useParams();
    const fileInputRefs = useRef([]);

    const [itemValue, setItemValue] = useState({
        itemSellStatus: 'SELL',
        itemNm: '',
        price: 0,
        stockNumber: 0,
        itemDetail: '',
        id: 0,
    });
    const [validation, setValidation] = useState({itemDetail: '', itemNm: '', stockNumber: '', price: ''});
    const [error, setError] = useState('');

    const [imgIdList, setImgIdList] = useState([]);
    const [imgData, setImgData] = useState([]);

    const [previewImage, setPreviewImage] = useState([]);

    const getItemInfo = async () => {
        try {
            const response = await axios.get(`/admin/item/${itemId}`);
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

            let itemIdArr = [];
            let getImgUrl = [];

            const imgList = data.itemImgDtoList.map((x) => {
                itemIdArr.push(x.id); // 이미지 id를 보내기 위한 list
                getImgUrl.push(x.imgUrl);
                setPreviewImage(getImgUrl);
                const imageBlob = new Blob([x], {type: "image/jpg"});
                const imageFile = new File([imageBlob], x.oriImgName, {type: "image/jpg", lastModified: Date.now()});
                return {file: imageFile};
            });

            setImgIdList(itemIdArr);
            setImgData(imgList);

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

    const handleFileSelect = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const updatedImgPreview = [...previewImage];
                updatedImgPreview[index] = e.target.result;
                console.log('e.target.result', e.target.result);
                setPreviewImage(updatedImgPreview);
            }

            reader.readAsDataURL(file);
        }
        const updatedSelectedFiles = [...imgData];
        updatedSelectedFiles[index] = {
            ...updatedSelectedFiles[index],
            file: file,
        };
        setImgData(updatedSelectedFiles);
    };

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

        imgData.forEach((imgObj) => {
            if (imgObj.file) {
                formData.append('itemImgFile', imgObj.file);
            }
        });

        // for (const [key, value] of formData.entries()) {
        //     console.log(key, value)
        // }

        try {
            const response = await axios.post(`/admin/item/${itemId[0]}`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            alert('상품 수정 성공');
        } catch (e) {
            if (e.response.status === 400) {
                validationResultUpdater(e.response.data);
                setError('상품 등록에 실패하였습니다. 다시 입력해주세요.');
            }
            console.log('오류 내용', e);
        };
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
                    <div className='edit-info-box-wrap'>
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
                    </div>
                    <div className='item-img-container'>
                        <Button
                            className='add-img'
                            variant="success"
                            type="button"
                            onClick={handleAddFileInput}
                        >
                            이미지 추가
                        </Button>
                        <div className='item-img-wrap'>
                            {
                                imgData.map((imgObj, index) => (
                                    <Form.Group key={index} className="img-info-box">
                                        <img className='item-img' src={previewImage[index]} alt='이미지 미리보기'/>
                                        <Button
                                            className='img-button'
                                            variant="secondary"
                                                onClick={() => fileInputRefs.current[index].click()}>파일 선택</Button>
                                        <Form.Control
                                            className='img-control'
                                            type="file"
                                            ref={ref => fileInputRefs.current[index] = ref}
                                            onChange={(event) => handleFileSelect(event, index)}
                                        />
                                        <Form.Control
                                            className='img-text'
                                            type="text"
                                            readOnly={true}
                                            value={imgObj.file.name}
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