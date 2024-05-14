import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signin from "./pages/signin";
import Home from "./pages/home";
import Books from "./pages/books";
import Book from "./pages/book";
import Loans from "./pages/loans";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-in" element={<Signin />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/books/:id" element={<Book />}></Route>
          <Route path="/mylibrary" element={<Loans />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
