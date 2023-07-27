import React, {useContext, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import {getUserActionHandler, logoutActionHandler} from '../store/auth'
import AuthContext from "../store/AuthContext";

const Header = () => {
    const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext); // 로그인 상태 관리
    const movePage = useNavigate();


    useEffect(() => {

    }, [])

    const goLogin = () =>{
        movePage('/auth/login')
    }

    const goSignUp = () =>{
        movePage('/auth/signUp')
    }
    const handleLogout = () => {
        logoutActionHandler();
        setIsLoggedIn(false);
    }
    return (
        <Navbar bg='light' expand="lg">
            <Container className="px-4 px-lg-5">
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/">About</Nav.Link>
                        <NavDropdown title="Shop" id="navbarDropdown">
                            <NavDropdown.Item href="/">홈페이지</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#!">Popular Items</NavDropdown.Item>
                            <NavDropdown.Item href="#!">New Arrivals</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {/*<Form className="d-flex">*/}
                    {/*    <Button variant="outline-dark" type="submit">*/}
                    {/*        <i className="bi-cart-fill me-1"></i>*/}
                    {/*        Cart*/}
                    {/*        <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>*/}
                    {/*    </Button>*/}
                    {/*</Form>*/}
                    {user.userName && (
                        <span>{user.userName}님</span>
                    )}
                    {isLoggedIn && (
                        <Button onClick={handleLogout} variant="outline-dark ml-1" type="submit">
                            <i className="bi-cart-fill"></i>
                            로그아웃
                        </Button>
                    )}
                    {!isLoggedIn && (
                        <Button onClick={goLogin} variant="outline-dark" type="submit">
                            <i className="bi-cart-fill me-1"></i>
                            로그인
                        </Button>
                    )}
                    {!isLoggedIn && (
                        <Button onClick={goSignUp} variant="outline-dark" type="submit">
                            <i className="bi-cart-fill me-1"></i>
                            회원가입
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header;
