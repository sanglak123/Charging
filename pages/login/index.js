import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ApiClients } from '../../CallApi/ApiClient';
import { LoginSuccess } from '../../redux/slice/ClientSlice';

function ClientLogin(props) {
    const dispath = useDispatch();
    const router = useRouter();

    const [userName, setUserName] = useState("");
    const [pass1, setPass1] = useState("");

    const [ghiNho, setGhiNho] = useState(false);

    const handleLogin = async () => {
        await ApiClients.Authen.Login(userName, pass1, dispath, LoginSuccess, router);
    };

    return (
        <div id='client_login'>
            <div className='login_content'>
                <div className='login_hearder'>
                    <h1>Đăng Nhập Tài Khoản</h1>
                </div>

                <div className='login_item d-flex'>
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

                <div className='login_item d-flex justify-content-end align-items-center'>
                    <Link className='me-3' href={"/quenmatkhau"}>Quên mật khẩu?</Link>
                    <Form.Check
                        checked={ghiNho}
                        onClick={() => setGhiNho(!ghiNho)}
                        type={"radio"}
                        label={"Ghi nhớ?"}
                        id="ghinho"
                    />
                </div>

                <div className='login_item d-flex justify-content-end align-items-center mt-4'>
                    <Link href={"/register"} className='me-2 btn btn-primary' variant="primary">Đăng ký</Link>
                    <Button onClick={() => handleLogin()} variant="success">Đăng nhập</Button>
                </div>
            </div>
        </div>

    );
}

export default ClientLogin;