import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ApiClients } from '../CallApi/ApiClient';
import { formatMoney } from '../db/config/formatMoney';
import { ClientSelector } from '../redux/selector/ClientSelector';
import { LogoutSuccess } from '../redux/slice/ClientSlice';

function Hearder(props) {
    const dispatch = useDispatch();
    const accesstoken = useSelector(ClientSelector.accessToken);
    const user = useSelector(ClientSelector.Client);
    const router = useRouter();

    const [scrollY, setScrollY] = useState();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const ScrollBar = () => {
            const btnScroll = window.document.getElementById("btn_scroll");
            const hearder = window.document.getElementById("hearder")
            if (scrollY >= 150) {
                hearder?.classList.add("scroll-to-top");
                btnScroll?.classList.add("btnShow");
            } else {
                btnScroll?.classList?.remove("btnShow");
                hearder?.classList.remove("scroll-to-top");
            }
        };

        ScrollBar();
    }, [scrollY]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleLogout = async () => {
        await ApiClients.Authen.Logout(dispatch, LogoutSuccess);
    }


    return (
        router.route !== "/admin/dashboard" &&
        <>
            <div id='hearder' className='bgr_dark200'>
                <Container>
                    <Navbar expand="lg">
                        <Container fluid>
                            <Navbar.Brand href="/">
                                <div id='logo_247'>
                                    <h1>DOITHE<span>24/7</span></h1>
                                    <span className='website'>www.doithe247.com.vn</span>
                                </div>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className="m-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link className='me-2 ms-2 border_right pe-4 ' href='/buycard'>MUA MÃ THẺ</Nav.Link>
                                    <Nav.Link className='me-2 ms-2 border_right pe-4 ' href="/changecard">ĐỔI THẺ CÀO</Nav.Link>
                                    <Nav.Link className='me-2 ms-2 border_right pe-4 ' href="/topup">NẠP TIỀN</Nav.Link>
                                    <Nav.Link className='me-2 ms-2 border_right pe-4 ' href="/withdraw">RÚT TIỀN</Nav.Link>
                                    <Nav.Link className='me-2 ms-2 border_right pe-4 ' href="/connect">API</Nav.Link>
                                    <Nav.Link className='me-2 ms-2 pe-4 ' href="/usermanual">Hướng Dẫn</Nav.Link>

                                </Nav>
                                {
                                    accesstoken ?
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic" className='d-flex align-items-center'>
                                                <div className='me-2'>
                                                    {/* <i className="fa fa-dollar-sign me-2"></i> */}
                                                    {formatMoney(user.surplus)}
                                                </div>
                                                <div className='ms-2'>
                                                    <i className="fa fa-user me-2"></i>
                                                    {user.displayName ? user.displayName : user.userName}
                                                </div>

                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item className='txt_black' href="/profile">Thông tin tài khoản</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/connect">Kết nối Api</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/buycard">Lịch sử mua thẻ</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/topup">Nạp quỹ</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/withdraw">Rút quỷ</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/cecurity">Bảo mật</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/bank">Tài khoản ngân hàng</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/profile">Đổi mật khẩu</Dropdown.Item>
                                                {
                                                    user?.admin &&
                                                    <Dropdown.Item className='txt_black' href="/admin/dashboard">Quản lý</Dropdown.Item>
                                                }
                                                <Dropdown.Item className='txt_black' onClick={() => handleLogout()}>Đăng xuất</Dropdown.Item>

                                            </Dropdown.Menu>
                                        </Dropdown>
                                        :
                                        <>
                                            <Link className='btn_authen txt_green' href={"/register"}>
                                                Đăng Ký
                                            </Link>
                                            <Link className='btn_authen' href={"/login"}>
                                                Đăng Nhập
                                            </Link>
                                        </>
                                }

                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Container>
            </div>
            <Button className='btn btn-danger' onClick={() => scrollToTop()} id='btn_scroll'>
                <i className="fa fa-arrow-up"></i>
            </Button>
        </>

    );
}

export default Hearder;