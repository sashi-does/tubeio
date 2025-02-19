import React from 'react'; 
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChangeCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onClickSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    };
    
    const response = await fetch(url, options);
    const jsonData = await response.json();

    if (jsonData.jwt_token) {
      Cookies.set('jwtToken', jsonData.jwt_token, { expires: 3 });
      navigate('/');
    } else {
      setShowErrMsg(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white shadow-lg p-8 rounded-md w-96">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="w-44 mx-auto mb-6"
        />
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">USERNAME</label>
            <input
              name="username"
              value={credentials.username}
              onChange={onChangeCredentials}
              className="border border-gray-300 rounded-md w-full p-2 mt-1 outline-none"
              type="text"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">PASSWORD</label>
            <input
              name="password"
              value={credentials.password}
              onChange={onChangeCredentials}
              className="border border-gray-300 rounded-md w-full p-2 mt-1 outline-none"
              type={showPassword ? "text" : "password"}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="showPassword"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            />
            <label htmlFor="showPassword" className="text-gray-600">Show Password</label>
          </div>
        </div>
        <button
          onClick={onClickSubmit}
          className="bg-blue-500 text-white w-full p-3 rounded-md mt-6 font-semibold hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
        {showErrMsg && (
          <p className="text-red-500 text-sm mt-2 text-center">
            *Username and Password didn't match
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
