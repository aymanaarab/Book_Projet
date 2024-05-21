import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/User";

export default function Homepage() {
  useEffect(() => {
    AOS.init();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <main className="h-[calc(100vh-5rem)] m-10 bg-cover bg-center bg-[linear-gradient(rgba(36,42,46,0.8),rgba(36,42,46,0.8)),url('https://media.istockphoto.com/id/1175314487/photo/old-books-on-blue-background.webp?b=1&s=170667a&w=0&k=20&c=3FCcY3U07p6UPwKG1NymtHzdld9tygOhdGYJx1RbcKM=')] p-10 text-white">
      <PageNav logout={Logout} />
      <section className="flex flex-col h-[85%] items-center justify-center gap-10 text-center">
        <div data-aos="zoom-in" data-aos-duration="2000">
          <h1 className="text-4xl md:text-6xl leading-tight mb-3">
            <span>Find your preferred Books just by one click.</span>
            <br />
            <span>With Booki</span>
          </h1>
         
          <h2 className="w-11/12 text-lg md:text-2xl text-light-1 mb-10">
            A site that provides you with more than 1,000,000 Books and gives you the ability to Loan them ☘
          </h2>
          <NavLink to="books" className="inline-block bg-blue-500 text-dark-0 uppercase text-decoration-none text-lg font-semibold py-4 px-12 rounded-md">
            Start Now !!
          </NavLink>
        </div>
      </section>
    </main>
  );
}

function PageNav({ logout }) {
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <nav className="flex items-center justify-between">
      <Logo />
      <ul className="list-none flex items-center gap-16">
        <li>
          {token && !isAdmin ? (
            <button
              className="bg-indigo-400 text-white px-4 py-2 rounded-md font-extrabold"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-indigo-400 text-white px-4 py-2 rounded-md font-extrabold"
              onClick={logout}
            >
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

function Logo() {
  return (
    <a href="/">
      <h3 className="text-3xl font-semibold tracking-widest font-mono">📘 Booki</h3>
    </a>
  );
}
