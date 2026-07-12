// WelcomeView.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase.js";
import { useNavigate } from "react-router-dom";

// aca se maneja la vista de bienvenida, que es la primera vista que se muestra al usuario cuando entra a la aplicacion
export default function WelcomeView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  // esta funcion se encarga de manejar el login del usuario, utilizando la funcion signInWithEmailAndPassword de Firebase Auth
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirige a la vista principal
    } catch (error) {
      alert("Credenciales inválidas: " + error.message);
    }
  };

  return (
    <div className="login-container mt-5">
  <h2 className="mb-4">Bienvenido al carro de compras</h2>
  <form onSubmit={handleLogin} className="login-form">
    <input
      type="email"
      className="form-control mb-3 login-input"
      placeholder="claudio@ejemplo.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="password"
      className="form-control mb-3 login-input"
      placeholder="12345678"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button type="submit" className="btn btn-primary login-btn">
      Iniciar sesión
    </button>
  </form>
</div>

  );
}
