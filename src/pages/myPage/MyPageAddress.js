import React, {useEffect, useState} from "react";
import AddressList from "./AddressList";
import './MypageAddress.css'
import axios from "axios";

const MyPageAddress = () => {
    const [addrData, setAddrData] = useState([]);

    useEffect(() => {
        getAddrList();
    }, []);

    const getAddrList = async (newPage) => {
        try {
            let response = {};

            if(newPage) {
                response = await axios.get(`/address/list/${newPage}`);
            }
            if(!newPage) {
                response = await axios.get('/address/list');
            }
            console.log('주소 가져오기 response', response);
            const data = response.data[0].content;
            setAddrData(data);
        } catch (e) {
            console.log('주소목록 조회 오류', e);
        }
    }
    return(
        <div className='address-container'>
            <AddressList addrData={addrData}/>
        </div>
    )
}

export default MyPageAddress;