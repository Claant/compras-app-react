import { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { db } from "../services/firebase.js";
import { addDoc, collection } from "firebase/firestore";

// aca se define el componente ProductoForm, que maneja el formulario para agregar productos
function ProductoForm({ onProductoAgregado }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const validator = new SimpleReactValidator();


  // aca se maneja el submit del formulario, validando los campos y agregando el producto a Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      await addDoc(collection(db, "productos"), {
        nombre,
        precio: Number(precio),
      });
      setNombre("");
      setPrecio("");
      onProductoAgregado(); // refresca la lista
    } else {
      validator.showMessages();
    }
  };

  // aca se renderiza el formulario con los campos de nombre y precio, y un botón para guardar el producto
  return (
   <form onSubmit={handleSubmit} className="product-form d-flex align-items-center">
  <input
    type="text"
    className="form-control form-control-sm product-input me-1"
    placeholder="Nombre"
    value={nombre}
    onChange={(e) => setNombre(e.target.value)}
  />
  <input
    type="number"
    className="form-control form-control-sm product-input me-1"
    placeholder="Precio"
    value={precio}
    onChange={(e) => setPrecio(e.target.value)}
  />
  <button type="submit" className="btn btn-sm boton-guardar">
    Guardar producto
  </button>
</form>


  );
}

export default ProductoForm;
