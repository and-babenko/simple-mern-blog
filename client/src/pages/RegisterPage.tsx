import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  authSelector,
  checkAuthSelector,
  registerUser,
} from "redux/features/auth/auth.slice";

export const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector(authSelector);
  const isAuth = useSelector(checkAuthSelector);

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) navigate("/");
  }, [isAuth, navigate, status]);

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ userName, password }));
      setUserName("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={(evt) => evt.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40 flex flex-col gap-4"
    >
      <h1 className="text-lg text-white text-center">Registration</h1>
      <label className="text-xs text-gray-400 hover:cursor-pointer">
        UserName:
        <input
          type="text"
          value={userName}
          onChange={(evt) => setUserName(evt.target.value)}
          placeholder="Name"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1.5 px-3 text-xs outline-none placeholder:text-gray-700"
          name=""
          id="UserName"
        />
      </label>

      <label className="text-xs text-gray-400 hover:cursor-pointer">
        Password:
        <input
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1.5 px-3 text-xs outline-none placeholder:text-gray-700"
          name=""
          id="UserPassword"
        />
      </label>

      <div className="flex gap-8 justify-center">
        <button
          className="flex justify-center items-center text-xs text-white rounded-md py-2 px-4 bg-gray-500 hover:bg-gray-600 active:bg-gray-700"
          type="submit"
          onClick={handleSubmit}
        >
          Confirm
        </button>
        <Link
          to="/login"
          className="flex justify-center items-center text-xs text-white rounded-md py-2 px-4 bg-gray-500 hover:bg-gray-600 active:bg-gray-700"
          type="submit"
        >
          Already registered?
        </Link>
      </div>
    </form>
  );
};
