import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllBooks } from "../features/Books";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { Button, Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";


export default function Booksa() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token) || null;
  const books = useSelector((state) => state.books.allbooks) || [];
  const confirm = (e) => {
    message.success("تمت الحدف بنجاح");
  };

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

  async function deleteBook(id) {
    const config = {
      headers: {
        Authorization: token,
      },
    };
  
    try {
      await axios.delete(`http://127.0.0.1:3000/api/delete-book/${id}`, config);
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
    
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button className="p-2 bg-blue-400 rounded">
          <NavLink to={"/admin/add-book"} className="text-white font-bold">
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
                    to={`/admin/edit-book/${b._id}`}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </NavLink>

                  <Popconfirm
                    title="delete "
                    description="are you sure?"
                    cancelText="cancel"
                    okText="delete"
                    onConfirm={() => deleteBook(b?._id)}
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
