import React, { useState } from "react";
import { Mail, Lock, User, UserPlus, Loader2 } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function SignUp({ onToggle }) {
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
    <div className="w-full max-w-md p-8 backdrop-blur-lg rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-gray-300">Join us today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
            placeholder="Full name"
            required
          />
        </div>

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

        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-medium transition-colors mb-2 ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
          }`}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" /> 
          ) : (
            <UserPlus className="h-5 w-5" />
          )}
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {errMsg && <span className="text-red-500 text-center">{errMsg}</span>}
      </form>

      <p className="mt-6 text-center text-gray-300">
        Already have an account?{" "}
        <button
          onClick={onToggle}
          className="text-purple-400 hover:text-purple-300 font-medium"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
