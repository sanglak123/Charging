import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Col, Container, ListGroup, Modal, Row, Table, Button } from 'react-bootstrap';
import { handlerGetFirstMonth, handlerGetSecondMonth, handlerGetThirdMonth } from '../../db/config/getDate';
import { formatDateTime } from '../../db/config/dormatDateTime';
import { formatMoney } from '../../db/config/formatMoney';


function ViewClient({ show, setShow, history, client }) {

    const [totalPostCard, setTotalPostCard] = useState(0);
    const [totalBuyCard, setTotalBuyCard] = useState(0);

    const PostCard = history.filter(card => card.command === "change" && card.status !== "Error");
    const BuyCard = history.filter(card => card.command === "buy" && card.status !== "Error");
    const newDate = new Date(2023,1,25);
    console.log(newDate)

    useEffect(() => {
        let totalPost = 0;
        PostCard.map((card) => {
            totalPost = totalPost + Number(card.Price.value);
        });
        setTotalPostCard(totalPost);

        let totalBuy = 0;
        BuyCard.map((card) => {
            totalBuy = totalBuy + Number(card.Price.value);
        });
        setTotalBuyCard(totalPost);
        console.log(totalBuy)
    }, [history]);

    const handleAccessBranch = async (client) => {
        alert(client.id)
    };

    const handleCancleBranch = async (client) => {
        alert(client.id)
    };

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            fullscreen={true}
            className='txt_black'
        >
            <Modal.Header closeButton>
                <Modal.Title className='txt_black'>
                    Doanh thu 3 tháng gần nhất {client?.userName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={4}>
                            <div className='client_info'>
                                <ListGroup as="ul">
                                    <ListGroup.Item as="li" active>
                                        Doanh thu tháng {client.userName}
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">Tên hiển thị: <span className='text-danger'> {client.displayName}</span></ListGroup.Item>
                                    <ListGroup.Item as="li">Đại lý: <span className={client.lever === 0 ? "text-warning" : "text-success"}>{client.lever === 0 ? "Chờ xác nhận" : `cấp ${client.lever}`}</span></ListGroup.Item>
                                    <ListGroup.Item as="li">Ngày đăng ký : <span>{client.createdAt ? client.createdAt : "null"}</span></ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Đổi thẻ cào tháng 1: <span className='text-success'>{formatMoney(totalPostCard)}</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Mua thẻ cào tháng 1: {formatMoney(totalBuyCard)}
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <div className='client_revenue'>
                                <Tabs>
                                    <TabList>
                                        <Tab>{handlerGetThirdMonth()}</Tab>
                                        <Tab>{handlerGetSecondMonth()}</Tab>
                                        <Tab>{handlerGetFirstMonth()}</Tab>
                                    </TabList>

                                    <TabPanel>
                                        <div className='post_card'>
                                            <div className='hearder_247'>
                                                <h1>Đổi Thẻ Cào</h1>
                                            </div>
                                            <Table striped bordered hover >
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Nhà Mạng</th>
                                                        <th>Code</th>
                                                        <th>Serial</th>
                                                        <th>Mệnh giá</th>
                                                        <th>Giao dịch</th>
                                                        <th>Trạng thái</th>
                                                        <th>Thực nhận</th>
                                                        <th>createdAt</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {PostCard?.map((card, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{card.Price.TypeCard.telco}</td>
                                                                <td>{card.code}</td>
                                                                <td>{card.serial}</td>
                                                                <td>{card.Price.value}</td>
                                                                <td>{card.command}</td>
                                                                <td>{card.status}</td>
                                                                <td>{card.amount}</td>
                                                                <td>{formatDateTime(card.createdAt)}</td>
                                                            </tr>
                                                        )
                                                    })}


                                                </tbody>
                                            </Table>
                                        </div>

                                        <div className='post_card'>
                                            <div className='hearder_247'>
                                                <h1>Mua Thẻ Cào</h1>
                                            </div>
                                            <Table striped bordered hover >
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Nhà Mạng</th>
                                                        <th>Code</th>
                                                        <th>Serial</th>
                                                        <th>Mệnh giá</th>
                                                        <th>Giao dịch</th>
                                                        <th>Trạng thái</th>
                                                        <th>Thực nhận</th>
                                                        <th>createdAt</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {BuyCard?.map((card, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{card.Price.TypeCard.telco}</td>
                                                                <td>{card.code}</td>
                                                                <td>{card.serial}</td>
                                                                <td>{card.Price.value}</td>
                                                                <td>{card.command}</td>
                                                                <td>{card.status}</td>
                                                                <td>{card.amount}</td>
                                                                <td>{formatDateTime(card.createdAt)}</td>
                                                            </tr>
                                                        )
                                                    })}


                                                </tbody>
                                            </Table>
                                        </div>

                                    </TabPanel>

                                    <TabPanel>

                                    </TabPanel>

                                    <TabPanel>
                                        <Table striped bordered hover >
                                            <thead>
                                                <tr>
                                                    <th>Tháng</th>
                                                    <th>1</th>
                                                    <th>2</th>
                                                    <th>3</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td colSpan={2}>Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </TabPanel>

                                </Tabs>


                            </div>
                        </Col>
                        <Col xs={12}>
                            {
                                client.lever === 0 &&
                                <>
                                    <Button onClick={() => handleAccessBranch(client)} className='me-3' variant='outline-success'>Xác nhận đại lý cho user {client.userName}</Button>
                                    <Button onClick={() => handleCancleBranch(client)} variant='outline-danger'>Hủy yêu cầu</Button>
                                </>

                            }

                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal >
    );
}

export default ViewClient;