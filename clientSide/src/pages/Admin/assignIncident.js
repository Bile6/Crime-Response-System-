// src/pages/AssignIncident.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function AssignIncident() {
  const { id } = useParams();
  const [assignedOfficer, setAssignedOfficer] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleAssign = () => {
    // Logic to assign the incident to an officer with priority goes here
    console.log('Assigned Officer:', assignedOfficer);
    console.log('Priority:', priority);
    console.log('Incident ID:', id);
    alert(`Incident ${id} assigned to ${assignedOfficer} with ${priority} priority.`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Assign Incident to Officer</h1>
      <p className="mb-4">Assigning Incident ID: {id}</p>
      
      <label className="block mb-2">Assign Officer</label>
      <input 
        type="text" 
        placeholder="Officer Name" 
        className="border p-2 rounded mb-4 w-full" 
        value={assignedOfficer} 
        onChange={(e) => setAssignedOfficer(e.target.value)} 
      />

      <label className="block mb-2">Set Priority</label>
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)} 
        className="border p-2 rounded mb-4 w-full"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <button onClick={handleAssign} className="bg-blue-500 text-white px-4 py-2 rounded">
        Confirm Assignment
      </button>

      <Link to={`/admin/incidents/:id`} className="mt-4 inline-block text-blue-500">
        Back to Incident Details
      </Link>
    </div>
  );
}

export default AssignIncident;
