import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Col, Container, Modal, Row, Table } from 'react-bootstrap';
import { handlerGetFirstMonth, handlerGetSecondMonth, handlerGetThirdMonth } from '../../db/config/getDate';
import TableRevenue from '../dashboardViews/TableRevenue';
import { formatDateTime } from '../../db/config/dormatDateTime';

function ViewClient({ show, setShow, history }) {
    const [totalPostCard, setTotalPostCard] = useState(0);
    const [totalChangeCard, setTotalChangeCard] = useState(0);

    useEffect(() => {
        const PostCard = history.filter(card => card.command === "change" && card.status !== "Error");
        const BuyCard = history.filter(card => card.command === "buy" && card.status !== "Error");

        let totalPost = 0;
        PostCard.map((card) => {

            totalPost = totalPost + Number(card.Price.value);
        });
        setTotalPostCard(totalPost);
        console.log(totalPost)
    }, [history])
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
                    123
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={4}>
                            <div className='client_info'>
                                Client
                            </div>
                        </Col>
                        <Col xs={8}>
                            <div className='client_revenue'>
                                <Tabs>
                                    <TabList>
                                        <Tab>{handlerGetFirstMonth()}</Tab>
                                        <Tab>{handlerGetSecondMonth()}</Tab>
                                        <Tab>{handlerGetThirdMonth()}</Tab>
                                    </TabList>

                                    <TabPanel>
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
                                                {history?.map((card, index) => {
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
                    </Row>
                </Container>
            </Modal.Body>
        </Modal >
    );
}

export default ViewClient;