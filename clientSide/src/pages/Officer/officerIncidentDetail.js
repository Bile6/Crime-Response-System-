import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function OfficerIncidentDetail() {
  const { id } = useParams(); // Get the assigned incident ID from the URL
  const [incidentData, setIncidentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    console.log("The id: ", id);
    const fetchIncidentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/incident/assign/detail/${id}`);
        setIncidentData(response.data.data);
        console.log("The data: ", response.data.data);
        console.log("The id: ", id);
      } catch (err) {
        console.log("The error: ", err);
        setError("Failed to load incident details.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidentDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!incidentData) return <p>Incident data not available</p>;

  const { incidentId } = incidentData; // Access the populated incident details

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Incident Details</h1>
      <table className="min-w-full bg-white mb-4">
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-semibold">ID</td>
            <td className="border px-4 py-2">{incidentData._id}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Type</td>
            <td className="border px-4 py-2">{incidentData?.typeOfIncident}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Status</td>
            <td className="border px-4 py-2">{incidentData?.status}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Description</td>
            <td className="border px-4 py-2">{incidentData?.description}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Location</td>
            <td className="border px-4 py-2">{incidentData?.location}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Date</td>
            <td className="border px-4 py-2">{incidentData?.date ? new Date(incidentData.date).toLocaleDateString() : "N/A"}</td>
          </tr>
          <tr>
          <td className="border p-2 font-semibold bg-gray-100">Evidence</td>
            <td className="border p-2">
              {incidentData.evidence ? (
               <img 
               src={`http://localhost:5000/api/users/get_image/${incidentData.evidence}`} // Adjust the path as necessary
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
      <div className="flex items-center justify-between mt-6">
        <Link to="/officer/incidents" className="text-blue-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default OfficerIncidentDetail;
