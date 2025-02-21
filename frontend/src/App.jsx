import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components";
import databaseServices from "./services/DatabaseServices";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/authSlice";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    databaseServices
      .getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setloading(false));
  }, []);

  if (loading)
    return (
      <div className="h-svh flex justify-center items-center">
        <h1 className="text-3xl font-semibold">Loading...</h1>
      </div>
    );

  return (
    <div className="flex flex-col min-h-full">
      <nav className="sticky w-full top-0 z-50 border-b border-neutral-700 backdrop-blur-lg">
        <Navbar />
      </nav>
      <div className="min-h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
