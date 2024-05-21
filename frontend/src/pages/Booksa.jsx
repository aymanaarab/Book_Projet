import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllBooks } from "../features/Books";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export default function Booksa() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token) || null;
  const books = useSelector((state) => state.books.allbooks) || [];

  useEffect(() => {
    async function getBooks() {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get("http://127.0.0.1:3000/api/", config);
      return response.data.data;
    }

    getBooks().then((data) => dispatch(setAllBooks(data)));
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button className="p-2 bg-blue-400 rounded">
          <NavLink to={"add-book"} className="text-white font-bold">
            +
          </NavLink>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((b, i) => (
              <tr
                key={b._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{i + 1}</td>
                <td className="px-6 py-4">{b.titre}</td>
                <td className="px-6 py-4">
                  <img
                    src={b.image}
                    alt="Book"
                    className="h-10 w-12 object-cover"
                  />
                </td>
                <td className="px-6 py-4">
                  <NavLink
                    to={"edit"}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </NavLink>
                  <NavLink
                    to={"delete"}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
