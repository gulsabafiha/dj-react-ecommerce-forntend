import { Container } from "react-bootstrap";
import HomeScreen from "./components/Pages/HomeScreen/HomeScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductScreen from "./components/Pages/ProductScreen/ProductScreen";
import CartScreen from "./components/Pages/CartScreen/CartScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/:id" element={<CartScreen />} />
        <Route path="/cart" element={<CartScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
