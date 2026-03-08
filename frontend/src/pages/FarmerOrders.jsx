import { useEffect, useState } from "react";
import API from "../services/api";

function FarmerOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/farmer");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching farmer orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-10 bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          Customer Orders
        </h1>
        <p className="text-gray-500">Orders placed for your farm products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 border">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-green-700">{orders.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-green-700">
            ₹{orders.reduce((sum, o) => sum + (o.price * o.quantity || 0), 0)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border">
          <p className="text-gray-500 text-sm">Products Sold</p>
          <p className="text-2xl font-bold text-green-700">
            {orders.reduce((sum, o) => sum + (o.quantity || 0), 0)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
        <table className="w-full">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="p-3 text-left border-b">Order ID</th>
              <th className="p-3 text-left border-b">Buyer</th>
              <th className="p-3 text-left border-b">Product</th>
              <th className="p-3 text-left border-b">Quantity</th>
              <th className="p-3 text-left border-b">Price</th>
              <th className="p-3 text-left border-b">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.order_id} className="hover:bg-green-50 transition">
                <td className="p-3 text-left border-b">{o.order_id}</td>
                <td className="p-3 text-left border-b">{o.buyer}</td>
                <td className="p-3 text-left border-b">{o.product}</td>
                <td className="p-3 text-left border-b">{o.quantity}</td>
                <td className="p-3 text-left border-b font-semibold text-green-700">
                  ₹{o.price}
                </td>
                <td className="p-3 text-left border-b">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    Delivered
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FarmerOrders;
