// File: /src/pages/Login.js

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/User";
import "./Login.css"; // Import the CSS file for styling

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.status);
  const loginError = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  useEffect(() => {
    if (token && isAdmin) {
      navigate("/admin");
    } else if (token && !isAdmin) {
      navigate("/");
    }
  }, [token, isAdmin, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">
          Please sign in to your account
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <div className="form-remember">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="form-checkbox"
            />
            <label htmlFor="remember-me" className="form-label">
              Remember me
            </label>
            <a href="#" className="form-link">
              Forgot your password?
            </a>
          </div>
          <button type="submit" className="form-button">
            Sign in
          </button>
        </form>
        <p className="login-footer">
          Don't have an account?{" "}
          <Link to={"/sign-in"} className="login-link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
