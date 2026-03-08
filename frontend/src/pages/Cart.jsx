import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [items, setItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setItems(res.data);
    } catch (err) {
      console.log(err);
      alert("Error loading cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.log(err);
      alert("Error removing item");
    }
  };

  const checkout = async () => {
    try {
      await API.post("/orders");

      alert("Order placed successfully");

      setItems([]);
    } catch (err) {
      console.log(err);
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const updateQuantity = async (productId, quantity) => {
    try {
      await API.put("/cart/update", {
        product_id: productId,
        quantity: quantity,
      });

      fetchCart(); // reload cart
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 md:p-12 bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-green-700 mb-2">Your Cart 🛒</h1>
        <p className="text-gray-500">Review your items before checkout</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          <p className="text-3xl mb-2">🛒 Your cart is empty</p>
          <p>Add some fresh farm products to get started!</p>
        </div>
      ) : (
        <div className="flex gap-10">
          {/* Cart Items */}
          <div className="flex-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border p-5 mb-4 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Price: ₹{item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity - 1)
                      }
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition"
                    >
                      -
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity + 1)
                      }
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition"
                    >
                      +
                    </button>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    Subtotal: ₹{item.price * item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-80 sticky top-24 h-fit">
            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-3">
                <span>Subtotal</span>
                <span className="font-semibold">₹{total}</span>
              </div>

              <button
                onClick={checkout}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 shadow transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
