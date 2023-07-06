import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import PaletaRandom from './components/PaletaRandom';
import PaletaSimilar from './components/PaletaSimilar';
import Footer from './components/Footer';
import { useEffect, useState, useTransition } from 'react';
import { Button } from 'react-bootstrap';

function App() {
  let paletasGuardadas = JSON.parse(localStorage.getItem('paleta'));
  !paletasGuardadas ? paletasGuardadas = [] : <></>;

  const [estaPendiente, cambiarBoton] = useTransition();
  const [menu, cambiarPuntero] = useState('paletaRandom');
  
  const [paletas, editarPaletas] = useState(paletasGuardadas);
  useEffect(() => {
    if(paletasGuardadas) {
      localStorage.setItem('paleta', JSON.stringify(paletas));
    } else {
      localStorage.setItem('paleta', JSON.stringify([]));
    }
  }, [paletasGuardadas, paletas]);

  const agregarPaleta = (paleta) => {
    editarPaletas([...paletas, paleta]);
  };

  const eliminarPaleta = () => {
    const nuevasPaletas = [...paletas];
    nuevasPaletas.pop();
    editarPaletas(nuevasPaletas);
  };

  function seleccionarFuncionalidad (estaPendiente, funcionalidadNueva) { 
    if(estaPendiente) { return; }
    cambiarBoton(() => {cambiarPuntero(funcionalidadNueva)});
  };

  return (
    <div className="app-container">
      <Header 
        seleccionarFuncionalidad={seleccionarFuncionalidad} 
        estaPendiente={estaPendiente} 
        menu={menu} 
      />
      {menu === 'paletaRandom' && <PaletaRandom agregarPaleta={agregarPaleta}/>}
      {menu === 'paletaSimilar' && <PaletaSimilar agregarPaleta={agregarPaleta}/>}
      <Footer/>
      <div className="d-grid gap-2 button-container">
        {paletas.length > 0 && (
          <Button
            variant="dark"
            type="button"
            size="lg"
            onClick={() => eliminarPaleta()}
          ><b>Eliminar paleta</b></Button>
        )}  
      </div>
    </div>
  );
}

export default App;