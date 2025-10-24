// src/pages/Appointment.jsx
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Appointment() {
  const [searchParams] = useSearchParams();
  const doctorName = searchParams.get("doctor");
  const specialty = searchParams.get("specialty");

  const [form, setForm] = useState({
    patientName: "",
    date: "",
    time: ""
  });

  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="p-6 border rounded shadow text-center">
        <h2 className="text-xl font-bold mb-4">Appointment Confirmed ✅</h2>
        <p>
          Appointment has been booked with <strong>{doctorName}</strong> (
          {specialty}) on <strong>{form.date}</strong> at <strong>{form.time}</strong>.
        </p>
        <p className="mt-2">Patient Name: {form.patientName}</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book Appointment</h1>
      {doctorName && (
        <p className="mb-4">
          Booking appointment with <strong>{doctorName}</strong> ({specialty})
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="patientName"
          placeholder="Enter your name"
          value={form.patientName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
}

export default Appointment;
