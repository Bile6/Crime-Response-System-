import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [officers, setOfficers] = useState([]); // List of officers
  const [selectedOfficer, setSelectedOfficer] = useState(""); // Selected officer ID
  const [priority, setPriority] = useState(""); // Priority

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/incident/${id}`);
        setIncident(response.data.data);
        setStatus(response.data.data.status);
      } catch (error) {
        console.error("Failed to fetch incident:", error);
        setError("Failed to fetch incident details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch officers for assignment
    const fetchOfficers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/type/Officer");
        setOfficers(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch officers:", error);
      }
    };

    fetchIncident();
    fetchOfficers();
  }, [id]);

  const handleStatusChange = (e) => setStatus(e.target.value);

  const handleAssign = async () => {
    try {
      const assignedData = {
        incidentId: id,
        officerUsername: selectedOfficer,
        priority,
        status
      };

      console.log("Assigned incident: ", assignedData);

      await axios.post(`http://localhost:5000/api/incident/assign/add`, assignedData);
      alert("Incident assigned successfully!");
      setShowModal(false); // Close the modal after assignment
      navigate(`/admin/incidents`);
    } catch (error) {
      console.error("Failed to assign officer:", error);
      setError("Failed to assign officer. Please try again later.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Incident Details</h1>

      <table className="w-full border-collapse mb-6">
        <tbody>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">ID</td>
            <td className="border p-2">{incident._id}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Type</td>
            <td className="border p-2">{incident.typeOfIncident}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Status</td>
            <td className="border p-2">
              <select 
                value={status} 
                onChange={handleStatusChange} 
                className="border p-2 rounded w-full"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Description</td>
            <td className="border p-2">{incident.description}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Location</td>
            <td className="border p-2">{incident.location}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Date</td>
            <td className="border p-2">{new Date(incident.date).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Evidence</td>
            <td className="border p-2">
              {incident.evidence ? (
               <img 
               src={`http://localhost:5000/api/users/get_image/${incident.evidence}`} // Adjust the path as necessary
               alt="Evidence" 
               className="w-32 h-auto rounded-md" // Adjust size as needed
             />
              ) : (
                <span>No evidence available</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Button to open modal */}
      <button 
        onClick={() => setShowModal(true)} 
        className="bg-purple-500 text-white px-4 py-2 rounded mb-4"
      >
        Assign to Officer
      </button>

      <Link to="/admin/incidents" className="inline-block text-blue-500 ml-4">
        Back to Incidents List
      </Link>

      {/* Modal for assigning to an officer */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">Assign Incident</h2>
            <label className="block mb-2">
              Officer:
              <select 
                value={selectedOfficer} 
                onChange={(e) => setSelectedOfficer(e.target.value)} 
                className="block w-full p-2 border rounded"
              >
                <option hidden value="">Select Officer</option>
                {officers.map((officer) => (
                  <option key={officer._id} value={officer.username}>
                    {officer.username}
                  </option>
                ))}
              </select>
            </label>
            <label className="block mb-2">
              Priority:
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)} 
                className="block w-full p-2 border rounded"
              >
              <option hidden value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleAssign} 
                className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
              >
                Assign
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IncidentDetail;
