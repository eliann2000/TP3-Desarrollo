import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CarritoCompras(props) {
  const { carrito, eliminarDelCarrito } = props;
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  function calcularTotal() {
    let total = 0;
    carrito.forEach(function (producto) { total += producto.price; });
    return total;
  }

  function manejarClick() {
    setMostrarCarrito(!mostrarCarrito);
  }

  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px' }}>
      <div onClick={manejarClick} style={{ cursor: 'pointer' }}>
        <span role="img" aria-label="Carrito">🛒</span>
        {carrito.length > 0 && <span>({carrito.length})</span>}
      </div>

      {mostrarCarrito === true && (
        <div className="carrito-compras">
        <h2>Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          carrito.map((producto) => (
            <div key={producto.id} className="producto-carrito">
              <img src={producto.thumbnail} alt={producto.title} />
              <div>
                <h3>{producto.title}</h3>
                <p>Precio: ${producto.price}</p>
              </div>
              <button onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>
            </div>
          ))
        )}
        <h3>Total: ${calcularTotal()}</h3>
        <Link to="/" onClick={() => setMostrarCarrito(false)}>Volver</Link>
      </div>
      
      )}
    </div>
  );
}

export default CarritoCompras;

