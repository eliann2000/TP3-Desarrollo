import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DetalleProducto(props) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
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

  function manejarCompra() {
    props.agregarAlCarrito(producto);
  }

  return (
    <div className="detalle-contenedor">
      <h1 className="detalle-titulo">{producto.title}</h1>
      <div className="detalle-imagen-contenedor">
        <img src={producto.pictures[0]?.url} alt={producto.title} className="detalle-imagen" />
      </div>
      <p className="detalle-precio">Precio: ${producto.price}</p>
      <p className="detalle-descripcion">{producto.description}</p>
      <button onClick={manejarCompra} className="boton-comprar">Agregar al Carrito</button>
      <Link to="/" className="detalle-volver">Volver</Link>
    </div>
  );
}

export default DetalleProducto;
