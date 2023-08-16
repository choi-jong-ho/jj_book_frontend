import React, {useCallback, useEffect} from "react";
import './MainProduct.css';
import {Button, Card} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import './MainProduct.css';

const MainProduct = ({itemInfo, imageUrl}) => {
    const navigate = useNavigate();

    const navigateToProductDetail = useCallback((itemNumber) => {
        navigate(`/admin/item/detail/${itemNumber}`);
    }, [navigate]);

return(
    <div className='product-container'>
        <div className='product-wrap'>
            {
                itemInfo.map((x, index) => (
                    <Card className='card-container'>
                        <Card.Img variant="top" src={imageUrl[index]}/>
                        <Card.Body>
                            <Card.Title>{x.itemNm}</Card.Title>
                            <Card.Text>
                                {x.itemDetail}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Text>가격: {x.price}</Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => navigateToProductDetail(x.id)}
                            >
                                상세페이지 이동
                            </Button>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    </div>
)
}

export default MainProduct;