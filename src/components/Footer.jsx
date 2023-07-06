import React, { Fragment } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Footer = () => {
    return ( 
        <Fragment>
            <Navbar bg="dark" data-bs-theme="dark" className='fixed-bottom'>
                <Container>
                    <Nav className="me-auto flex-column">
                        <Navbar.Brand href="/">Colorwave 王</Navbar.Brand>
                        <Nav.Link href="#">Preguntas frecuentes</Nav.Link>
                        <Navbar.Text>© Copyright 2023</Navbar.Text>
                    </Nav>
                </Container>
            </Navbar>
        </Fragment>
    );
}

export default Footer;