import React, { useState } from 'react';
import { Button, Container, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ApiAdmin } from '../../CallApi/ApiAdmin';
import { ApiClients } from '../../CallApi/ApiClient';
import { formatMoney } from '../../db/config/formatMoney';
import { ClientSelector } from '../../redux/selector/ClientSelector';
import { DataSelector } from '../../redux/selector/DataSelector';
import { DataSuccess } from '../../redux/slice/DataSlice';
import ModalDelete from '../modal/ModalDelete';

function Prices(props) {
    const accessToken = useSelector(ClientSelector.accessToken);
    const dispatch = useDispatch();

    const Prices = useSelector(DataSelector.Prices);
    const TypeCards = useSelector(DataSelector.TypeCards);
    const PhoneCards = TypeCards.filter(card => card.type === "phone");
    const [phoneCard, setPhoneCard] = useState("Viettel");

    const [gameCard, setGameCard] = useState("Garena");
    const GameCards = TypeCards.filter(card => card.type === "game");

    const listPhoneCards = Prices.filter((card) => card.TypeCard.telco === phoneCard);
    const listGameCards = Prices.filter((card) => card.TypeCard.telco === gameCard);

    //Update FeesChange
    const handleUpdateFeesChangeCard = async () => {
        await ApiAdmin.Prices.UpdateFessChange(accessToken);
        await ApiClients.Data.LoadingData(dispatch, DataSuccess);
    };

    const [feesBuy, setFeesBuy] = useState("");
    const handleEditFeesBuy = async (card) => {
        await ApiAdmin.Prices.EditFessBuy(card.id, feesBuy, accessToken);
        await ApiClients.Data.LoadingData(dispatch, DataSuccess)
        setEdit("")
    }


    //Edit
    const [edit, setEdit] = useState("");

    //Show modal delete price
    const [show, setShow] = useState(false);
    const [priceDele, setPriceDele] = useState("");

    return (
        <div className='table_price bgr_dark100 p-4'>
            <div className='hearder_247'>
                <h1>Bảng Phí Đổi Thẻ Điện Thoại</h1>
            </div>
            {/* PhoneCards */}
            <div className='table_price_item d-flex'>
                {
                    PhoneCards.map((card, index) => {
                        return (
                            <Button className='btn_feesCard' variant={phoneCard === card.telco ? "success" : "outline-success"} key={index} onClick={() => setPhoneCard(card.telco)}>
                                {card.telco}
                            </Button>
                        )
                    })
                }
            </div>

            {/*PhoneCards */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='txt_white'>{phoneCard}</th>
                        {
                            listPhoneCards.map((card, index) => {
                                return (
                                    <th key={index} className='txt_white txt_center'>
                                        <div>
                                            {formatMoney(card.value)}
                                            <i onClick={() => {
                                                setShow(true);
                                                setPriceDele(card)
                                            }} className="fa fa-times btn_editPrice text-danger"></i>
                                        </div>
                                    </th>
                                )
                            })
                        }
                        <ModalDelete
                            show={show}
                            setShow={setShow}
                            price={priceDele}
                        />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className='txt_white'>Buy</th>
                        {
                            listPhoneCards.map((card, index) => {
                                return (
                                    edit === `${card.TypeCard.telco}_${card.value}` ?
                                        <th
                                            key={index}
                                            id={`${card.TypeCard.telco}_${card.value}`}
                                            className='txt_white txt_center'>
                                            <input className='w-50' value={feesBuy} onChange={(e) => setFeesBuy(e.target.value)} />
                                            <i onClick={() => handleEditFeesBuy(card)} className="fa fa-check btn_editPrice"></i>
                                            <i onClick={() => setEdit("")} className="fa fa-times btn_editPrice text-danger"></i>

                                        </th>
                                        :
                                        <th
                                            key={index}
                                            id={`${card.TypeCard.telco}_${card.value}`}
                                            className='txt_white txt_center'>
                                            {card.feesBuy}
                                            <i onClick={() => setEdit(`${card.TypeCard.telco}_${card.value}`)} className="fa fa-edit btn_editPrice"></i>
                                        </th>

                                )
                            })
                        }
                    </tr>
                    <tr>
                        <th className='txt_white'>Post</th>
                        {
                            listPhoneCards.map((card, index) => {
                                return (
                                    <th key={index} className='txt_white txt_center'>{card.feesChange}</th>

                                )
                            })
                        }
                    </tr>
                </tbody>
            </Table>

            {/* GameCard */}
            <div className='hearder_247'>
                <h1>Bảng Phí Đổi Thẻ Game</h1>
            </div>

            <div className='table_price_item d-flex'>
                {
                    GameCards.map((card, index) => {
                        return (
                            <Button className='btn_feesCard' key={index} onClick={() => setGameCard(card.telco)} variant={gameCard === card.telco ? "success" : "outline-success"}>
                                {card.telco}
                            </Button>
                        )
                    })
                }
            </div>
            {/*GameCards */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='txt_white'>{phoneCard}</th>
                        {
                            listGameCards.map((card, index) => {
                                return (
                                    <th key={index} className='txt_white txt_center'>
                                        <div>
                                            {formatMoney(card.value)}
                                            <i onClick={() => {
                                                setShow(true);
                                                setPriceDele(card)
                                            }} className="fa fa-times btn_editPrice text-danger"></i>
                                        </div>
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className='txt_white'>Buy</th>
                        {
                            listGameCards.map((card, index) => {
                                return (
                                    edit === `${card.TypeCard.telco}_${card.value}` ?
                                        <th
                                            key={index}
                                            id={`${card.TypeCard.telco}_${card.value}`}
                                            className='txt_white txt_center'>
                                            <input className='w-50' value={feesBuy} onChange={(e) => setFeesBuy(e.target.value)} />
                                            <i onClick={() => handleEditFeesBuy(card)} className="fa fa-check btn_editPrice"></i>
                                            <i onClick={() => setEdit("")} className="fa fa-times btn_editPrice text-danger"></i>

                                        </th>
                                        :
                                        <th
                                            key={index}
                                            id={`${card.TypeCard.telco}_${card.value}`}
                                            className='txt_white txt_center'>
                                            {card.feesBuy}
                                            <i onClick={() => setEdit(`${card.TypeCard.telco}_${card.value}`)} className="fa fa-edit btn_editPrice"></i>
                                        </th>

                                )
                            })
                        }
                    </tr>
                    <tr>
                        <th className='txt_white'>Post</th>
                        {
                            listGameCards.map((card, index) => {
                                return (
                                    <th key={index} className='txt_white txt_center'>{card.feesChange}</th>

                                )
                            })
                        }
                    </tr>
                </tbody>
            </Table>

            <Button onClick={() => handleUpdateFeesChangeCard()} variant='outline-success' className='me-4'>Update Fees Change</Button>
        </div>
    );
}

export default Prices;