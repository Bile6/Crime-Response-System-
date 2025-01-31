// src/pages/OfficerRegistration.js
import React, { useState } from 'react';

function OfficerRegistration() {
  const [officers, setOfficers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddOfficer = () => {
    setOfficers([...officers, { id: officers.length + 1, name, email }]);
    setName('');
    setEmail('');
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Officer Registration</h1>
      
      <input 
        type="text" 
        placeholder="Name" 
        className="mb-4 p-2 border rounded w-full" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        className="mb-4 p-2 border rounded w-full" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button onClick={handleAddOfficer} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Officer
      </button>

      <h2 className="text-xl font-bold mt-6 mb-4">Officers List</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">ID</th>
            <th className="border-b p-2 text-left">Name</th>
            <th className="border-b p-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {officers.map((officer) => (
            <tr key={officer.id}>
              <td className="border-b p-2">{officer.id}</td>
              <td className="border-b p-2">{officer.name}</td>
              <td className="border-b p-2">{officer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OfficerRegistration;
