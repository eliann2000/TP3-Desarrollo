import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BuscarProductos from './components/BuscarProductos';
import DetalleProducto from './components/DetalleProducto';
import CarritoCompras from './components/CarritoCompras';
import ResumenCarrito from './components/ResumenCarrito';

function App() {
  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(producto) {
    setCarrito(function (carritoAnterior) {
      return carritoAnterior.concat(producto);
    });
  }

  function filtrarProductos(carritoAnterior, id) {
    return carritoAnterior.filter(function (producto) {
      return producto.id !== id;
    });
  }

  function eliminarDelCarrito(id) {
    setCarrito(function (carritoAnterior) {
      return filtrarProductos(carritoAnterior, id);
    });
  }

  return (
    <Router>
      <CarritoCompras carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
      <ResumenCarrito carrito={carrito} />
      <Routes>
        <Route path="/" element={<BuscarProductos />} />
        <Route path="/producto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />
      </Routes>
    </Router>
  );
}



export default App;
