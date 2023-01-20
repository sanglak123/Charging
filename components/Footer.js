import Link from 'next/link';
import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

function Footer(props) {
    return (
        <div id='footer' className='bgr_dark100'>
            <div id='footer_main'>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={4} xl={3} xxl={3}>
                            <div className='footer_item'>
                                <div id='logo_247'>
                                    <h1>DOITHE<span>24/7</span></h1>
                                    <span className='website'>www.doithe247.com.vn</span>
                                </div>
                                <div className='footer_intro'>
                                    <p className='txt_center mt-4 txt_dark'>Hệ thống đổi thẻ cào sang tiền mặt,<br /> momo phí tốt nhất thị trường -<br /> tự động xử lý thẻ cực nhanh chóng !</p>
                                </div>
                            </div>
                        </Col>

                        <Col xs={6} sm={6} md={4} xl={3} xxl={3}>
                            <div className='footer_item'>
                                <div className='footer_hearder'>
                                    <h4>Dịch vụ</h4>
                                </div>
                                <div className='item quick_link'>
                                    <ul>
                                        <li>
                                            <Link href={"/changecard"}>
                                                <i className="fa fa-angle-double-right"></i>
                                                Đổi thẻ cào
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/buycard"}>
                                                <i className="fa fa-angle-double-right"></i>
                                                Mua thẻ cào
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/topup"}>
                                                <i className="fa fa-angle-double-right"></i>
                                                Nạp tiền
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/withdraw"}>
                                                <i className="fa fa-angle-double-right"></i>
                                                Rút tiền
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/connect"}>
                                                <i className="fa fa-angle-double-right"></i>
                                                Kết nối Api
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>

                        <Col xs={6} sm={6} md={4} xl={3} xxl={3}>
                            <div className='footer_item'>
                                <div className='footer_hearder'>
                                    <h4>Liên hệ</h4>
                                </div>
                                <div className='item'>
                                    <ul>
                                        <li>
                                            <Link href={"/"}>
                                                <i className="fa fa-phone"></i>0943830707
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/"}>
                                                <i className="fa fa-envelope"></i>admin@gmail.com
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/"}>
                                                <i className="fab fa-facebook-f"></i>sang Huỳnh
                                            </Link>
                                        </li>
                                        <li>
                                            <div className='icon ps-3 mt-4'>
                                                <i className="fab fa-cc-paypal me-1 ms-1"></i>
                                                <i className="fab fa-cc-mastercard me-1 ms-1"></i>
                                                <i className="fab fa-cc-jcb me-1 ms-1"></i>
                                                <i className="fab fa-cc-visa me-1 ms-1"></i>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>

                        <Col xs={12} sm={12} md={12} xl={3} xxl={3}>
                            <div className='footer_item'>
                                <div className='footer_hearder'>
                                    <h4>Phản hồi</h4>
                                </div>
                                <div className='item'>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control type="email" placeholder="name@example.com" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                                            <Form.Control as="textarea" rows={2} />
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
            <div id='footer_bottom' className='bgr_black'>
                <Container>
                    <p className='txt_center m-0 p-0 txt_dark'>Copyright ©2022 hga_designer ®</p>
                </Container>
            </div>
        </div>
    );
}

export default Footer;