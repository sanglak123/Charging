import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ApiClients } from '../../CallApi/ApiClient';
import TableHistorys from '../../components/TableHistorys';
import { ClientSelector } from '../../redux/selector/ClientSelector';
import { DataSelector } from '../../redux/selector/DataSelector';
import { HistoryChangeCardSuccess } from '../../redux/slice/ClientSlice';

function ChangeCard(props) {
    const dispatch = useDispatch();

    //user
    const user = useSelector(ClientSelector.Client);
    const accessToken = useSelector(ClientSelector.accessToken);

    //data   
    const Prices = useSelector(DataSelector.Prices)
    const [listCardChange, setListCardChange] = useState([]);

    useEffect(() => {
        const getListCardChange = () => {
            const listTypeCardChange = Prices.filter(card => card.feesChange !== null).map(card => card.TypeCard.telco);
            const array = [];
            listTypeCardChange.map((telco) => {
                if (!array.includes(telco)) {
                    array.push(telco)
                }
            });
            setListCardChange(array)
        };
        getListCardChange();
    }, [Prices])

    //Card
    const [telco, setTelco] = useState("VIETTEL");
    const [code, setCode] = useState("");
    const [seri, setSeri] = useState("");
    const [value, setValue] = useState("");

    //HistoryChangeCard
    useEffect(() => {
        const GetHistoryChangeCard = async () => {
            await ApiClients.Card.GetHistory(dispatch, HistoryChangeCardSuccess, user?.id, "change")
        };
        GetHistoryChangeCard()
    }, []);

    const handleCoppy = (id) => {
        const ele = window.document.getElementById(id);
        ele.focus();
        ele.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }

    const handlePostCard = async () => {
        const idToast = toast.loading("Please wait...")
        toast.update(idToast, { render: "Please wait...", type: "success" })
        await ApiClients.Card.PostCard(telco, code, seri, value, accessToken)
        await ApiClients.Card.HistoryChangeCard(dispatch, HistoryChangeCardSuccess, user?.id)

        setTimeout(async () => {
            await ApiClients.Card.CheckCard(telco, code, seri, value, user.id, accessToken);
            await ApiClients.Card.HistoryChangeCard(dispatch, HistoryChangeCardSuccess, user?.id)
            toast.dismiss(idToast)
        }, 20000)
    };

    const HistoryChangeCard = useSelector(ClientSelector.HistoryChangeCard);


    return (
        <div id='changecard' className='mt-5 mb-5'>
            <Container>
                <div className='hearder_247'>
                    <h1>?????i Th??? C??o</h1>
                </div>

                <ul>
                    <li>
                        <i className="fa fa-angle-double-right"></i>
                        Sai m???nh gi?? -50%. S???n l?????ng tr??n 2tr/ng??y ib t???i ????y ????? ???????c ?????i l??.
                    </li>
                    <li>
                        <i className="fa fa-angle-double-right"></i>
                        L???ch s??? ?????i th??? t???i ????y.
                    </li>
                    <li>
                        <i className="fa fa-angle-double-right"></i>
                        H??? tr??? n???p r??t ti???n v??? ATM ho??n to??n mi???n ph??.
                    </li>
                    <li>
                        <i className="fa fa-angle-double-right"></i>
                        Tin t???c t??ng gi???m chi???t kh???u TELEGRAM
                    </li>
                    <li>
                        <i className="fa fa-angle-double-right"></i>
                        L??u ?? : KH h???n ch??? n???p qu?? nhi???u th??? 1 l??c, ch??? n??n g???i m???i l???n 5 th???, ch??? x??? l?? xong, r???i n???p ti???p, c???m ??n !
                    </li>
                </ul>

                <Row>
                    <Col className='mt-3' xs={12} md={6} xl={3}>
                        <Form.Select
                            onChange={(e) => setTelco(e.target.value)}
                        >
                            {
                                listCardChange.map((telco, index) => {
                                    return (
                                        <option key={index} value={telco}>{telco}</option>
                                    )
                                })
                            }

                        </Form.Select>
                    </Col>

                    <Col className='mt-3' xs={12} md={6} xl={3} >
                        <InputGroup className="mb-3">
                            <Form.Control
                                id='input_code'
                                onChange={(e) => setCode(e.target.value)}
                                value={code}
                                placeholder="Code"
                                aria-label="Code"
                                aria-describedby="basic-addon2"
                            />
                            <Button onClick={() => handleCoppy("input_code")} variant="outline-secondary" id="button-code">
                                <i className="fa fa-copy"></i>
                            </Button>
                        </InputGroup>
                    </Col>

                    <Col className='mt-3' xs={12} md={6} xl={3}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                id='input_seri'
                                onChange={(e) => setSeri(e.target.value)}
                                value={seri}
                                placeholder="Serial"
                                aria-label="Seri"
                                aria-describedby="basic-seri"
                            />
                            <Button onClick={() => handleCoppy("input_seri")} variant="outline-secondary" id="button-seri">
                                <i className="fa fa-copy"></i>
                            </Button>
                        </InputGroup>
                    </Col>

                    <Col className='mt-3' xs={12} md={6} xl={3}>
                        <Form.Select onChange={(e) => setValue(e.target.value)} aria-label="Lo???i th???">
                            <option>M???nh gi??</option>
                            <option value="10000">10.000 VN??</option>
                            <option value="20000">20.000 VN??</option>
                            <option value="30000">30.000 VN??</option>
                            <option value="50000">50.000 VN??</option>
                            <option value="100000">100.000 VN??</option>
                            <option value="200000">200.000 VN??</option>
                            <option value="300000">300.000 VN??</option>
                            <option value="500000">500.000 VN??</option>
                            <option value="1000000">1.000.000 VN??</option>
                        </Form.Select>
                    </Col>

                    <Col className='mt-2' xs={12}>
                        <div className='btn_postcard'>
                            <Button className='bgr_dark100' onClick={() => handlePostCard()}>
                                <i className="fa fa-paper-plane me-3"></i>
                                G???i th???
                            </Button>
                        </div>

                    </Col>
                </Row>
                {
                    HistoryChangeCard.length > 0 &&
                    <div className='history_change_card mt-4'>
                        <div className='hearder_247'>
                            <h1>L???ch S??? ?????i Th???</h1>
                        </div>
                        <TableHistorys
                            Lists={HistoryChangeCard}
                            ActionSuccess={HistoryChangeCardSuccess}
                            command={"change"}
                        />
                    </div>
                }


            </Container >
        </div >
    );
}

export default ChangeCard;