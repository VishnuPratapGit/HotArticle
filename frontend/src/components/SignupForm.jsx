import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "./index.js";
import MultiCategorySelector from "./MultiCategorySelector.jsx";
import databaseServices from "../services/DatabaseServices.js";
import { login, logout } from "../redux/authSlice.js";
import { useDispatch } from "react-redux";

const SignupForm = ({}) => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeInputs = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const nextStep = () => {
    if (!formData.name || !formData.email || !formData.password) return;
    if (step === 2) return;
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalUserData = { ...formData, categories: selectedCategory };

    const isSignup = await databaseServices.signup(finalUserData);
    if (!isSignup) {
      alert("Registration failed!");
      setLoading(false);
      return;
    }

    alert("Registration Successful, Login Initiated");

    const { email, password } = formData;

    const isLogin = await databaseServices.login({ email, password });
    if (!isLogin) {
      alert("Login failed, Redirecting to login page.");
      return navigate("/login");
    }

    const loggedUser = await databaseServices.getCurrentUser();

    if (loggedUser) {
      dispatch(login(loggedUser));
    } else {
      dispatch(logout());
    }

    setLoading(false);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="rounded-lg border border-neutral-700 transition-colors duration-300 hover:border-neutral-500 p-8 max-w-md w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold text-center">Signup</h1>

            <Input
              type="text"
              name="name"
              value={formData.name}
              changeInputs={changeInputs}
              placeholder="name"
            />

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

            <Button nextStep={nextStep} />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="sm:text-2xl text-center font-semibold mb-4">
              {loading ? "Please Wait" : "Select Categories"}
            </h2>

            <MultiCategorySelector
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <Button
              heading="Submit"
              type="submit"
              disabled={selectedCategory.length === 0}
            />
          </>
        )}

        <div className="text-center text-sm mt-4">
          Already have a account ?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
