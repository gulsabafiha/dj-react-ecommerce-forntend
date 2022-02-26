import { Container } from "react-bootstrap";
import HomeScreen from "./components/Pages/HomeScreen/HomeScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductScreen from "./components/Pages/ProductScreen/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
