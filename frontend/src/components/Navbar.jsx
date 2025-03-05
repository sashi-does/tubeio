import { useState, useRef, useContext, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Constants from "../context/Context";
import { motion } from "framer-motion";
import axios from "axios";

const Navbar = ({
  search,
  onChangeSearch,
  submitHandler,
  clearSearch,
  theme,
}) => {
  const { onToggleTheme } = useContext(Constants);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_TUBEIO_USER_API + "/username";

  const getUsername = async () => {
    try {
      const response = await axios.get(url, {
        headers: { authorization: `Bearer ${Cookies.get("jwtToken")}` },
      });
      console.log(response.data.username);
      setUsername(response.data.username || "Guest");
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUsername("Guest");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const onClickLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/", { replace: true });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200
        ${theme ? "bg-white border-gray-200" : "bg-gray-900 border-gray-800"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img
              alt="website logo"
              className={theme ? "h-9 w-auto" : "h-8 w-auto"}
              src={
                theme
                  ? "https://res.cloudinary.com/dvukdxs2m/image/upload/v1739785925/Screenshot_2025-02-17_at_3.21.55_PM_v6j3m8.png"
                  : "https://res.cloudinary.com/dvukdxs2m/image/upload/v1739785683/tubeio-dark_huj4uc.png"
              }
            />
          </div>
          <form onSubmit={submitHandler} className="flex-grow mx-4 max-w-xl">
            <div
              className={`flex items-center rounded-lg shadow-sm ${
                theme ? "bg-white" : "bg-gray-800"
              }`}
            >
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={search}
                  onChange={onChangeSearch}
                  onKeyDown={(e) => e.key === "Enter" && submitHandler(e)} // Ensures Enter triggers search
                  className={`w-full pl-4 pr-10 py-2 rounded-l-lg border-0 outline-none transition-colors ${
                    theme
                      ? "bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500/20"
                      : "bg-gray-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-primary-500/20"
                  }`}
                />

                {search && (
                  <button
                    onClick={clearSearch}
                    className={`absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors
                      ${
                        theme
                          ? "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                          : "text-gray-500 hover:text-gray-300 hover:bg-gray-700"
                      }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                className={`px-4 py-2 rounded-r-lg transition-colors flex items-center
                  ${
                    theme
                      ? "bg-primary-500 text-white hover:bg-primary-600"
                      : "bg-primary-600 text-white hover:bg-primary-700"
                  }`}
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleTheme}
              className={`cursor-pointer p-2 rounded-full transition-colors ${
                theme
                  ? "hover:bg-gray-100 text-gray-800"
                  : "hover:bg-gray-800 text-gray-200"
              }`}
              type="button"
              aria-label="Toggle theme"
            >
              {theme ? (
                <FaMoon className="w-5 h-5" />
              ) : (
                <IoSunnyOutline className="w-6 h-6" />
              )}
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                className={`cursor-pointer p-2 rounded-full transition-colors ${
                  theme
                    ? "hover:bg-gray-100 text-gray-800"
                    : "hover:bg-gray-800 text-gray-200"
                }`}
                onClick={toggleDropdown}
              >
                <img
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                />
              </button>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 p-4 shadow-lg rounded-xl border text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #0D0F1A, #1A1F38, #101828)",
                    borderColor: theme ? "#2D3A5F" : "#1A1F38",
                  }}
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <>
                      <p className="text-lg font-semibold mb-2">{username}</p>
                      <button
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100/10"
                        onClick={() => navigate("/profile")}
                      >
                        View Profile
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100/10 mt-2"
                        onClick={() => navigate("/settings")}
                      >
                        Settings
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-100/10 text-red-400 mt-2"
                        onClick={onClickLogout}
                      >
                        Logout
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
