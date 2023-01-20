import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { toast } from 'react-toastify';
import { ApiClients } from '../../CallApi/ApiClient';
import TableHistorys from '../../components/TableHistorys';
import { formatMoney } from '../../db/config/formatMoney';
import { ClientSelector } from '../../redux/selector/ClientSelector';
import { DataSelector } from '../../redux/selector/DataSelector';
import { AddCardSuccess, ChooseCardSuccess, SubtractionCardSuccess, DeleteCardSuccess, BuyCardSuccess, HistoryBuyCardSuccess } from '../../redux/slice/ClientSlice';


function BuyCard(props) {

    //Total Price Store
    const [total, setTotal] = useState(0);

    const dispatch = useDispatch();

    const TypeCards = useSelector(DataSelector.TypeCards);

    const phoneCards = TypeCards.filter(card => card.type === "phone");
    const gameCards = TypeCards.filter(card => card.type === "game");

    const Prices = useSelector(DataSelector.Prices);

    const store = useSelector(ClientSelector.Store);
    const user = useSelector(ClientSelector.Client);


    const [typePhoneCard, setTypePhoneCard] = useState({});
    const [typeGameCard, setTypeGameCard] = useState({});

    const handleGetvalueCard = async (telco, type) => {
        const list = Prices.filter((card) => card.TypeCard.telco === telco);
        const result = list.map(foo => foo.value);
        if (type === "phone") {
            setTypePhoneCard({
                telco: telco,
                type: type,
                value: result
            })
        } else if (type === "game") {
            setTypeGameCard({
                telco: telco,
                type: type,
                value: result
            })
        }
    };

    const handleChooseCard = (telco, value) => {
        const index = store.findIndex(card => card.telco === telco && card.value === value);
        const indexPrice = Prices.findIndex(card => card.TypeCard.telco === telco && card.value === value);

        if (index === -1) {
            const newCard = {
                telco: telco,
                value: value,
                feesBuy: Prices[indexPrice].feesBuy,
                count: 1
            };
            dispatch(ChooseCardSuccess(newCard))
        }
    };

    const handleCheckCardInStore = (telco, value) => {
        const index = store.findIndex(card => card.telco === telco && card.value === value);
        if (index !== -1) {
            return "value_item bgr_green"
        } else {
            return "value_item"
        }
    };

    const handleAddCard = (card) => {
        dispatch(AddCardSuccess(card))
    };

    const handleSubtractionCard = (card) => {
        dispatch(SubtractionCardSuccess(card))
    };
    const handleDeleteCardInStore = (card) => {
        dispatch(DeleteCardSuccess(card))
    };


    useEffect(() => {
        const total_price = () => {
            let total = 0;
            store.map((card) => {
                total = total + ((Number(card.value) - (Number(card.value) * Number(card.feesBuy)) / 100)) * Number(card.count);
            });
            setTotal(total);
        };
        total_price();
    }, [store]);

    const handleBuyCard = async () => {
        const surplus = Number(user.surplus) - Number(total);
        const idToast = toast.loading("Please wait...");
        if (surplus >= 0) {
            store.forEach(async (card) => {
                await ApiClients.Card.BuyCard(card.telco, card.value, card.count, user.id, idToast, dispatch, BuyCardSuccess)
            });
            setTimeout(() => {
                dispatch(BuyCardSuccess());
                toast.dismiss(idToast);
            }, 3000);
        } else {
            setTimeout(() => {
                toast.update(idToast, { render: "Số dư không đủ vui lòng kiểm tra lại!", type: "error", isLoading: false });
            }, 2000);
            setTimeout(() => {
                toast.dismiss(idToast)
            }, 3000);
        }


    };

    useEffect(() => {
        const GetHistory = async () => {
            await ApiClients.Card.GetHistory(dispatch, HistoryBuyCardSuccess, user?.id, "buy")
        };
        GetHistory();
    }, [user]);

    const HistorysBuyCard = useSelector(ClientSelector.HistoryBuyCards);

    return (
        <div id='muathecao'>
            <Container>
                <div className='hearder_247 mt-5'>
                    <h1>MUA MÃ THẺ CÀO NHANH CHÓNG - GIÁ RẺ</h1>
                </div>

                <div className='note'>
                    <p>► Nếu thẻ bị dạng chờ Xử lý, Quý khách hãy báo ở góc trái màn hình để admin hủy đơn cho bạn thực hiện lại! </p>
                </div>
                <div className='muathecao_content d-flex justify-content-start'>
                    <div className='loaithe'>
                        <Tabs>
                            <TabList>
                                <Tab>Thẻ điện thoại</Tab>
                                <Tab>Thẻ game</Tab>
                            </TabList>

                            <TabPanel>
                                <div className='card_phone'>
                                    {
                                        phoneCards?.map((card, index) => {
                                            return (
                                                <div onClick={() => handleGetvalueCard(card.telco, card.type)} key={index} className='img_card'>
                                                    <img src={card.img} />
                                                </div>
                                            )
                                        })
                                    }
                                    <div className='card_value'>
                                        {
                                            typePhoneCard?.value?.map((value, index) => {
                                                return (
                                                    <div onClick={() => handleChooseCard(typePhoneCard.telco, value)} key={index} className={handleCheckCardInStore(typePhoneCard.telco, value)}>{typePhoneCard.telco} - {value}</div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className='card_phone'>
                                    {
                                        gameCards?.map((card, index) => {
                                            return (
                                                <div onClick={() => handleGetvalueCard(card.telco, card.type)} key={index} className='img_card'>
                                                    <img src={card.img} />
                                                </div>
                                            )
                                        })
                                    }
                                    <div className='card_value'>
                                        {
                                            typeGameCard?.value?.map((value, index) => {
                                                return (
                                                    <div onClick={() => handleChooseCard(typeGameCard.telco, value)} key={index} className={handleCheckCardInStore(typeGameCard.telco, value)}>{typeGameCard.telco} - {value}</div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                    </div>
                    <div className='store'>
                        <div className='store_hearder'>
                            <p><i className="fa fa-shopping-cart"></i> Giỏ hàng</p>
                        </div>
                        <div className='store_body'>
                            {
                                store.length > 0 ?
                                    <div className='store_content'>
                                        {
                                            store.map((card, index) => {
                                                return (
                                                    <div key={index} className='card_item'>
                                                        <Row>
                                                            <Col xs={4}>
                                                                <div className='card_telco'>
                                                                    <p className='p-0 m-0'> {card.telco} - {card.value}</p>
                                                                    <span>Chiết khấu: {card.feesBuy}%</span>
                                                                </div>
                                                            </Col>
                                                            <Col xs={2}>
                                                                <div className='card_count d-flex justify-content-start align-items-center'>
                                                                    <button onClick={() => handleSubtractionCard(card)} className='d-block'>-</button>
                                                                    <div className='count'>{card.count}</div>
                                                                    <button onClick={() => handleAddCard(card)} className='d-block'>+</button>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className='total_price_item'>
                                                                    {formatMoney((card.value - card.value * card.feesBuy / 100) * card.count)}
                                                                </div>
                                                            </Col>
                                                            <Col xs={2}>
                                                                <Button onClick={() => handleDeleteCardInStore(card)} variant='danger'><i className="fa fa-trash"></i></Button>
                                                            </Col>
                                                            <hr />
                                                        </Row>
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className='total_price d-flex justify-content-between align-items-center'>
                                            <h6>Tổng cộng:</h6>
                                            <h3 className='txt_green'>{formatMoney(total)}</h3>
                                        </div>
                                        <hr />
                                        <div className='receive_card'>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1"><i className="fa fa-envelope"></i></InputGroup.Text>
                                                <Form.Control
                                                    value={user?.email}
                                                    placeholder="Email nhận thẻ"
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                />
                                            </InputGroup>
                                        </div>
                                        <div className='buycard_note'>
                                            <p>Bằng việc chọn 'Thanh toán', bạn đồng ý với chính sách cung cấp, hủy và hoàn trả dịch vụ</p>
                                        </div>
                                        <hr />
                                        <div className='btn_send'>
                                            <Button onClick={() => handleBuyCard()} variant='warning' className='w-100'>Thanh Toán</Button>
                                        </div>
                                    </div>
                                    :
                                    <p>Giỏ hàng đang trống...</p>
                            }
                        </div>
                        <div className='store_bottom'>

                        </div>
                    </div>
                </div>
                {
                    HistorysBuyCard.length > 0 &&
                    <div className='lichsumuathecao'>
                        <div className='hearder_247 mt-4'>
                            <h1>LỊCH SỬ MUA THẺ CÀO</h1>
                        </div>
                        <TableHistorys
                            Lists={HistorysBuyCard}
                            ActionSuccess={HistoryBuyCardSuccess}
                            command={"buy"}
                        />
                    </div>
                }


            </Container>
        </div>
    );
}

export default BuyCard;