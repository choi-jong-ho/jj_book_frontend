import React, {useEffect} from "react";
import './MainProduct.css';
import { Button, Card} from 'react-bootstrap';
import {value} from "lodash/seq";

const MainProduct = ({itemInfo}) => {

    useEffect(() => {
        console.log('itemInfo', itemInfo);
    }, []);

return(
    <div className='product-container'>
        <div className='product-wrap'>
            {/*<Card style={{ width: '18rem' }}>*/}
            {/*    <Card.Img variant="top" src='images/sunset.jpg' />*/}
            {/*    <Card.Body>*/}
            {/*        <Card.Title>Card Title</Card.Title>*/}
            {/*        <Card.Text>*/}
            {/*            Some quick example text to build on the card title and make up the*/}
            {/*            bulk of the card's content.*/}
            {/*        </Card.Text>*/}
            {/*        <Button variant="primary">Go somewhere</Button>*/}
            {/*    </Card.Body>*/}
            {/*</Card>*/}
            {
                itemInfo.map(x => (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src='images/sunset.jpg' />
                        <Card.Body>
                            <Card.Title>{x.itemNm}</Card.Title>
                            <Card.Text>
                                {x.itemDetail}
                            </Card.Text>
                            {/*<Button variant="primary">Go somewhere</Button>*/}
                        </Card.Body>
                        <Card.Body>
                            <Card.Text>가격: {x.price}</Card.Text>
                        </Card.Body>4113
                    </Card>
                ))
            }
        </div>
    </div>
)
}

export default MainProduct;