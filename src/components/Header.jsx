import React, { Fragment } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';

const Header = ({seleccionarFuncionalidad, estaPendiente, menu}) => {
    return ( 
        <Fragment>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Colorwave 王</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#" 
                            onClick={() => seleccionarFuncionalidad(estaPendiente, 'paletaRandom')} 
                            isActive={menu === 'paletaRandom'}>
                            <Button variant="dark" type="button">
                                Paleta de Colores Aleatorios
                            </Button>
                        </Nav.Link>
                        <Nav.Link href="#" 
                            onClick={() => seleccionarFuncionalidad(estaPendiente, 'paletaSimilar')} 
                            isActive={menu === 'paletaSimilar'}>
                            <Button variant="dark" type="button">
                                Paleta de Colores Similares
                            </Button>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <h2 className="subtitulo">Hace realidad todos tus diseños</h2>
        </Fragment>
    );
}

export default Header;