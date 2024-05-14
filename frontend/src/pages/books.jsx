import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllBooks } from "../features/Books";
import BooksGrid from "../components/booksGrid";

export default function Books() {
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
      <Header />
      <BooksGrid books={books} />
    </div>
  );
}
