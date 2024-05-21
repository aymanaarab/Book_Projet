import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllBooks } from "../features/Books";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Loansa() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token) || null;
  const books = useSelector((state) => state.books.allbooks) || [];

  const [loans, setloans] = useState([]);
  useEffect(() => {
    async function getLoans() {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get("http://127.0.0.1:3002/api/", config);
      setloans(response.data.data);
    }

    getLoans();
  }, []);
  console.log(loans)
  return (
    <div>
      <div>
        <button className="p-2 bg-blue-400 rounded mr-auto">
          <NavLink to={"add-book"}>+</NavLink>
        </button>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tr>
          <th>bookId</th>
          <th>clientId</th>
          <th>dateretour</th>
          <th>dateEmprunt</th>
          <th>actions</th>
        </tr>
        <tbody>
          {loans.map((b, i) => (
            <tr key={b._id} className="p-10">
              <td>{b.book}</td>
              <td>{b.client}</td>
              <td>{b.dateRetour}</td>
              <td>{b.dateEmprunt}</td>
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
