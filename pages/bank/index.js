import React from 'react';
import { Container, Form, Table } from 'react-bootstrap';

function BankUsers(props) {
    return (
        <div id='bank_users'>
            <Container>
                <div className='bank_content mt-5 mb-5'>

                    <div className='list_bank'>
                        <div className='hearder_247'>
                            <h1>Tài Khoản Ngân Hàng</h1>
                        </div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
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
                    
                    <div className='choose_bank'>
                        <div className='hearder_247'>
                            <h1>Thêm Ngân Hàng</h1>
                        </div>
                        <Form.Select aria-label="Default select example">
                            <option>Chọn ngân hàng</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>
                </div>


            </Container>
        </div>
    );
}

export default BankUsers;