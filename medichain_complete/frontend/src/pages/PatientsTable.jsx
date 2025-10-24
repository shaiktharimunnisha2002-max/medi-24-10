import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientsTable = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/patients')
            .then(res => setPatients(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Patients List</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Doctor</th>
                        <th>Appointment Time</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(p => (
                        <tr key={p._id}>
                            <td>{p.name}</td>
                            <td>{p.doctor}</td>
                            <td>{new Date(p.appointmentTime).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientsTable;
