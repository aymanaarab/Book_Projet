import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signin from "./pages/signin";
import Books from "./pages/books";
import Book from "./pages/book";
import Loans from "./pages/loans";
import Homepage from "./pages/HomePage";
import AdminDashboard from "./admin/AdminDashboard";
import Booksa from "./pages/Booksa";
import Loansa from "./pages/Loansa";
import Usersa from "./pages/Usersa";
import AddBook from "./pages/AddBook";
import AddUser from "./pages/AddUser";
import AddLoan from "./pages/AddLoan";
import EditBook from "./pages/EditBook";
import EditUser from "./pages/EditUser";
import EditLoan from "./pages/EditLoan";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />}></Route> */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="booksa" element={<Booksa />} />
            <Route path="loansa" element={<Loansa />} />
            <Route path="usersa" element={<Usersa />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="add-loan" element={<AddLoan />} />
            <Route path="edit-book/:id" element={<EditBook />} />
            <Route path="edit-user/:id" element={<EditUser />} />
            <Route path="edit-loan/:id" element={<EditLoan />} />

          </Route>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<Book />} />
          <Route path="/mylibrary" element={<Loans />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
