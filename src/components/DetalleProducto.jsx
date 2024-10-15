import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DetalleProducto(props) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(function() {
    async function obtenerDetalles() {
      const respuesta = await fetch(`https://api.mercadolibre.com/items/${id}`);
      const data = await respuesta.json();
      setProducto(data);
    }
    obtenerDetalles();
  }, [id]);

  if (producto === null) {
    return <p>Cargando</p>;
  }

  function manejarCompra () {
    props.agregarAlCarrito(producto);
  }

  return (
    <div>
      <h1>{producto.title}</h1>
      <p>Precio: ${producto.price}</p>
      <img src={producto.pictures[0]?.url} alt={producto.title} />
      <p>{producto.description}</p>
      <button onClick={manejarCompra }>Comprar</button>
      <Link to="/">Volver</Link>
    </div>
  );
}

export default DetalleProducto;
