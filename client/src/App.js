import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import Register from "./pages/register/Register";
import Footer from "./components/footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Venue from "./pages/venue/Venue";
import City from "./pages/city/City";
import Book from "./pages/book/Book";
import MyBookings from "./pages/book/MyBookings";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/city" element={<City />} />
        <Route path="/book/:vid" element={<Book />} />
        <Route path="/bookings" element={<MyBookings />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
