import { useState, useRef, useContext, useEffect } from 'react';
import { FaMoon } from 'react-icons/fa';
import { IoSunnyOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Constants from '../context/Context';
import { motion } from 'framer-motion';
import axios from 'axios';

const Navbar = () => {
  const { onToggleTheme, theme } = useContext(Constants);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true); 
  const url = import.meta.env.VITE_TUBEIO_USER_API + '/username';

  const getUsername = async () => {
    try {
      const response = await axios.get(url, {
        headers: { authorization: `Bearer ${Cookies.get('jwtToken')}` },
      });
      console.log(response.data.username); // Debug the API response
      setUsername(response.data.username || 'Guest'); // Fallback to 'Guest' if username is missing
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUsername('Guest'); // Fallback to 'Guest' on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };
  }, []);

  const onClickLogout = () => {
    Cookies.remove('jwtToken');
    navigate('/', { replace: true });
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
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200
      ${theme ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-800'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img
              alt="website logo"
              className={theme ? "h-9 w-auto" : "h-8 w-auto"}
              src={
                theme
                  ? 'https://res.cloudinary.com/dvukdxs2m/image/upload/v1739785925/Screenshot_2025-02-17_at_3.21.55_PM_v6j3m8.png'
                  : 'https://res.cloudinary.com/dvukdxs2m/image/upload/v1739785683/tubeio-dark_huj4uc.png'
              }
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleTheme}
              className={`cursor-pointer p-2 rounded-full transition-colors ${
                theme 
                  ? 'hover:bg-gray-100 text-gray-800' 
                  : 'hover:bg-gray-800 text-gray-200'
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
                className={`p-2 rounded-full transition-colors ${
                  theme 
                    ? 'hover:bg-gray-100 text-gray-800' 
                    : 'hover:bg-gray-800 text-gray-200'
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
                    background: 'linear-gradient(135deg, #0D0F1A, #1A1F38, #101828)',
                    borderColor: theme ? '#2D3A5F' : '#1A1F38',
                  }}
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <>
                      <p className="text-lg font-semibold mb-2">{username}</p>
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100/10" onClick={() => navigate('/profile')}>View Profile</button>
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100/10 mt-2" onClick={() => navigate('/settings')}>Settings</button>
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-100/10 text-red-400 mt-2" onClick={onClickLogout}>Logout</button>
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