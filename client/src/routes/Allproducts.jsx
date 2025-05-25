import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "../components/productsdetails";

const Linking = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductDetails />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Linking;
