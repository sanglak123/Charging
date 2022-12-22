import Link from 'next/link';
import React from 'react';
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ClientSelector } from '../redux/selector/ClientSelector';

function Hearder(props) {
    const accesstoken = useSelector(ClientSelector.Client).accessToken;
    const user = useSelector(ClientSelector.Client).Client;
    console.log(accesstoken)
    return (
        <div id='hearder'>
            <Container>
                <Navbar expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="/"><h1 className='logo_247'>DOITHE<span>24/7</span></h1></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="m-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link className='me-2 ms-2 border_right pe-4 ' href="/muathecao">MUA MÃ THẺ</Nav.Link>
                                <Nav.Link className='me-2 ms-2 border_right pe-4 ' href="/doithecao">ĐỔI THẺ CÀO</Nav.Link>
                                <Nav.Link className='me-2 ms-2 border_right pe-4 ' href="/naptien">NẠP TIỀN</Nav.Link>
                                <Nav.Link className='me-2 ms-2 border_right pe-4 ' href="/ruttien">RÚT TIỀN</Nav.Link>
                                <Nav.Link className='me-3 ms-3  ' href="/api">API</Nav.Link>

                            </Nav>
                            {
                                accesstoken ?
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='d-flex align-items-center'>
                                            <div className='me-2'>
                                                <i className="fa fa-dollar-sign me-2"></i>
                                                {user.surplus}VNĐ
                                            </div>
                                            <div className='ms-2'>
                                                <i className="fa fa-user me-2"></i>
                                                {user.fullName ? user.fullName : user.userName}
                                            </div>

                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item className='txt_black' href="#/action-1">Thông tin tài khoản</Dropdown.Item>
                                            <Dropdown.Item className='txt_black' href="#/action-2">Quỷ số dư</Dropdown.Item>
                                            <Dropdown.Item className='txt_black' href="#/action-3">Kết nối Api</Dropdown.Item>
                                            <Dropdown.Item className='txt_black' href="#/action-3">Lịch sử mua thẻ</Dropdown.Item>
                                            <Dropdown.Item className='txt_black' href="#/action-3">Nạp quỹ</Dropdown.Item>
                                            <Dropdown.Item className='txt_black' href="#/action-3">Rút quỷx</Dropdown.Item>
                                            <Dropdown.Item className='txt_black' href="#/action-3">Bảo mật</Dropdown.Item>
                                            <Dropdown.Item className='txt_black' href="#/action-3">Tài khoản ngân hàng</Dropdown.Item>
                                            <Dropdown.Item className='txt_black' href="#/action-3">Đổi mật khẩu</Dropdown.Item>
                                            <Dropdown.Item className='txt_black' href="/api/clients/logout">Đăng xuất</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    :
                                    <>
                                        <Link href={"/register"}>
                                            Đăng Ký
                                        </Link>
                                        <Link href={"/login"}>
                                            Đăng Nhập
                                        </Link>
                                    </>
                            }

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>




        </div>
    );
}

export default Hearder;