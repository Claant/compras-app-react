import React from "react";

// aca se maneja el componente ProductItem, que representa un producto individual en la lista de productos
const ProductItem = ({ producto, onAdd }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">${producto.precio}</p>
        <button
          className="btn btn-primary"
          onClick={() => onAdd(producto)}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductItem;

