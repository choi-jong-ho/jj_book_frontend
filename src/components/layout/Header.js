import React, { Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const ROLE = localStorage.getItem('authorities');
  const USER = localStorage.getItem('user');

  const navigateToMain = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const navigateToItemMng = useCallback(() => {
    navigate('/admin/item');
  }, [navigate]);

  const navigateToLogin = useCallback(() => {
    navigate('/member/login');
  }, [navigate]);

  const navigateToSignUp = useCallback(() => {
    navigate('/member/signUp');
  }, [navigate]);

  const navigateToMyPage = useCallback(() => {
    navigate('/mypage/profile');
  }, [navigate]);

  const navigateToUpload = useCallback(() => {
    navigate('/admin/item/new');
  }, [navigate]);

  const handleLogout = async () => {
    // 카카오 로그아웃
    const ACCESS_TOKEN = localStorage.getItem('access_Token');
    try {
      const response = await axios.post(
        `https://kapi.kakao.com/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Content-type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log('카카오 로그아웃', response);
    } catch (e) {
      // 이미 만료된 토큰일 경우
      if (e.response.data.code === -401) {
        navigate('/');
      }
      console.log('카카오 로그아웃 오류', e);
    }
    localStorage.clear();
  };

  return (
    <div className='header-container'>
      <div className='header-wrap'>
        <div className='header-box'>
          <div className='header-box-left'>
            <img
              className='header-logo'
              width='70'
              height='70'
              src='https://img.icons8.com/external-goofy-color-kerismaker/96/external-library-education-goofy-color-kerismaker.png'
              alt='external-library-education-goofy-color-kerismaker'
              onClick={navigateToMain}
            />
          </div>
          <div className='header-box-center'>
            {ROLE == 'ROLE_ADMIN' ? (
              <Fragment>
                <div
                  className='header-item'
                  onClick={navigateToItemMng}
                >
                  <img
                    width='30'
                    height='30'
                    src='/images/header/item-add.png'
                    alt='상품 관리'
                  />
                  상품관리
                </div>
                <div
                  className='header-item'
                  onClick={navigateToUpload}
                >
                  <img
                    width='30'
                    height='30'
                    src='/images/header/list-check.png'
                    alt='상품 등록'
                  />
                  상품등록
                </div>
              </Fragment>
            ) : null}
          </div>
          <div className='header-box-right'>
            {USER ? (
              <Fragment>
                <div
                  className='header-item'
                  onClick={handleLogout}
                >
                  <img
                    width='30'
                    height='30'
                    src='https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/external-logout-interface-dreamstale-lineal-dreamstale.png'
                    alt='로그아웃'
                  />
                  로그아웃
                </div>
                <div
                  className='header-item'
                  onClick={navigateToMyPage}
                >
                  <img
                    width='30'
                    height='30'
                    src='https://img.icons8.com/dotty/80/user-location.png'
                    alt='마이페이지'
                  />
                  마이페이지
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div
                  className='header-item'
                  onClick={navigateToLogin}
                >
                  <img
                    width='30'
                    height='30'
                    src='https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/external-login-call-to-action-bearicons-detailed-outline-bearicons-1.png'
                    alt='로그인'
                  />
                  로그인
                </div>
                <div
                  className='header-item'
                  onClick={navigateToSignUp}
                >
                  <img
                    width='30'
                    height='30'
                    src='https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/external-sign-up-call-to-action-bearicons-detailed-outline-bearicons-1.png'
                    alt='회원가입'
                    id='회원가입'
                  />
                  회원가입
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
