import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ApiClients } from '../../CallApi/ApiClient';

function ClientRegister(props) {
    const dispath = useDispatch();
    const router = useRouter();

    const [userName, setUserName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [pass1, setPass1] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [admin, setAdmin] = useState(false);
    const [key, setKey] = useState("");

    const handleRegister = async () => {
        await ApiClients.Authen.Register(userName, displayName, phone, email, pass1, router, admin, key);
    };

    return (
        <div id='client_login'>
            <div className='login_content'>
                <div className='login_hearder'>
                    <h1>Đăng Ký Tài Khoản</h1>
                </div>

                <div className='login_item'>
                    <InputGroup className="mb-3">
                        <Form.Label>Admin</Form.Label>
                        <Form.Check
                            type={"checkbox"}
                            checked={admin}
                            onChange={() => setAdmin(!admin)}
                        />
                    </InputGroup>
                </div>

                <div className='login_item d-flex'>
                    <p className='mr-3'>Tên đăng nhập:</p>
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

                <div className='login_item d-flex'>
                    <p className='mr-3'>Tên hiển thị:</p>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={(e) => setDisplayName(e.target.value)}
                            value={displayName}
                            placeholder="Tên hiển thị"
                            aria-label="Displayname"
                            aria-describedby="basic-displayName"
                        />
                    </InputGroup>
                </div>

                <div className='login_item d-flex'>
                    <p className='mr-3'>Mật khẩu:</p>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={(e) => setPass1(e.target.value)}
                            value={pass1}
                            type={"password"}
                            placeholder="Mật khẩu"
                            aria-label="Pass"
                            aria-describedby="basic-pass"
                        />
                    </InputGroup>
                </div>

                <div className='login_item d-flex'>
                    <p className='mr-3'>Email:</p>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            type={"email"}
                            value={email}
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-email"
                        />
                    </InputGroup>
                </div>

                <div className='login_item d-flex'>
                    <p className='mr-3'>Điện thoại:</p>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={(e) => setPhone(e.target.value)}
                            type={'tel'}
                            value={phone}
                            placeholder="Điện thoại"
                            aria-label="Phone"
                            aria-describedby="basic-phone"
                        />
                    </InputGroup>
                </div>

                {
                    admin &&
                    <div className='login_item d-flex'>
                        <p className='mr-3'>Key admin:</p>
                        <InputGroup className="mb-3">
                            <Form.Control
                                onChange={(e) => setKey(e.target.value)}
                                type={'tel'}
                                value={key}
                                placeholder="Key Admin"
                                aria-label="Key"
                                aria-describedby="basic-key"
                            />
                        </InputGroup>
                    </div>
                }

                <div className='login_item d-flex justify-content-end align-items-center mt-4'>
                    <Link href={"/"} className='me-2 btn btn_danger'>Hủy</Link>
                    <Button onClick={() => handleRegister()} className="btn_success">Đăng ký</Button>

                </div>
            </div>
        </div>

    );
}

export default ClientRegister;