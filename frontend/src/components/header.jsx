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
    <header className="bg-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="text-2xl uppercase text-indigo-500 font-medium">
        Librarify
      </div>
      <ul className="flex gap-6">
        <li className="hover:underline">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:underline">
          <Link to="/books">Books</Link>
        </li>
        <li className="hover:underline">
          <Link to="/mylibrary">Your Library</Link>
        </li>
      </ul>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        onClick={Logout}
      >
        Logout
      </button>
    </header>
  );
};
