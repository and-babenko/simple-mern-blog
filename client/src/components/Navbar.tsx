import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { checkAuthSelector, logout } from "redux/features/auth/auth.slice";

export const Navbar = () => {
  const isAuth = useSelector(checkAuthSelector);
  const dispatch = useDispatch<AppDispatch>();

  const activeStyles = {
    color: "white",
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("You are logged out");
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm">
        E
      </span>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to="/"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Home page
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              My posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Add post
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center items-center bg-gray-500 text-xs text-white rounded-md hover:bg-gray-600 active:bg-gray-700 cursor-pointer">
        {isAuth ? (
          <button className="w-full h-full px-4 py-2" onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          <Link className="w-full h-full px-4 py-2" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
