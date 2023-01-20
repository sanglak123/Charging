import React from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { formatMoney } from '../db/config/formatMoney';
import { DataSelector } from '../redux/selector/DataSelector';

function TablePrice({ telco }) {

    const Prices = useSelector(DataSelector.Prices);
    const list = Prices.filter((card) => card.TypeCard.telco === telco);   

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className='txt_white'>{telco}</th>
                    {
                        list.map((card, index) => {
                            return (
                                <th key={index} className='txt_white txt_center'>{formatMoney(card.value)}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th className='txt_white'>Buy</th>
                    {
                        list.map((card, index) => {
                            return (

                                <th key={index} className='txt_white txt_center'>{card.feesBuy}</th>

                            )
                        })
                    }
                </tr>
                <tr>
                    <th className='txt_white'>Post</th>
                    {
                        list.map((card, index) => {
                            return (
                                <th key={index} className='txt_white txt_center'>{card.feesChange}</th>

                            )
                        })
                    }
                </tr>
            </tbody>
        </Table>
    );
}

export default TablePrice;