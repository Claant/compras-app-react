// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "../components/ProductList";
import Welcome from "../components/Welcome";
import PrivateRoute from "../services/PrivateRoute";
import "../styles/App.css";
import "../styles/Welcome.css";
import "../styles/index.css";

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">   
        <main className="flex-grow-1 container my-4">
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <h1 className="titulo-carro">Carro de Compras</h1>
                  <ProductList />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
