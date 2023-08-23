import React, {useEffect, useState} from "react";
import AddressList from "./AddressList";
import './MypageAddress.css'
import axios from "axios";

const MyPageAddress = () => {
    return(
        <div className='address-container'>
            <AddressList />
        </div>
    )
}

export default MyPageAddress;