import { useEffect, useState } from "react";
import API from "../services/api";

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const prodRes = await API.get("/products/my");
      const orderRes = await API.get("/orders/farmer");

      setProducts(prodRes.data);
      setOrders(orderRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.price * o.quantity, 0);

  return (
    <div className="p-8 md:p-12 bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          Farmer Dashboard
        </h1>
        <p className="text-gray-500">
          Manage your farm products and track orders
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border">
          <p className="text-gray-500 text-sm">Total Products</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-3xl font-bold">{products.length}</p>
            <span className="text-3xl">📦</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-3xl font-bold">{orders.length}</p>
            <span className="text-3xl">🧾</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-3xl font-bold text-green-600">₹{totalRevenue}</p>
            <span className="text-3xl">💰</span>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/add-product"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition"
          >
            ➕ Add Product
          </a>

          <a
            href="/my-products"
            className="bg-white border hover:bg-gray-50 px-6 py-3 rounded-lg shadow transition"
          >
            📦 Manage Products
          </a>

          <a
            href="/farmer-orders"
            className="bg-white border hover:bg-gray-50 px-6 py-3 rounded-lg shadow transition"
          >
            🧾 View Orders
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border hover:shadow-xl transition">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((o) => (
            <div
              key={o.id}
              className="border-b last:border-none py-4 flex items-center justify-between hover:bg-green-50 px-3 rounded-lg transition"
            >
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">{o.name}</p>
                <p className="text-xs text-gray-500">Order #{o.id}</p>
              </div>

              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                Qty {o.quantity}
              </span>

              <span className="font-bold text-green-600 text-lg">
                ₹{o.price * o.quantity}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FarmerDashboard;
