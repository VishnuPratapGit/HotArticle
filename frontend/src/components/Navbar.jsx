import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/", status: true },
    { name: "Login", path: "/login", status: true },
    { name: "Signup", path: "/signup", status: true },
  ];

  return (
    <div className="mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold">LOGO</span>
        </div>

        <div className="flex gap-15">
          {navLinks.map(
            (link) =>
              link.status && (
                <Link
                  key={link.name}
                  to={link.path}
                  className="hover:text-rose-500 transition-colors duration-300 font-medium"
                >
                  {link.name}
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
