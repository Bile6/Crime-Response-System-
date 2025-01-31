import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function IncidentsList() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("typeOfIncident"); // Default sort by typeOfIncident
  const [sortOrder, setSortOrder] = useState("asc");
  const [incidents, setIncidents] = useState([]); // State to hold incidents
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(""); // State for error messages

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/incident/some"
        );
        setIncidents(response.data.data); // Set incidents from response
      } catch (error) {
        console.error("Failed to fetch incidents:", error);
        setError("Failed to fetch incidents. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    fetchIncidents(); // Call the function to fetch incidents
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const sortedIncidents = incidents
    .filter((incident) => {
      return (
        incident.typeOfIncident &&
        incident.typeOfIncident.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div className="text-red-500">{error}</div>; // Error state

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Incidents List</h1>

      <input
        type="text"
        placeholder="Search by Type of Incident"
        className="mb-4 p-2 border rounded w-full"
        value={search}
        onChange={handleSearchChange}
      />

      <select
        onChange={(e) => setSortField(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="typeOfIncident">Sort by Type of Incident</option>
        <option value="status">Sort by Status</option>
      </select>
      <select
        onChange={(e) => setSortOrder(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead className="bg-purple-500 text-white">
          <tr>
            <th className="border-b p-2 text-left">ID</th>
            <th className="border-b p-2 text-left">Type of Incident</th>
            <th className="border-b p-2 text-left">Status</th>
            <th className="border-b p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedIncidents.map((incident) => (
            <tr key={incident._id}>
              <td className="border-b p-2">{incident._id}</td>
              <td className="border-b p-2">{incident.typeOfIncident}</td>
              <td className="border-b p-2">{incident.status}</td>
              <td className="border-b p-2">
                <Link
                  to={`/admin/incidents/${incident._id}`}
                  className="text-blue-500"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncidentsList;
