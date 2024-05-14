import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Header } from "../components/header";
import BooksGrid from "../components/booksGrid";
import BooksList from "../components/booksList";

export default function Loans() {
  const [bookIDs, setIds] = useState([]);
  const [books, setBooks] = useState([]);
  const token = useSelector((state) => state.auth.token) || null;
  const userID = useSelector((state) => state.auth.userId) || null;

  useEffect(() => {
    async function getLoans() {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(
        `http://127.0.0.1:3002/api/loans/${userID}`,
        config
      );
      return response.data.data;
    }
    getLoans().then((data) => {
      let ids = data.map((loan) => {
        if (loan.dateRetour == null) {
          return loan.book;
        }
      });
      setIds(ids);
    });
  }, []);

  useEffect(() => {
    async function getBooks() {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(`http://127.0.0.1:3000/api/`, config);
      return response.data.data;
    }
    getBooks().then((data) => {
      let books = data.filter((book) => bookIDs.includes(book._id));
      console.log(bookIDs, books);
      setBooks(books);
    });
  }, [bookIDs]);
  return (
    <div>
      <Header />
      <BooksList books={books} />
    </div>
  );
}
