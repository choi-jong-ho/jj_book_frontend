import React, {useEffect} from "react";
import './MainProduct.css';
import { Card } from 'react-bootstrap';

const MainProduct = ({itemInfo}) => {

    useEffect(() => {
        console.log('itemInfo', itemInfo);
    }, []);

return(
    <div className='product-container'>
        <div className='product-wrap'>
            {
                itemInfo.map(x => (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src='images/sunset.jpg' />
                        <Card.Body>
                            <Card.Title>{x.itemNm}</Card.Title>
                            <Card.Text>
                                {x.itemDetail}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Text>가격: {x.price}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    </div>
)
}

export default MainProduct;