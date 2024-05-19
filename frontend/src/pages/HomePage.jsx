import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch } from "react-redux";
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
// const [langue , setchanglangue] = useState('ar')
 

  return (
    <main className={styles.homepage}>
<PageNav logout={Logout}/>
      <section>
        <div data-aos="zoom-in" data-aos-duration="2000">
          <h1>
           
              <>
                <span>Find your preferred Books just by one click.</span>
                <br />
                <span>With Booki</span>
              </>
            
          </h1>
          <h2>
            
              <>
                <span>
                  A site that provides you with more than 1,000,000 Books and
                  gives you the ability to Loan them  ☘
                </span>
              </>
          </h2>
          <NavLink to="books" className={styles.cta}>
            Start Now !!
          </NavLink>
        </div>
      </section>
    </main>
  );
}

function PageNav({logout}) {
  return (
    <nav className={styles.nav}>
      <Logo  />
      <ul>
      
        <li>
        
        <button
        className="bg-indigo-400 text-white px-4 py-4 w-60 rounded-md text-pretty font-extrabold"
        onClick={logout}
      >
        Login
      </button>
        </li>
      </ul>
    </nav>
  );
}

function Logo() {
  return (
    <a href="/">
      <h3 className="text-3xl font-semibold tracking-widest font-mono">
        📘  Booki
      </h3>
    </a>
  );
}
