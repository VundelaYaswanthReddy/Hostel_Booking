import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./login.css";
import { API_URL } from "../../key";
import loginImg from "../../assets/loginImg.jpeg";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const [singup, setSignup] = useState(false);
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.name);
    console.log(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(`${API_URL}/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOgin_FAILURE", payload: err.response.data });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/register`, credentials);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={loginImg}
          alt=""
        />
      </div>
      <div className="bg-gray-800 flex flex-col justify-center">
        <form
          action=""
          className="max-w-[400px] w-full  mx-auto bg-gray-900 p-8 px-8 rounded-lg"
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            {singup ? "Sing Up " : "Sing In"}
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="">Username</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outlined-none"
              type="text"
              onChange={handleChange}
              placeholder="username"
              name="username"
            />
          </div>
          {singup && (
            <div className="flex flex-col text-gray-400 py-2">
              <label htmlFor="">Email</label>
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outlined-none"
                type="email"
                onChange={handleChange}
                name="email"
                placeholder="email"
              />
            </div>
          )}
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="">Password</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outlined-none"
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="password"
            />
          </div>
          {!singup && (
            <>
              (
              <div className="flex justify-between text-gray-400 py-2">
                <p>
                  <input type="checkbox" />
                  Remember Me
                </p>
                <p>Forgot Password</p>
              </div>
              )
              <button
                className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 rounded-lg hover:shadow-teal-500/20 text-white font-bold"
                onClick={handleLogin}
              >
                Sign In
              </button>
              <div onClick={() =>setSignup(true)}>
                <p className="text-white text-center font-light cursor-pointer">
                  Don't have an account{" "}
                  <span className="cursor-pointer underline decoration-2 font-bold">
                    Sign Up
                  </span>
                </p>
              </div>
            </>
          )}
          {console.log("Sign up", singup)}
          {singup && (
            <>
              <button
                className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 rounded-lg hover:shadow-teal-500/20 text-white font-bold"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
              <div
                className="text-white text-center font-light cursor-pointer"
                onClick={() => setSignup(false)}
              >
                Back to Sign In
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
