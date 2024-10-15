import React from 'react';

function ResumenCarrito({ carrito }) {
  const totalArticulos = carrito.length;
  let totalPrecio = 0;
  carrito.forEach(producto => {
    totalPrecio += producto.price;
  });
  
  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h2>Resumen del carrito</h2>
      <p>Total articulos: {totalArticulos}</p>
      <p>Total pagar: ${totalPrecio}</p>
    </div>
  );
}

export default ResumenCarrito;