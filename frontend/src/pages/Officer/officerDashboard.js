// src/pages/OfficerDashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthProvider } from '../../context/authContext';
import axios from 'axios';

function OfficerDashboard() {
  const user = useContext(AuthProvider); // Get user data from context
  const username = localStorage.getItem('user_id'); // Retrieve username from user context

  console.log("username is: ", username);
  const [assignedIncidents, setAssignedIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignedIncidents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/incident/assign/${username}`);
        // console.log("API response data:", response.data); // Debug statement to see the structure
        setAssignedIncidents(response.data.data);
      } catch (error) {
        console.error("Failed to fetch assigned incidents:", error);
        setError("No incidents assigned yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedIncidents();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Assigned Incidents</h1>
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">ID</th>
            <th className="border-b p-2 text-left">Type</th>
            <th className="border-b p-2 text-left">Status</th>
            <th className="border-b p-2 text-left">Priority</th>
            <th className="border-b p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedIncidents.map((incident) => (
            <tr key={incident._id}>
              <td className="border-b p-2">{incident._id}</td>
              <td className="border-b p-2">{incident.incidentId?.typeOfIncident}</td> {/* Safe check for typeOfIncident */}
              <td className="border-b p-2">{incident.status}</td>
              <td className="border-b p-2">{incident.priority}</td>
              <td className="border-b p-2">
                {incident.incidentId?._id ? ( // Conditional rendering for Link if incidentId exists
                  <Link to={`/officer/incidents/${incident.incidentId._id}`} className="text-blue-500">
                    View Details
                  </Link>
                  
                ) : (
                  <span>No Details Available</span>
                )}
              </td>
            </tr>
        
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OfficerDashboard;
