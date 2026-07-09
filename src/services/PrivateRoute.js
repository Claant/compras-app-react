// PrivateRoute.js

// aca se maneja la ruta privada, que es la ruta que solo puede ser accedida por usuarios autenticados, es decir 
// para acceder a la vista principal de la aplicacion, el usuario debe estar logueado, si no lo esta, se redirige a la vista de bienvenida
import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase.js";

export default function PrivateRoute({ children }) {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/welcome" />;
}
