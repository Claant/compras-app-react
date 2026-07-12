# PROYECTO WEB  CARRO-COMPRAS-APP
---
## ARQUITECTURA DE COMPONENTES
---
### 1. **firebase.js**: Se encarga de la conexion con Firebase, donde inicializa las instancias de Firestore, Auth y Storage.


### 2. **PrivateRoute.js**: Es un midleware que se encarga de interceptar los accesos a los modulos privados. Su funcion es detectar un inicio de sesion, si es activo, permite el acceso a la vista principal, en caso contrario si es nulo, es redirigido a la vista de Welcome, donde debera logearse con sus credenciales correctas.


### 2. **WelcomeView.js**: Componente que gestiona el inicio de sesion, en donde el cliente debera ingresar sus credenciales, en este caso email y password, y al enviarse el formulario con esos datos, se ejecuta el metodo **signInWithEmailAndPassword** de Firebase Auth. Si las credenciales son correctas, se utiliza **hook useNavigate** para rederigir a la pagina principal.

### 3. **ProductList.js**: Corresponde al componente Padre, cumple una funcion importante, primero porque ejecuta una funcion asincrona **cargarProductos** que realiza una consulta a la coleccion de Firestore. Como segundo punto importante implementa la funcion **agregarAlCarrito** que es pasada como callback a los componentes hijos en este caso a los componentes ProductForm.jsx y ProductItem.js, la cual agrega productos al carro de compras.

### 3. **ProductForm.jsx**: Este componente se encarga de gestionar el formulario, que permite agregar nuevos productos al catalogo. Dentro del formulario existe el campo para subir un archivo de imagen, la cual es almacenada en Storage de Firebase. Al completar la informacion solicitada en los campos del formulario, es enviada a Firestore, donde se crea un nuevo documento en la coleccion. Al hacer clic en el boton Guardar Producto, se ejecuta la funcion prop **onProductoAgregado** comunicando al componente Padre **ProductList.js** que refresque la lsita del catalogo.