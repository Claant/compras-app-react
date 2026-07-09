import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap desde node_modules (asegúrate de haber hecho npm install bootstrap)
import App from './layout/App.js';// Importa tu layout principal
import reportWebVitals from './reportWebVitals'; // Reporte de métricas
import "./styles/App.css";
import "./styles/index.css";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

reportWebVitals();
