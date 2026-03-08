import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      toast.success("Login successful");

      navigate("/");
      setLoading(false);
    } catch (err) {
      toast.error("Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur-md p-8 shadow-xl rounded-2xl w-96 border border-green-100"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-700">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">
            Login to access your marketplace
          </p>
        </div>

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-3 w-full mb-4 rounded-lg outline-none transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-3 w-full mb-4 rounded-lg outline-none transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const res = await axios.post(
                "http://localhost:8000/auth/google",
                {
                  token: credentialResponse.credential,
                },
              );

              localStorage.setItem("token", res.data.token);
              localStorage.setItem("role", res.data.user.role);
              localStorage.setItem("name", res.data.user.name);

              navigate("/");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-green-600 font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
