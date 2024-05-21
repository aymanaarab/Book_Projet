import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllBooks } from "../features/Books";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

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

  async function deleteLoan(id) {
    const config = {
      headers: {
        Authorization: token,
      },
    };
  
    try {
      await axios.delete(`http://127.0.0.1:3002/api/delete-loan/${id}`, config);
      // If the delete operation is successful, return a success message or any other relevant information
      return { message: 'Book deleted successfully' };
    } catch (error) {
      console.error('Error deleting book:', error);
      if (error.response && error.response.data && error.response.data.message) {
        // If the server provides an error message, throw that
        throw new Error(error.response.data.message);
      } else {
        // Otherwise, throw a generic error message
        throw new Error('An error occurred while deleting the book');
      }
      
    }
  }
  console.log(loans);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button className="p-2 bg-blue-400 rounded">
          <NavLink to="add-book" className="text-white font-bold">
            +
          </NavLink>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Book ID
              </th>
              <th scope="col" className="px-6 py-3">
                Client ID
              </th>
              <th scope="col" className="px-6 py-3">
                Return Date
              </th>
              <th scope="col" className="px-6 py-3">
                Loan Date
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loans.map((b, i) => (
              <tr
                key={b._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{b.book}</td>
                <td className="px-6 py-4">{b.client}</td>
                <td className="px-6 py-4">{b.dateRetour}</td>
                <td className="px-6 py-4">{b.dateEmprunt}</td>
                <td className="px-6 py-4">
                  <NavLink
                    to={`/admin/edit-loan/${b._id}`}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </NavLink>
                  <Popconfirm
                    title="delete "
                    description="are you sure?"
                    cancelText="cancel"
                    okText="delete"
                    onConfirm={() => deleteLoan(b?._id)}
                    okType="danger"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                  <button
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
