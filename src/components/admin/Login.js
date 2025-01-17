import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://smpn1tamansari-api.vercel.app/admin/login", credentials);
      const expirationTime = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("tokenExpiration", expirationTime);
      navigate("/admin-hero");
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl">
        {/* Left side: Image with overlay */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-200 items-center justify-center relative">
          <img
            alt="Background"
            className="object-cover w-full h-full"
            src="/assets/image/admin.png"
          />
        </div>

        {/* Right side: Form */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <form className="space-y-6">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img
                alt="Logo"
                className="w-20 h-20"
                src="/assets/image/logo.png"
              />
            </div>

            {/* Title */}
            <h2 className="text-3xl font-semibold text-center mb-6">Login Admin</h2>

            {/* Error message */}
            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-md">
                {error}
              </div>
            )}

            {/* Username input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Password input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Login button */}
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
