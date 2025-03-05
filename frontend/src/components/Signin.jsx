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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");
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
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl shadow-xl text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-300">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300"
            placeholder="Email address"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300"
            placeholder="Password"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2 bg-white/10 border-gray-500" />
            Remember me
          </label>
          <a href="#" className="text-blue-400 hover:text-blue-300">Forgot password?</a>
        </div>
        
        <button
  type="submit"
  className={`w-full cursor-pointer flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-in-out relative overflow-hidden group ${
    loading 
      ? "bg-gray-500 cursor-not-allowed shadow-md" 
      : "bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white shadow-lg  hover:scale-105 active:scale-95"
  }`}
  disabled={loading}
>
  <span className="relative z-10 flex items-center gap-2">
    {loading ? (
      <Loader2 className="h-5 w-5 animate-spin" />
    ) : (
      <LogIn className="h-5 w-5" />
    )}
    {loading ? "Signing In..." : "Sign In"}
  </span>
  {!loading && (
    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out transform -translate-x-full group-hover:translate-x-0"></div>
  )}
</button>

        {errMsg && <span className="text-red-400 text-sm mt-0 mb-0">{errMsg}</span>}
      </form>

      <p className="mt-6 text-center text-gray-300">
        Don't have an account? {" "}
        <button onClick={onToggle} className="text-blue-400 cursor-pointer hover:text-blue-300 font-medium">
          Sign up
        </button>
      </p>
    </div>
  );
}
