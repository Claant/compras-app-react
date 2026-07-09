import { useState, useEffect } from "react";
import { db } from "../services/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import ProductItem from "../components/ProductItem.js";
import ProductForm from "../components/ProductForm.jsx";

// aca se define el componente ProductList, que maneja la lista de productos y el carrito de compras
const ProductList = () => {
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);

  // aca se agrega un producto al carrito, si ya existe, se incrementa la cantidad
  // esta funcion se pasa como prop al componente hijo ProductItem, para que este pueda llamar a la funcion cuando se haga click en el boton de agregar al carrito
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);

  // aca se agrega un producto al carrito, si ya existe, se incrementa la cantidad
    if (existe) {
      const actualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      // Actualiza el estado del carrito con la nueva cantidad
      setCarrito(actualizado);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };
  // el componente padre que es el ProductList le pasa la funcion agregarAlCarrito que es un callback al componente hijo ProductItem, para que este pueda llamar a la funcion cuando se haga click en el boton de agregar al carrito
  // aca se cargan los productos desde Firestore
  const cargarProductos = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const lista = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // aca se actualiza el estado de productos con la lista obtenida de Firestore
    setProductos(lista);
  };

  // useEffect para cargar los productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  // Calcular total general del carrito
  const totalCarrito = carrito.reduce(
    (acc, item) => acc + item.cantidad * item.precio,
    0
  );

  // aca se renderiza la lista de productos y el carrito
  // <ProductForm onProductoAgregado={cargarProductos} />  este codigo permite que el componente ProductForm pueda llamar a la funcion cargarProductos cuando se agregue un nuevo producto, para que la lista de productos se actualice automaticamente
  //  <ProductItem producto={p} onAdd={agregarAlCarrito} />  este codigo permite que el componente ProductItem pueda llamar a la funcion agregarAlCarrito cuando se haga click en el boton de agregar al carrito, para que el carrito se actualice automaticamente
  return (
    
    <div className="container my-4">
      <h2 className="mb-4 text-center text-success">Lista de productos</h2>


      <ProductForm onProductoAgregado={cargarProductos} />

      <div className="row">
        {productos.map((p) => (
          <div key={p.id} className="col-md-4 mb-3">
            <ProductItem producto={p} onAdd={agregarAlCarrito} />
          </div>
        ))}
      </div>

      <h3 className="mt-5 text-success">Carrito</h3>
      <table className="table table-striped table-bordered mt-3">
        <thead className="table-success">
          <tr>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        
        <tbody>
          {carrito.map((c) => (
            <tr key={c.id}>
              <td>{c.nombre}</td>
              <td className="text-danger fw-bold">{c.cantidad}</td>
              <td>${c.cantidad * c.precio}</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="2" className="text-end">Total</td>
            <td>${totalCarrito}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
