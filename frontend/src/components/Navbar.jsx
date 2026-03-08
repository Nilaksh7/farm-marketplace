import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const cartCount = localStorage.getItem("cartCount") || 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-green-600 tracking-wide hover:scale-105 transition"
        >
          🌾 <span>FarmMarket</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          {!token && (
            <>
              <Link
                to="/login"
                className="hover:text-green-600 transition font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow"
              >
                Register
              </Link>
            </>
          )}

          {token && (
            <>
              <Link to="/products" className="hover:text-green-600 transition">
                Products
              </Link>

              {role === "FARMER" && (
                <>
                  <Link
                    to="/my-products"
                    className="hover:text-green-600 transition"
                  >
                    My Products
                  </Link>

                  <Link
                    to="/add-product"
                    className="hover:text-green-600 transition"
                  >
                    Add Product
                  </Link>

                  <Link
                    to="/farmer-orders"
                    className="hover:text-green-600 transition"
                  >
                    Orders
                  </Link>

                  <Link
                    to="/farmer-dashboard"
                    className="hover:text-green-600 transition"
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {role === "BUYER" && (
                <>
                  <Link
                    to="/cart"
                    className="relative flex items-center gap-1 hover:text-green-600 transition"
                  >
                    🛒 Cart
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/orders"
                    className="hover:text-green-600 transition"
                  >
                    Orders
                  </Link>
                </>
              )}

              {/* Welcome */}
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Welcome {name} 👋
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
