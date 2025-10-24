// src/pages/ListOfDoctors.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorData } from "../assets/doctorData"; // ✅ static data

const ListOfDoctors = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState(""); // ✅ track active filter
  const navigate = useNavigate();

  const specializations = [
    "Dermatologist",
    "Orthopedic Surgeon",
    "Cardiologist",
    "Pediatrician",
    "Neurologist",
    "Gynecologist",
    "ENT Specialist",
    "Psychiatrist",
    "General Surgeon",
    "Ophthalmologist",
  ];

  // ✅ Apply filter
  const applyFilter = () => {
    if (activeSpecialty) {
      setFilterDoc(doctorData.filter((doc) => doc.specialty === activeSpecialty));
    } else {
      setFilterDoc(doctorData);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [activeSpecialty]);

  // ✅ Search filter
  const filteredDoctors = filterDoc.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <aside className="w-64 hidden sm:block border-r border-gray-200 pr-4">
        <h2 className="text-lg font-semibold mb-4">Specializations</h2>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setActiveSpecialty("")}
            className={`text-left px-3 py-2 rounded-md border transition ${
              activeSpecialty === ""
                ? "bg-blue-100 text-blue-700 border-blue-300"
                : "hover:bg-gray-100 border-gray-200"
            }`}
          >
            All Doctors
          </button>

          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() =>
                setActiveSpecialty(activeSpecialty === spec ? "" : spec)
              }
              className={`text-left px-3 py-2 rounded-md border transition ${
                activeSpecialty === spec
                  ? "bg-blue-100 text-blue-700 border-blue-300"
                  : "hover:bg-gray-100 border-gray-200"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <p className="text-gray-600 mb-4">Browse through our doctors.</p>

        {/* Search bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by doctor name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Doctor cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-md transition"
              >
                <img
                  className="bg-[#EAEFFF] w-full h-40 object-cover"
                  src={item.image}
                  alt={item.name}
                />
                <div className="p-4">
                  <p className="text-lg font-semibold text-gray-800 mt-2">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-600">{item.specialty}</p>
                  <p className="text-xs text-gray-500">{item.qualification}</p>

                  {/* ✅ Book Appointment */}
                  <button
                    onClick={() =>
                      navigate(
                        `/appointment?doctor=${encodeURIComponent(
                          item.name
                        )}&specialty=${encodeURIComponent(item.specialty)}`
                      )
                    }
                    className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListOfDoctors;
