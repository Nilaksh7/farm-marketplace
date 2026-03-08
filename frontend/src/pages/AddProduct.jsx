import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    image: null,
    category: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({
        ...form,
        image: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", Number(form.price));
      data.append("stock_quantity", Number(form.stock_quantity));
      data.append("category", form.category);
      if (form.image) data.append("image", form.image);

      await API.post("/products", data);

      toast.success("Product added successfully");

      setForm({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        image: null,
        category: "",
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Error adding product");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-700">Add New Product</h1>
          <p className="text-gray-500 mt-2">
            List fresh items for buyers in the marketplace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="number"
              name="stock_quantity"
              placeholder="Stock"
              value={form.stock_quantity}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Category</option>
            <option value="Vegetables">🥕 Vegetables</option>
            <option value="Fruits">🍎 Fruits</option>
            <option value="Dairy">🥛 Dairy</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-[1.02] shadow disabled:opacity-50"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
