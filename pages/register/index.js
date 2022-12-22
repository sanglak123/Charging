import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ApiClients } from '../../CallApi/ApiClient';

function ClientRegister(props) {
    const dispath = useDispatch();
    const router = useRouter();

    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleRegister = async () => {
        await ApiClients.Authen.Register(userName, fullName, phone, email, pass, router);
    };

    return (
        <div id='client_register'>
            <div className='register_content'>
                <div className='register_hearder'>
                    <h2>Login</h2>
                    <h1>DOITHE247</h1>
                </div>

                <div className='register_item d-flex'>
                    <p className='mr-3'>Tên Đăng Nhập:</p>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            autoFocus
                            placeholder="Tên đăng nhập"
                            aria-label="Username"
                            aria-describedby="basic-username"
                        />
                    </InputGroup>
                </div>

                <div className='register_item d-flex'>
                    <p className='mr-3'>Họ Và Tên:</p>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName}
                            placeholder="Họ và tên"
                            aria-label="Fullname"
                            aria-describedby="basic-fullname"
                        />
                    </InputGroup>
                </div>

                <div className='register_item d-flex'>
                    <p className='mr-3'>Số Điện Thoại:</p>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            placeholder="Số điện thoại"
                            aria-label="Phone"
                            aria-describedby="basic-phone"
                        />
                    </InputGroup>
                </div>

                <div className='register_item d-flex'>
                    <p className='mr-3'>Địa Chỉ Email:</p>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-email"
                        />
                    </InputGroup>
                </div>

                <div className='register_item d-flex'>
                    <p className='mr-3'>Mật Khẩu:</p>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                            type='password'
                            placeholder="Mật khẩu"
                            aria-label="Pass"
                            aria-describedby="basic-pass"
                        />
                    </InputGroup>
                </div>

                <div className='register_item d-flex'>
                    <Button onClick={() => handleRegister()} className='w-100'>Đăng Ký</Button>
                </div>

            </div>

        </div>
    );
}

export default ClientRegister;