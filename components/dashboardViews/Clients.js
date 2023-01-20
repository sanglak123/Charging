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

    const handleCancleBranch = async (client) => {
        if (confirm(`Không xác nhận đại lý cấp ${client.lever + 1} của user: ${client.userName}`)) {
        } else return;
    };

    const handleGetHistoryByClient = async (id) => {
        await ApiAdmin.Clients.GetHistoryByClient(id, accessToken, setHistory);
        setShow(true);
    }

    return (
        <div id='clients'>
            <Table striped bordered hover variant="dark" className='txt_center'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Username</th>
                        <th>DisplayName</th>
                        <th>Type</th>
                        <th>Branch</th>
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
                                    <td>{client.userName}</td>
                                    <td>{client.displayName}</td>
                                    <td>{client.admin ? "Admin" : "Client"}</td>
                                    <td>
                                        {
                                            client.lever === -1 ?
                                                <p>null</p>
                                                :
                                                client.lever === 0 ?
                                                    <>
                                                        <Button onClick={() => handleAccepBranch(client)} className='me-2' variant='outline-success'>Accep</Button>
                                                        <Button onClick={() => handleCancleBranch(client)} variant='outline-danger'>Cancle</Button>
                                                    </>
                                                    :
                                                    <p>Đại lý cấp 1</p>
                                        }
                                    </td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
                                    <td>
                                        <ButtonGroup aria-label="Basic example">
                                            {
                                                client.lever !== -1 &&
                                                <Button variant="primary" onClick={() => handleGetHistoryByClient(client.id)}>
                                                    View
                                                </Button>
                                            }
                                            <Button onClick={() => handleResetPass(client)} variant="info">ResetPass</Button>
                                            <Button variant="danger">Delete</Button>
                                        </ButtonGroup>

                                        < ViewClient
                                            show={show}
                                            setShow={setShow}
                                            history={history}
                                        />
                                    </td>
                                </tr>
                            )
                        })

                    }


                </tbody>
            </Table>

        </div>
    );
}

export default Clients;