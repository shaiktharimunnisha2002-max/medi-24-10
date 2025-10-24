import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import ListOfDoctors from "./pages/Listofdoctors";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Login from "./pages/Login";
import Patients from "./pages/patients"; // ✅ Patients page

// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          {/* Home & Info */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Doctors flow */}
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/listofdoctors" element={<ListOfDoctors />} />
          <Route path="/listofdoctors/:speciality" element={<ListOfDoctors />} />

          {/* Appointment flow */}
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/appointment/:id" element={<Appointment />} />

          {/* User pages */}
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/login" element={<Login />} />

          {/* Patients page */}
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
