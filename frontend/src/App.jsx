import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components";

const App = () => {
  return (
    <div className="flex flex-col h-full">
      <nav className="sticky w-full top-0 z-50 border-b border-neutral-700">
        <Navbar />
      </nav>
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
