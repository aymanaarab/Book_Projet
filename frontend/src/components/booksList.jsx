import React from "react";

export default function BooksList({ books }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <ul className="divide-y divide-gray-300">
        {books.map((book) => (
          <li key={book._id} className="py-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{book.titre}</span>
              <span className="font-semibold">{book.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
