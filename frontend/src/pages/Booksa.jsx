import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllBooks } from "../features/Books";
import BooksGrid from "../components/booksGrid";
import { NavLink, Navigate } from "react-router-dom";

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
    <div>
        <div>

          <button className='p-2 bg-blue-400 rounded mr-auto' ><NavLink to={"add-book"}>+</NavLink></button>
        </div>


<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <tr>

    
<th>id</th>
<th>name</th>
<th>image</th>
<th>actions</th>
</tr>
<tbody>
        {books.map((b,i) => (
          <tr key={b._id} className="p-10">
            <td>{i+1}</td>
            <td>{b.titre}</td>
            <td>
              <img src={b.image} alt="" style={{
                 height: "40px",
                 width: "50px"
              }} />
            </td>
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
