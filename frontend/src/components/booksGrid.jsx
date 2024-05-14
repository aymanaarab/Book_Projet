import React from "react";
import { Link } from "react-router-dom";

export default function BooksGrid({ books }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-5 max-w-7xl mx-auto text-center">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between"
        >
          <div className=" w-full h-96">
            <img
              src={book.image}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-medium mb-2 text-indigo-500">
              {book.titre}
            </h2>
            <p className="text-gray-600">{book.description}</p>
          </div>
          <Link to={`/books/${book._id}`}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4  w-full ">
              more info
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
