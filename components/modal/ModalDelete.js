import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ApiAdmin } from '../../CallApi/ApiAdmin';
import { ApiClients } from '../../CallApi/ApiClient';
import { formatMoney } from '../../db/config/formatMoney';
import { ClientSelector } from '../../redux/selector/ClientSelector';

function ModalDelete({ show, setShow, price }) {

    const handleClose = () => setShow(false);

    const dispatch = useDispatch();
    const accessToken = useSelector(ClientSelector.accessToken);
    console.log(price)
    //Delete Price
    const handleDeletePrice = async (price) => {
        await ApiAdmin.Prices.DeletePrice(price.id, accessToken);
        await ApiClients.Data.LoadingData(dispatch, DataSuccess);
    }

    return (
        <Modal show={show} onHide={handleClose} className='txt_black'>
            <Modal.Header closeButton>
                <Modal.Title >Delete {price?.TypeCard?.telco} - {formatMoney(price?.value)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn chắc chắn muốn xóa {price?.TypeCard?.telco} mệnh giá {formatMoney(price?.value)}?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {
                    handleClose()
                    handleDeletePrice()
                }}>
                    Delete
                </Button>
                <Button variant="info" onClick={handleClose}>
                    Cancle
                </Button>

            </Modal.Footer>
        </Modal>
    );
}

export default ModalDelete;