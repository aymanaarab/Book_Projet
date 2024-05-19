import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signin from "./pages/signin";
import Home from "./pages/home";
import Books from "./pages/books";
import Book from "./pages/book";
import Loans from "./pages/loans";
import Homepage from "./pages/HomePage";
import AdminDashboard from "./admin/AdminDashboard";
import Booksa from "./pages/Booksa";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />}></Route> */}
          <Route path="/admin" element={<AdminDashboard />}>
          <Route path="booksa" element={<Booksa />}>

          </Route>

          </Route>
          <Route path="/" element={<Homepage />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/sign-in" element={<Signin />}/>
          <Route path="/books" element={<Books />}/>
          <Route path="/books/:id" element={<Book />}/>
          <Route path="/mylibrary" element={<Loans />}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
