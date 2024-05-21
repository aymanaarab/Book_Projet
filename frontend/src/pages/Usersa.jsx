import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllBooks } from "../features/Books";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Usersa() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token) || null;
  //   const books = useSelector((state) => state.books.allbooks) || [];
  const [users, setsusers] = useState([]);
  useEffect(() => {
    async function getClients() {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get("http://127.0.0.1:3001/api/", config);
      setsusers(response.data.data);
    }

    getClients();
  }, []);

  //   useEffect(() => {
  //     console.log(books);
  //   }, [books]);

  return (
    <div>
      <div>
        <button className="p-2 bg-blue-400 rounded mr-auto">
          <NavLink to={"add-book"}>+</NavLink>
        </button>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tr>
          <th>id</th>
          <th>name</th>
          <th>lastname</th>
          <th>email</th>
          <th>actions</th>
        </tr>
        <tbody>
          {users.map((b, i) => (
            <tr key={b._id} className="p-10">
              <td>{i + 1}</td>
              <td>{b.nom}</td>
              <td>{b.prénom}</td>
              <td>{b.email}</td>
              <td>
                <NavLink to={"edit"}>edit </NavLink>
                <NavLink to={"delete"}> delete</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
