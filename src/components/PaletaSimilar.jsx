import React, { Fragment, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card, CardGroup, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const PaletaSimilar = ({agregarPaleta}) => {
    const [paletaSimilar, armarPaletaSimilar] = useState([]);
    const [color1, setColor1] = useState([191, 199, 214]);
    const [color2, setColor2] = useState([227, 237, 240]);

    const consultarAPIColoresSimilares = async () => {
        const url = "https://cors-anywhere.herokuapp.com/http://colormind.io/api/";
        const datos = {input:[color1, color2, "N", "N", "N"], model:"default"};

        try {
            const respuesta = await axios.post(url, datos);
            if(respuesta.status === 200) {
                const resultado = respuesta.data;
                const paletaNueva = resultado.result;
                armarPaletaSimilar(paletaNueva);
                agregarPaleta(paletaNueva);
            } else {
                console.error('La solicitud falló, con el siguiente estado: ', respuesta.status);
            }
        } catch(error) {
            console.error('La solicitud falló, con el siguiente error: ', error);
        }
    };

    const manejarElCambioDelColor = (e, setColor) => {
        const color = e.target.value.slice(1).match(/.{2}/g).map((c) => parseInt(c, 16));
        setColor(color);
    };
    
    const colorAString = (color) => { 
        color.map((c) => c.toString(16).padStart(2, '0')).join('');
    };

    return ( 
        <Fragment>
            <CardGroup> 
                {paletaSimilar.length > 0 &&
                    paletaSimilar.map((color, index) => (
                        <OverlayTrigger
                            key={index}
                            placement="bottom"
                            overlay={<Tooltip>{`RGB: ${color.join(', ')}`}</Tooltip>}
                            ><Card
                                style={{
                                width: '100px',
                                height: '200px',
                                backgroundColor: `rgb(${color})`,
                                margin: '5px',
                                }}
                            ></Card>
                        </OverlayTrigger>
                ))}
            </CardGroup>
            <Form className="inputColor">
                <div style={{overflowX:'hidden'}}>
                    <Row className="justify-content-md-center flex-nowrap">
                        <Col md="auto">     
                            <Form.Group controlId="color1">
                            <Form.Label className="subtitulo">Color 1</Form.Label>
                            <Form.Control
                                type="color"
                                title="Elegí un color"
                                value={colorAString(color1)}
                                onChange={(c) => manejarElCambioDelColor(c, setColor1)}
                            />
                            </Form.Group>
                        </Col>
                        <Col md="auto">    
                            <Form.Group controlId="color2">
                            <Form.Label className="subtitulo">Color 2</Form.Label>
                            <Form.Control
                                type="color"
                                title="Elegí un color"
                                value={colorAString(color2)}
                                onChange={(c) => manejarElCambioDelColor(c, setColor2)}
                            />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>          
            </Form>
            <div className="d-grid gap-2 button-container">
                <Button
                    variant="light"
                    type="button"
                    size="lg"
                    onClick={consultarAPIColoresSimilares}
                ><b>Generar Paleta</b></Button>
            </div>
        </Fragment>
    );
}
 
export default PaletaSimilar;