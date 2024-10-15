import React, { useState, useEffect } from 'react';

function FiltroCategorias(props) {
  const [categorias, setCategorias] = useState([]);

  useEffect(function () {
    async function obtenerCategorias() {
      const respuesta = await fetch('https://api.mercadolibre.com/sites/MLA/categories');
      const data = await respuesta.json();
      setCategorias(data);
    }
    obtenerCategorias();
  }, []);

  function manejarCambio(event) {
    props.onSelectCategoria(event.target.value);
  }

  return (
    <div>
      <h2>Filtrar por categoria</h2>
      <select onChange={manejarCambio}>
        <option value="">Categorias</option>
        {categorias.map(function (categoria) {
          return (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FiltroCategorias;
