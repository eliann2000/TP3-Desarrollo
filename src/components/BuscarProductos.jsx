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
    <div>
      <h1>Buscar productos</h1>
      <input
        type="text"
        placeholder="Buscar"
        value={consulta}
        onChange={function(evento) { setConsulta(evento.target.value); }}
      />
      <button onClick={buscarProductos}>Buscar</button>

      <FiltroCategorias onSelectCategoria={setCategoriaSeleccionada} />

      <div>
        {productos.map(function(producto) {
          return (
            <div key={producto.id}>
              <h3>{producto.title}</h3>
              <p>Precio: ${producto.price}</p>
              <img src={producto.thumbnail} alt={producto.title} />
              <Link to={`/producto/${producto.id}`}>Ver detalles</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BuscarProductos;
