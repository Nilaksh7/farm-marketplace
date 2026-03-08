import { useEffect, useState } from "react";
import addToCart from "../services/cartService";
import API from "../services/api";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get("/products");
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = p.price <= maxPrice;
    const matchesCategory = category === "All" || p.category === category;

    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100 px-6 py-10">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          🌾 Farm Marketplace
        </h1>
        <p className="text-gray-600 text-lg">
          Fresh produce directly from local farmers
        </p>
      </div>

      {/* Filters Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Search */}
          <input
            type="text"
            placeholder="Search fresh products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Price */}
          <div>
            <label className="text-sm font-semibold block mb-2">
              Max Price: ₹{maxPrice}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Cart Button */}
          {localStorage.getItem("role") === "BUYER" && (
            <Link
              to="/cart"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition shadow"
            >
              🛒 Go to Cart
            </Link>
          )}
        </div>

        {/* Category Buttons */}
        <div className="flex gap-3 mt-6 flex-wrap">
          {["All", "Vegetables", "Fruits", "Dairy"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === c
                  ? "bg-green-600 text-white shadow"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-2xl">No products found</p>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition transform duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={p.image_url || "https://via.placeholder.com/300"}
                    alt={p.name}
                    className="h-48 w-full object-cover group-hover:scale-110 transition duration-300"
                  />

                  {/* Category Badge */}
                  {p.category && (
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
                      {p.category}
                    </span>
                  )}

                  {/* Farm Name Badge */}
                  {p.farm_name && (
                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-green-700 text-xs px-3 py-1 rounded-full shadow font-semibold">
                      🌾 {p.farm_name}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between h-48">
                  <div>
                    <h2 className="text-lg font-semibold mb-1">{p.name}</h2>

                    <p className="text-gray-600 text-sm line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-bold text-green-600 mb-3">
                      ₹{p.price}
                    </p>

                    {localStorage.getItem("role") === "BUYER" && (
                      <button
                        onClick={() => addToCart(p.id)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition transform hover:scale-105"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
