import React from 'react';
import { NavLink  } from 'react-router-dom';
import './Footer.css';
import {Button} from "react-bootstrap";

const footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-wrap'>
                <div className='footer-box'>
                    <div className='footer-box-left'>
                        <h3>(주)더블제이코퍼레이션</h3>
                        <div className='footer-box-left-corp'>
                            <span>공동대표 장지호, 최종호</span>
                            <span>사업자등록 123-45-78910</span>
                            <span>이메일 ruin950521@naver.com</span>
                        </div>
                    </div>
                    <div className='footer-box-center'>
                        <h3>고객센터</h3>
                        <div className='footer-box-center-inquiry'>
                            <div className='inquiry-box'>
                                <Button className='inquiry-button' variant='secondary'>카카오톡 문의</Button>
                                <div className='inquiry-box-sub'>
                                    <span>
                                        월~토요일 : 오전7시 - 오후 6시
                                    </span>
                                    <span>
                                        일/공휴일 : 오전7시 - 오후1시
                                    </span>
                                </div>
                            </div>
                            <div className='inquiry-box'>
                                <Button className='inquiry-button' variant='secondary'>1:1 문의</Button>
                                <div className='inquiry-box-sub'>
                                    <span>
                                        365일 고객센터에서
                                    </span>
                                    <span>
                                        운영시간에 순서대로 답변드리겠습니다.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='footer-box-right'>
                        <div className='footer-box-wrap'>
                            <ul className='icon-list'>
                                <li className='corp-icon'><img className='icon-img' src='/images/item/instagram.png' alt='소셜 및 검색 엔진 이미지'/></li>
                                <li className='corp-icon'><img className='icon-img' src='/images/item/facebook.png' alt='소셜 및 검색 엔진 이미지'/></li>
                                <li className='corp-icon'><img className='icon-img' src='/images/item/kakao.png' alt='소셜 및 검색 엔진 이미지'/></li>
                                <li className='corp-icon'><img className='icon-img' src='/images/item/twitter.png' alt='소셜 및 검색 엔진 이미지'/></li>
                                <li className='corp-icon'><img className='icon-img' src='/images/item/naver.png' alt='소셜 및 검색 엔진 이미지'/></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='footer-inner'>
                    <ul className='list_corp'>
                        <li className='corp-item'>회사소개</li>
                        <li className='corp-item'>제휴제안</li>
                        <li className='corp-item'>이용약관</li>
                        <li className='corp-item'>개인정보처리방침</li>
                        <li className='corp-item'>고객센터</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default footer;