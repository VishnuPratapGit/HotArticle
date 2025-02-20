import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import databaseServices from "../services/DatabaseServices.js";
import { logout } from "../redux/authSlice.js";

const Navbar = () => {
  const status = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogout = () => {
    databaseServices.logout().then((isLogout) => {
      if (isLogout) {
        dispatch(logout());
        navigate("/login");
      }
    });
  };

  const navLinks = [
    { name: "Home", path: "/", status },
    { name: "Login", path: "/login", status: !status },
    { name: "Signup", path: "/signup", status: !status },
  ];

  return (
    <div className="mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold">LOGO</span>
        </div>

        <div className="flex items-center gap-15">
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
          {status && <Button onClick={userLogout} heading="Logout" />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
