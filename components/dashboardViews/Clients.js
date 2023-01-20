import React, { useState } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ApiAdmin } from '../../CallApi/ApiAdmin';
import { ApiClients } from '../../CallApi/ApiClient';
import { AdminSelector } from '../../redux/selector/AdminSelector';
import { ClientSelector } from '../../redux/selector/ClientSelector';
import { LoadDataAdminSuccess } from '../../redux/slice/AdminSlice';
import ViewClient from '../modal/ViewClient';

function Clients(props) {
    //System
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [history, setHistory] = useState([]);
    const [clientView, setClientView] = useState("");

    const Clients = useSelector(AdminSelector.Clients);

    const accessToken = useSelector(ClientSelector.accessToken);
    const handleResetPass = async (client) => {
        await ApiAdmin.Clients.ResetPass(client.id, accessToken);
    };
    const handleAccepBranch = async (client) => {
        if (confirm(`Xác nhận đại lý cấp ${client.lever + 1} của user: ${client.userName}`)) {
            await ApiAdmin.Clients.AccpetBranch(client.id, accessToken, 1);
            await ApiAdmin.Data.GetAdminData(dispatch, LoadDataAdminSuccess)
        } else return;
    }

    const handleGetHistoryByClient = async (client) => {
        setClientView(client);
        const date = new Date();
        const y = date.getFullYear();
        const m = date.getMonth();
        await ApiAdmin.Clients.GetHistoryByClient(client.id, m, y, accessToken, setHistory);
        setShow(true);
    }

    return (
        <div id='clients'>
            <Table striped bordered hover variant="dark" className='txt_center'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên đăng nhập</th>
                        <th>Tên hiển thị</th>
                        <th>Tài khoản</th>
                        <th>Đại lý</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Clients?.map((client, index) => {
                            return (
                                <tr key={index} className='txt_white'>
                                    <td>{index + 1}</td>
                                    <td className='text-danger'>{client.userName}</td>
                                    <td>{client.displayName}</td>
                                    <td>{client.admin ? "Admin" : "Client"}</td>
                                    <td className={client.lever === 0 ? "text-warning" : "text-success"}>{client.lever === 0 ? "Chờ xác nhận" : `Cấp ${client.lever}`}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
                                    <td>
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="primary" onClick={() => handleGetHistoryByClient(client)}>View</Button>
                                            <Button onClick={() => handleResetPass(client)} variant="info">ResetPass</Button>
                                            <Button variant="danger">Delete</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        })

                    }
                </tbody>
                < ViewClient
                    show={show}
                    setShow={setShow}
                    history={history}
                    client={clientView}
                />
            </Table>

        </div>
    );
}

export default Clients;