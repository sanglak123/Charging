import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ApiAdmin } from '../../../CallApi/ApiAdmin';
import { ClientSelector } from '../../../redux/selector/ClientSelector';

function TableRevenue({ client, month }) {

    return (
        <div id='TableRevenue'>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã thẻ</th>
                        <th>Số seri</th>
                        <th>Nhà mạng</th>
                        <th>Mệnh giá</th>
                        <th>Chiết khấu</th>
                        <th>Thực nhận</th>
                        <th>Ngày/tháng</th>
                        <th>Trạng thái</th>
                        <th>Loại</th>
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
        </div>
    );
}

export default TableRevenue;