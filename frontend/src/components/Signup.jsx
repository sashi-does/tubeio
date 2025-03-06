import React, { useState } from "react";
import { Mail, Lock, User, UserPlus, Loader2 } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Signup({ onToggle }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");
    try {
      const url = import.meta.env.VITE_TUBEIO_SIGNUP_API;
      console.log(url);
      const user = { username: name, email, password };
      const response = await axios.post(url, user);

      if (response.status === 201) {
        console.log(response.data.message);
        Cookies.set("jwtToken", response.data.token);
        navigate("/complete-step");
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      setErrMsg(e.response?.data?.message || "An error occurred");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl shadow-xl text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Create Account</h2>
        <p className="text-gray-300">Join us today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300"
            placeholder="Full name"
            required
          />
        </div>

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

        <button
          type="submit"
          className={`w-full cursor-pointer flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-in-out relative overflow-hidden group ${
            loading 
              ? "bg-gray-500 cursor-not-allowed shadow-md" 
              : "bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white shadow-lg hover:from-[#1e40af] hover:to-[#1d4ed8] hover:scale-105 active:scale-95"
          }`}
          disabled={loading}
        >
          <span className="relative z-10 flex items-center gap-2">
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <UserPlus className="h-5 w-5" />
            )}
            {loading ? "Creating Account..." : "Create Account"}
          </span>
          {!loading && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out transform -translate-x-full group-hover:translate-x-0"></div>
          )}
        </button>

        {errMsg && <span className="text-red-400 text-sm mt-0 mb-0">{errMsg}</span>}
      </form>

      <p className="mt-6 text-center text-gray-300">
        Already have an account?{" "}
        <button
          onClick={onToggle}
          className="text-blue-400 hover:text-blue-300 font-medium"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}