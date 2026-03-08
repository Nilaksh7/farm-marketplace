import { useEffect, useState } from "react";
import API from "../services/api";

function MyProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/my");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-green-700 mb-8">My Products</h1>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-2xl">No products added yet</p>
          <p className="mt-2">Add products to start selling</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-200 overflow-hidden border"
            >
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="h-36 w-full object-cover"
                />
              )}

              <div className="p-4">
                {p.category && (
                  <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">
                    {p.category}
                  </span>
                )}

                <h2 className="text-lg font-semibold mb-1">{p.name}</h2>

                <p className="text-gray-500 text-xs mb-2 line-clamp-2">
                  {p.description}
                </p>

                <p className="text-lg font-bold text-green-600">₹{p.price}</p>

                <div className="mt-2 mb-4">
                  <span className="text-sm text-gray-500">
                    Stock: {p.stock_quantity ?? 0}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 text-sm rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProducts;
