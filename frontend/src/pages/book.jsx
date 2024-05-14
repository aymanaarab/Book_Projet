import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedBook } from "../features/Books";
import axios from "axios";
import { Header } from "../components/header";

export default function Book() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token) || null;
  const userID = useSelector((state) => state.auth.userId) || null;
  const book = useSelector((state) => state.books.selectedBook);

  const [loaned, setLoaned] = useState(false);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    async function getBook() {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(
        `http://127.0.0.1:3000/api/${id}`,
        config
      );
      return response.data.data;
    }

    getBook().then((data) => dispatch(setSelectedBook(data)));
  }, []);

  const add = async () => {
    let loan = { client: userID, book: id };
    console.log(loan);
    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    await axios.post(
      `http://127.0.0.1:3002/api/add-loan`,
      JSON.stringify(loan),
      config
    );

    setLoaned(true);
  };

  const returnBook = async () => {
    let loan = { client: userID, book: id };
    console.log(loan);
    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    await axios.post(
      `http://127.0.0.1:3002/api/return-book`,
      JSON.stringify(loan),
      config
    );

    setLoaned(false);
  };

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
      console.log(response.data.data);
      return response.data.data;
    }
    getLoans().then((data) => setLoans(data));
  }, []);

  useEffect(() => {
    loans.filter(
      (loan) =>
        loan.book == id && loan.client == userID && loan.dateRetour == null
    ).length > 0
      ? setLoaned(true)
      : setLoaned(false);
  }, [loans, id]);

  return (
    <div className="flex flex-col max-h-screen">
      <Header />
      <div
        className="flex flex-auto
      "
      >
        <div className="w-96 p-2 h-auto flex items-center justify-center  bg-gray-200">
          <img
            src={book.image}
            alt=""
            className="max-h-full max-w-full object-cover"
          />
        </div>
        <div className="flex flex-col p-4">
          <h1 className="text-3xl font-bold mb-4">{book.titre}</h1>
          <p className="text-gray-700 mb-4">{book.description}</p>
          {!loaned ? (
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              onClick={add}
            >
              Add to Library
            </button>
          ) : (
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              onClick={returnBook}
            >
              return book
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
