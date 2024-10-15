import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FiltroCategorias from './FiltroCategorias';

function BuscarProductos() {
  const [productos, setProductos] = useState([]);
  const [consulta, setConsulta] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  async function buscarProductos() {
    let url = `https://api.mercadolibre.com/sites/MLA/search?q=${consulta}`;
    if (categoriaSeleccionada) {
      url += `&category=${categoriaSeleccionada}`;
    }
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    setProductos(data.results);
  }

  return (
    <div className="contenedor">
  <h1>Buscar productos</h1>
  <div className="buscar-input">
    <input
      type="text"
      placeholder="Buscar"
      value={consulta}
      onChange={(evento) => setConsulta(evento.target.value)}
    />
    <button onClick={buscarProductos}>Buscar</button>
  </div>
  <FiltroCategorias onSelectCategoria={setCategoriaSeleccionada} />
  <div className="lista-productos">
    {productos.map((producto) => (
      <div key={producto.id} className="producto">
        <h3>{producto.title}</h3>
        <p>Precio: ${producto.price}</p>
        <img src={producto.thumbnail} alt={producto.title} />
        <Link to={`/producto/${producto.id}`}>Ver detalles</Link>
      </div>
    ))}
  </div>
</div>

  );
}

export default BuscarProductos;
