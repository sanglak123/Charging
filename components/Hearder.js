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
                                    <Nav.Link className='me-2 ms-2 border_right pe-4 ' href='/buycard'>MUA M?? TH???</Nav.Link>
                                    <Nav.Link className='me-2 ms-2 border_right pe-4 ' href="/changecard">?????I TH??? C??O</Nav.Link>
                                    <Nav.Link className='me-2 ms-2 border_right pe-4 ' href="/topup">N???P TI???N</Nav.Link>
                                    <Nav.Link className='me-2 ms-2 border_right pe-4 ' href="/withdraw">R??T TI???N</Nav.Link>
                                    <Nav.Link className='me-2 ms-2 border_right pe-4 ' href="/connect">API</Nav.Link>
                                    <Nav.Link className='me-2 ms-2 pe-4 ' href="/usermanual">H?????ng D???n</Nav.Link>

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
                                                <Dropdown.Item className='txt_black' href="/profile">Th??ng tin t??i kho???n</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/connect">K???t n???i Api</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/buycard">L???ch s??? mua th???</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/topup">N???p qu???</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/withdraw">R??t qu???</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/cecurity">B???o m???t</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/bank">T??i kho???n ng??n h??ng</Dropdown.Item>
                                                <Dropdown.Item className='txt_black' href="/profile">?????i m???t kh???u</Dropdown.Item>
                                                {
                                                    user?.admin &&
                                                    <Dropdown.Item className='txt_black' href="/admin/dashboard">Qu???n l??</Dropdown.Item>
                                                }
                                                <Dropdown.Item className='txt_black' onClick={() => handleLogout()}>????ng xu???t</Dropdown.Item>

                                            </Dropdown.Menu>
                                        </Dropdown>
                                        :
                                        <>
                                            <Link className='btn_authen txt_green' href={"/register"}>
                                                ????ng K??
                                            </Link>
                                            <Link className='btn_authen' href={"/login"}>
                                                ????ng Nh???p
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