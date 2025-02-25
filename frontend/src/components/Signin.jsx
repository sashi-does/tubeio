import React, { useState } from "react";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function SignIn({ onToggle }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state added

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Show loader when request starts
    setErrMsg(""); // Clear previous error messages
    try {
      const user = { email, password };
      const url = import.meta.env.VITE_TUBEIO_LOGIN_API;
      const response = await axios.post(url, user);
      const data = response.data;

      if (response.status === 200) {
        Cookies.set("jwtToken", data.token);
        navigate("/feed");
        console.log(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      setErrMsg(e.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // ✅ Hide loader after request completes
    }
  };

  return (
    <div className="w-full max-w-md p-8 backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-300">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
            placeholder="Email address"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
            placeholder="Password"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              className="mr-2 rounded bg-white/5 border-gray-600"
            />
            Remember me
          </label>
          <a href="#" className="text-purple-400 hover:text-purple-300">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-medium transition-colors ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
          }`}
          disabled={loading} // ✅ Disable button when loading
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" /> // ✅ Loader icon with spin animation
          ) : (
            <LogIn className="h-5 w-5" />
          )}
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {errMsg && <span className="text-red-500 text-sm mt-0 mb-0">{errMsg}</span>}
      </form>

      <p className="mt-6 text-center text-gray-300">
        Don't have an account?{" "}
        <button
          onClick={onToggle}
          className="text-purple-400 hover:text-purple-300 font-medium"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
