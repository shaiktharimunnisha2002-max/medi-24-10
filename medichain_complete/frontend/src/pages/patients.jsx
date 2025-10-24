import React, { useEffect, useState } from "react";
import axios from "axios";

function Patients() {
  const [patients, setPatients] = useState([]); // state to store patients
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);     // error state

  // ✅ This is where the useEffect goes
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/patients");
        setPatients(res.data);
      } catch (err) {
        console.error("Failed to fetch patients data:", err);
        setError("Failed to fetch patients data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []); // runs once on component mount

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Patients List</h1>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient._id}>
              {patient.name} - {patient.doctor} - {patient.appointmentTime}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Patients;
