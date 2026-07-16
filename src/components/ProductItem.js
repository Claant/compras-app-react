import React from "react";


// esta funcion se encarga de renderizar un producto individual, mostrando su nombre, precio y foto, y permite agregarlo al carrito
const ProductItem = ({ producto, onAdd }) => {
  // Si por alguna razón un producto antiguo de tu Firestore no tiene foto, 
  // le ponemos una imagen gris por defecto para que la app no se vea rota.
  const fotoProducto = producto.imagenUrl || "https://placeholder.com";

  return (
    <div className="card shadow-sm h-100 border-light rounded">
      {/* 🖼️ AQUÍ RENDERIZAMOS LA IMAGEN DESDE FIREBASE STORAGE */}
      <div className="text-center bg-light p-3 rounded-top" style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img 
          src={fotoProducto} 
          className="card-img-top" 
          alt={producto.nombre} 
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
        />
      </div>

      <div className="card-body d-flex flex-column justify-content-between text-center">
        <div>
          <h5 className="card-title text-dark fw-bold mb-2">{producto.nombre}</h5>
          {/* Formato de precio chileno en la tarjeta */}
          <p className="card-text fs-5 text-success fw-bold">
            ${Number(producto.precio).toLocaleString('es-CL')}
          </p>
        </div>
        
        {/* Callback: Al hacer clic, ejecuta la función del padre */}
        <button
          className="btn btn-success btn-sm w-100 mt-3 fw-bold shadow-sm"
          onClick={() => onAdd(producto)}
        >
          ➕ Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
