import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "./index.js";

const LoginForm = ({}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeInputs = (e) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted:", formData);

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
