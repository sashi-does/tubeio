import { useContext } from 'react';
import { FaMoon } from 'react-icons/fa';
import { IoSunnyOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Constants from '../context/Context';

const Navbar = () => {
  const { onToggleTheme, theme } = useContext(Constants);
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove('jwtToken');
    navigate('/login', { replace: true });
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
            <button 
              className={`p-2 rounded-full transition-colors ${
                theme 
                  ? 'hover:bg-gray-100 text-gray-800' 
                  : 'hover:bg-gray-800 text-gray-200'
              }`}
            >
              <img
                alt="profile"
                className="w-8 h-8 rounded-full"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              />
            </button>
            <button
              onClick={onClickLogout}
              type="button"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${theme 
                  ? 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50' 
                  : 'bg-transparent text-blue-400 border border-blue-400 hover:bg-blue-900/20'
                }`}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;