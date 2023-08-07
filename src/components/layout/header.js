import React, {useCallback, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
import {logoutActionHandler} from '../../store/auth';
import AuthContext from "../../store/AuthContext";

const Header = () => {
    const {isLoggedIn, setIsLoggedIn, user, setUser} = useContext(AuthContext); // 로그인 상태 관리
    const navigate = useNavigate();

    const navigateToLogin = useCallback(() => {
        navigate('/member/login');
    }, [navigate]);

    const navigateToSignUp = useCallback(() => {
        navigate('/member/signUp');
    }, [navigate]);

    const navigateToMyPage = useCallback(() => {
        navigate('/mypage/main');
    }, [navigate]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser([]);
        logoutActionHandler();
    };

    return (
        <Navbar bg='light' expand="lg">
            <Container className="px-4 px-lg-5">
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent"/>
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/mypage">마이페이지(임시)</Nav.Link>
                        <NavDropdown title="Shop" id="navbarDropdown">
                            <NavDropdown.Item href="/">홈페이지</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/mypage/main">마이페이지(임시)</NavDropdown.Item>
                            <NavDropdown.Item href="/member/signUp">회원가입</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {user?.userName && (
                        <span>{user?.userName}님</span>
                    )}
                    {isLoggedIn ? (
                        <Button onClick={handleLogout} variant="outline-dark ml-1" type="submit">
                            <i className="bi-cart-fill"></i>
                            로그아웃
                        </Button>
                    ) : (
                        <>
                            <Button onClick={navigateToLogin} variant="outline-dark" type="submit">
                                <i className="bi-cart-fill me-1"></i>
                                로그인
                            </Button>
                            <Button onClick={navigateToSignUp} variant="outline-dark" type="submit">
                                <i className="bi-cart-fill me-1"></i>
                                회원가입
                            </Button>
                        </>
                    )}
                    <Button onClick={navigateToMyPage} variant="outline-dark" type="submit">
                        <i className="bi-cart-fill me-1"></i>
                        마이페이지
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default React.memo(Header);
