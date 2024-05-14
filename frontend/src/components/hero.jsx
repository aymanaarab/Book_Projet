import React from "react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="hero flex items-center justify-center h-screen bg-gray-100 flex-auto">
      <div className="text-center">
        <h1 className="font-medium text-5xl text-gray-950 uppercase mb-6">
          Welcome to <span className="text-indigo-600">Librarify</span>
        </h1>
        <p className="text-lg text-gray-800 font-medium mb-8">
          Explore our vast collection of books and resources.
        </p>
        <Link
          to="/books"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
        >
          Discover Books
        </Link>
      </div>
    </div>
  );
};
