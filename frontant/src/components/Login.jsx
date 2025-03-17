import React, { useContext, useState } from "react";
import { StoreContext } from "../Context/Context";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Login = ({ setLoginpop }) => {
  const url = "https://clothing-a7pp.onrender.com";
  const navigate = useNavigate();
  const { token, setToken } = useContext(StoreContext);
  const [curr, setcurr] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlerchang = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const isLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${url}/api/user/loginUser`, data);
    

    if (response.data) {
      Swal.fire({
        title: "Success",
        text: "Login successful",
        icon: "success",
      });
      const decodedToken = jwtDecode(response.data.token);
      localStorage.setItem("token", response.data.token);
      setToken(decodedToken);
      console.log(decodedToken);
      localStorage.setItem("userId", decodedToken.userId);
      
      setLoginpop(false);
      if (response.data.user.email === 'admin@gmail.com' && response.data.user.password === '123456789') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Login failed",
        icon: "error",
      });
    }

    

    setData({
      email: "",
      password: "",
    });
  };

  const isRegister = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${url}/api/user/registerUser`, data);
    setData({
      name: "",
      email: "",
      password: "",
    });
    
    if (response.data) {
      Swal.fire({
        title: "Success",
        text: "Register successful",
        icon: "success",
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        setToken(decodedToken);
      }
      setLoginpop(false);
    } else {
      Swal.fire({
        title: "Error",
        text: "Register failed",
        icon: "error",
      });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${url}/api/user/google-login`, {
        token: credentialResponse.credential,
      });

      if (response.data.success) {
        setToken(response.data.id);
        localStorage.setItem("token", response.data.id);
        setLoginpop(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Google Login Failed", error);
      alert("Google Login Failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setLoginpop(false)}
      ></div>
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all z-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{curr}</h2>
          <button 
            onClick={() => setLoginpop(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={curr === "Login" ? isLogin : isRegister} className="space-y-6">
          {curr !== "Login" && (
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                onChange={handlerchang}
                value={data.name}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              onChange={handlerchang}
              value={data.email}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                onChange={handlerchang}
                value={data.password}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                name="password"
                type={showPassword ? "text" : "password"} 
                minLength={4}
                maxLength={10}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input 
              type="checkbox" 
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              I agree to the Terms and Conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
          >
            {curr === "Sing Up" ? "Create Account" : "Login"}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSuccess}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition duration-200 transform hover:scale-105"
          >
            <FaGoogle className="text-red-500" />
            <span>Sign in with Google</span>
          </button>

          <div className="text-center text-sm">
            {curr === "Login" ? (
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setcurr("Sing Up")}
                  className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setcurr("Login")}
                  className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
