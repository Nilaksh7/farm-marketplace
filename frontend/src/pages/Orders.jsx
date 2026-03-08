import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
        alert("Error loading orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-10 bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-700 mb-2">My Orders</h1>
        <p className="text-gray-500">Track all your marketplace purchases</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          <p className="text-3xl mb-2">📦 No orders yet</p>
          <p>Start shopping fresh farm products!</p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 mb-6 border"
          >
            <p className="font-semibold text-lg text-green-700">
              Order #{order.id}
            </p>
            <div className="mt-2 inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              Order Placed
            </div>
            <p className="text-gray-600">
              Product ID:{" "}
              <span className="font-medium">{order.product_id}</span>
            </p>
            <p className="text-gray-600">
              Quantity: <span className="font-medium">{order.quantity}</span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
