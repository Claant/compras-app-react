


// aca se maneja la logica de autenticacion, que es la que permite saber si el usuario esta logueado o no, y en base a eso, se decide si se renderiza el componente hijo o se redirige a la vista de bienvenida

import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase.js";

export default function PrivateRoute({ children }) {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/welcome" />;
}
