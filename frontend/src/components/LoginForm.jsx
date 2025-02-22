import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "./index.js";
import databaseServices from "../services/DatabaseServices.js";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/authSlice.js";

const LoginForm = ({}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const changeInputs = (e) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isLogin = await databaseServices.login(formData);

    if (!isLogin) {
      alert("login failed");
      return;
    }

    const loggedUser = await databaseServices.getCurrentUser();

    if (loggedUser) {
      dispatch(login(loggedUser));
    } else {
      dispatch(logout());
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="rounded-lg border border-neutral-700 transition-colors duration-300 hover:border-neutral-500 p-8 max-w-md w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <Input
          type="email"
          name="email"
          value={formData.email}
          changeInputs={changeInputs}
          placeholder="email"
          required
        />

        <Input
          type="password"
          name="password"
          value={formData.password}
          changeInputs={changeInputs}
          placeholder="password"
          required
        />

        <Button />

        <div className="text-center text-sm mt-4">
          Don't have a account ?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
