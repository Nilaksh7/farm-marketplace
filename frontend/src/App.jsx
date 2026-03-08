import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import FarmerOrders from "./pages/FarmerOrders";
import FarmerDashboard from "./pages/FarmerDashboard";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();

  return (
    <div>
      {/* Hide navbar on login & register pages */}
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar />
      )}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Buyer routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute role="BUYER">
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute role="BUYER">
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Farmer routes */}
        <Route
          path="/farmer-dashboard"
          element={
            <ProtectedRoute role="FARMER">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-products"
          element={
            <ProtectedRoute role="FARMER">
              <MyProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute role="FARMER">
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/farmer-orders"
          element={
            <ProtectedRoute role="FARMER">
              <FarmerOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
