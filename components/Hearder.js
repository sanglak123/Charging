import React from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function Hearder(props) {
    return (
        <div id='hearder'>
            <Container>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="#action1">MUA MÃ THẺ</Nav.Link>
                            <Nav.Link href="#action2">ĐỔI THẺ CÀO</Nav.Link>  
                            <Nav.Link href="#action2">NẠP TIỀN</Nav.Link>   
                            <Nav.Link href="#action2">ABOUT</Nav.Link>                          
                         
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </Container>
           
        </div>
    );
}

export default Hearder;