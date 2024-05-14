import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./features/User.js";
import bookReducer from "./features/Books.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
