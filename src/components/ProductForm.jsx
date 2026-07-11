import { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { db, storage } from "../services/firebase.js"; // 👈 Asegúrate de importar 'storage'
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // 👈 Módulos de Storage

function ProductoForm({ onProductoAgregado }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null); // 👈 Estado para el archivo binario
  const [validator] = useState(() => new SimpleReactValidator());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.allValid() && imagen) {
      try {
        // 1. Crear referencia única en tu carpeta de la nube "imagenes"
        const nombreArchivo = `${Date.now()}_${imagen.name}`;
        const storageRef = ref(storage, `imagenes/${nombreArchivo}`);

        // 2. Subir el archivo binario a Firebase Storage
        const snapshot = await uploadBytes(storageRef, imagen);

        // 3. Obtener el enlace URL de internet de esa imagen subida
        const urlDescarga = await getDownloadURL(snapshot.ref);

        // 4. Guardar el producto en Firestore incluyendo el enlace de la imagen
        await addDoc(collection(db, "productos"), {
          nombre,
          precio: Number(precio),
          imagenUrl: urlDescarga, // 👈 Guardamos el enlace de texto en la BD
        });

        // Limpiar el formulario
        setNombre("");
        setPrecio("");
        setImagen(null);
        e.target.reset(); // Resetea el input file visualmente
        
        onProductoAgregado(); // Refresca la lista en el Padre
      } catch (error) {
        console.error("Error al guardar producto e imagen:", error);
      }
    } else {
      validator.showMessages();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form d-flex align-items-center mb-4">
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
      {/* 👈 NUEVO INPUT PARA LA IMAGEN DEL PRODUCTO */}
      <input
        type="file"
        accept="image/*"
        className="form-control form-control-sm product-input me-1"
        onChange={(e) => setImagen(e.target.files[0])}
      />
      <button type="submit" className="btn btn-sm btn-success boton-guardar">
        Guardar producto
      </button>
    </form>
  );
}

export default ProductoForm;
