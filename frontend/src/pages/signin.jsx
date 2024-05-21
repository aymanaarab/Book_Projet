// File: /src/pages/Signin.js

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/User";
import "./Login.css"; // Import the CSS file for styling

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const [formData, setFormData] = useState({
    nom: "",
    prénom: "",
    email: "",
    password: "",
  });

  const { nom, prénom, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Create an account</h2>
        <p className="login-subtitle">
          Already have an account?{" "}
          <Link to={"/login"} className="login-link">
            Sign in
          </Link>
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nom" className="form-label">
              Nom
            </label>
            <input
              id="nom"
              name="nom"
              type="text"
              autoComplete="name"
              required
              className="form-input"
              placeholder="Nom"
              value={nom}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="prénom" className="form-label">
              Prénom
            </label>
            <input
              id="prénom"
              name="prénom"
              type="text"
              autoComplete="name"
              required
              className="form-input"
              placeholder="Prénom"
              value={prénom}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email-address" className="form-label">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-input"
              placeholder="Email address"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="form-button">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
