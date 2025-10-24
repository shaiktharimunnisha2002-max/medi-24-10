// src/pages/Doctors.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/listofdoctors"); // go to list of doctors page
  };

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-2xl font-bold mb-6">Our Specialists</h1>
      <button
        onClick={handleBookAppointment}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default Doctors;
