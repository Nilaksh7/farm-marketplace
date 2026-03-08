import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("BUYER");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      toast.success("Registered successfully");

      navigate("/");
      setLoading(false);
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      toast.error("Register failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
      <form
        onSubmit={handleRegister}
        className="bg-white/90 backdrop-blur-md p-8 shadow-xl rounded-2xl w-96 border border-green-100"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-700">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">
            Join the farm marketplace
          </p>
        </div>

        <input
          placeholder="Name"
          className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-3 w-full mb-4 rounded-lg outline-none transition"
          onChange={(e) => setName(e.target.value)}
        />

        <input
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

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-3 w-full mb-5 rounded-lg outline-none transition"
        >
          <option value="BUYER">Buyer</option>
          <option value="FARMER">Farmer</option>
        </select>

        <button
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await axios.post(
                  "http://localhost:8000/auth/google",
                  {
                    token: credentialResponse.credential,
                    role: role,
                  },
                );

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.user.role);
                localStorage.setItem("name", res.data.user.name);

                navigate("/");
              } catch (err) {
                console.error(err);
                toast.error("Google registration failed");
              }
            }}
            onError={() => {
              console.log("Google Register Failed");
            }}
          />
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
