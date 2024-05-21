import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedBook } from "../features/Books";
import axios from "axios";
import { Header } from "../components/header";

import { Link } from "react-router-dom";

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
      <div className="flex flex-wrap justify-center p-6">
  <div className="w-full md:w-1/3 p-4 bg-gray-200 flex items-center justify-center">
    <img
      src={book?.image}
      alt={book?.titre}
      className="max-h-96 max-w-full object-cover"
    />
  </div>
  <div className="w-full md:w-2/3 p-4 flex flex-col">
    <h1 className="text-4xl font-bold mb-4">{book?.titre}</h1>
    <p className="text-gray-700 mb-6">{book?.description}</p>
    <div className="flex items-center mb-6">
      {!loaned ? (
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded mr-4"
          onClick={add}
        >
          Add to Library
        </button>
      ) : (
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded mr-4"
          onClick={returnBook}
        >
          Return Book
        </button>
      )}
    </div>
    <Link to="/books" className="text-indigo-500 font-bold underline">
      Return Back
    </Link>
  </div>
</div>
</div>

  );
}
