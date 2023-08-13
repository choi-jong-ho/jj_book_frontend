import React from "react";
import { useParams } from 'react-router-dom';
const ItemDetail = () => {
    const { itemId } = useParams();
    return (
        <div><h1>아이템 상세 페이지 {itemId}</h1></div>
    )
}

export default ItemDetail;