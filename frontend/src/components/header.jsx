import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/User";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <header className="bg-white py-11 px-11 flex justify-between items-center shadow-md">
      <div className="text-2xl uppercase text-indigo-500 font-medium">
      <Link to={"/"}>

       📘 Booki
      </Link>
      </div>
      <ul className="flex gap-6 text-black text-2xl">
    
        <li className="hover:underline  text-black">
          <Link to="/books">Books</Link>
        </li>
        <li className="hover:underline  text-black">
          <Link to="/mylibrary">Your loans</Link>
        </li>
      </ul>
      <button
        className="bg-indigo-600 text-white px-4 py-4 rounded-md"
        onClick={Logout}
      >
        Logout
      </button>
    </header>
  );
};
