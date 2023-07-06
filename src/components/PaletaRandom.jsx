import React, { Fragment, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';

const PaletaRandom = ({agregarPaleta}) => {
    const [paletaRandom, armarPaletaRandom] = useState([]);

    const consultarAPIColoresRandom = async () => {
        const url = "https://cors-anywhere.herokuapp.com/http://colormind.io/api/";
        const datos = {model:"default"};

        try {  
            const respuesta = await axios.post(url, datos);
            if(respuesta.status === 200) {
                const resultado = respuesta.data;
                const paletaNueva = resultado.result;
                armarPaletaRandom(paletaNueva);
                agregarPaleta(paletaNueva);
            } else {
                console.error('La solicitud falló, con el siguiente estado: ', respuesta.status);
            } 
        } catch(error) {
            console.error('La solicitud falló, con el siguiente error: ', error);
        }
    };

    return ( 
      <Fragment>
        <CardGroup>
          {paletaRandom.length > 0 &&
            paletaRandom.map((color, index) => (
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
        <div className="d-grid gap-2 button-container">
          <Button
            variant="light"
            type="button"
            size="lg"
            onClick={consultarAPIColoresRandom}
          ><b>Generar Paleta</b></Button>
        </div>  
      </Fragment>
    );
}

export default PaletaRandom;