import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ApiClients } from '../CallApi/ApiClient';
import { formatMoney } from '../db/config/formatMoney';
import { ClientSelector } from '../redux/selector/ClientSelector';

function TableHistorys({ Lists, ActionSuccess, command }) {
    const dispatch = useDispatch();
    const user = useSelector(ClientSelector.Client);

    const handleDeleteCard = async (card) => {
        const idToast = toast.loading("Please wait...")
        await ApiClients.Card.DeleteCard(card.id, idToast);
        await ApiClients.Card.GetHistory(dispatch, ActionSuccess, user.id, command);
        setTimeout(async () => {
            toast.dismiss(idToast)
        }, 3000);
    };

    return (
        <Table striped bordered hover className='txt_center'>
            <thead>
                <tr className='txt_white'>
                    <th>STT</th>
                    <th>Mã thẻ</th>
                    <th>Số Seri</th>
                    <th>Nhà mạng</th>
                    <th>Value</th>
                    <th>Chiết khấu</th>
                    <th>Thực nhận</th>
                    <th>Ngày</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    Lists?.map((history, index) => {
                        return (
                            <tr key={index}>
                                <td className='txt_white'>{index + 1}</td>
                                <td className='txt_white'>{history.code}</td>
                                <td className='txt_white'>{history.serial}</td>
                                <td className='txt_white'>{history.Price?.TypeCard?.telco}</td>
                                <td className='txt_white'>{formatMoney(history?.Price?.value)}</td>
                                <td className='txt_white'>{history?.Price?.feesChange}</td>
                                <td className='txt_white'>{formatMoney(history?.Price?.value)}</td>
                                <td className='txt_white'>{history.createdAt ? history.createdAt : `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} `}</td>
                                <td className={history.status === "Success" ? "text-success" : history.status === "Penanty" ? "text-warning" : history.status === "Waitting" ? "text-info" : "text-danger"}>{history.status}</td>
                                <td>
                                    <Button onClick={() => handleDeleteCard(history)} variant='outline-danger'>
                                        <i className="fa fa-trash-alt txt_white"></i>
                                    </Button>

                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

export default TableHistorys;