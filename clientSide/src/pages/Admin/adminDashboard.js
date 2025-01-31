import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState(null);
  const [incidentData, setIncidentData] = useState([]);
  const [incidentTypes, setIncidentTypes] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleSectionClick = (section) => {
    // Clear selectedStatus when viewing total incidents
    if (section === 'incidents') {
      setSelectedStatus(null);
    }
    setActiveSection(activeSection === section ? null : section);
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status === selectedStatus ? null : status); // Toggle between status and null
  };

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/incident/all');
        setIncidentData(response.data.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    const fetchIncidentTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/incident/types');
        setIncidentTypes(response.data.data);
      } catch (error) {
        console.error("Error fetching incident types:", error);
      }
    };

    fetchIncidents();
    fetchIncidentTypes();
  }, []);

  // Count incidents by status
  const statusCounts = incidentData.reduce(
    (counts, incident) => {
      counts[incident.status] = (counts[incident.status] || 0) + 1;
      return counts;
    },
    { pending: 0, "in-progress": 0, resolved: 0 }
  );

  const filteredIncidents = selectedStatus
    ? incidentData.filter(incident => incident.status === selectedStatus)
    : incidentData;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Dashboard Overview</h1>

      {/* Dashboard Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div
          className={`p-5 rounded-lg shadow-lg cursor-pointer ${
            activeSection === 'incidents' ? 'bg-purple-600' : 'bg-purple-500'
          } text-white hover:bg-purple-600 transition-colors`}
          onClick={() => handleSectionClick('incidents')}
        >
          <h2 className="text-lg font-semibold">Total Incidents</h2>
          <p className="text-4xl font-bold mt-2">{incidentData.length}</p>
        </div>

        <div
          className={`p-5 rounded-lg shadow-lg cursor-pointer ${
            activeSection === 'types' ? 'bg-gray-400' : 'bg-gray-300'
          } text-gray-800 hover:bg-gray-400 transition-colors`}
          onClick={() => handleSectionClick('types')}
        >
          <h2 className="text-lg font-semibold">Available Types</h2>
          <p className="text-4xl font-bold mt-2">{incidentTypes.length}</p>
        </div>

        <div
          className={`p-5 rounded-lg shadow-lg cursor-pointer ${
            activeSection === 'statuses' ? 'bg-purple-600' : 'bg-purple-500'
          } text-white hover:bg-purple-600 transition-colors`}
          onClick={() => handleSectionClick('statuses')}
        >
          <h2 className="text-lg font-semibold">Incident Status</h2>
          <div className="flex justify-around mt-3">
            <div className="text-center">
              <p className="text-sm text-gray-100">Pending</p>
              <p className="text-2xl font-bold">{statusCounts.pending}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-100">In Progress</p>
              <p className="text-2xl font-bold">{statusCounts["in-progress"]}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-100">Resolved</p>
              <p className="text-2xl font-bold">{statusCounts.resolved}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Tables */}
      {activeSection === 'incidents' && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Incidents</h3>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-purple-500 text-white">
              <tr>
                <th className="px-4 py-2 font-medium">ID</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Location</th>
                <th className="px-4 py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {incidentData.map(incident => (
                <tr key={incident._id} className="text-center border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{incident._id}</td>
                  <td className="px-4 py-3 text-gray-600">{incident.status}</td>
                  <td className="px-4 py-3 text-gray-600">{incident.typeOfIncident}</td>
                  <td className="px-4 py-3 text-gray-600">{incident.location}</td>
                  <td className="px-4 py-3 text-gray-600">{new Date(incident.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeSection === 'types' && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Types</h3>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-purple-500 text-white">
              <tr>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Count</th>
              </tr>
            </thead>
            <tbody>
              {incidentTypes.map(type => (
                <tr key={type._id} className="text-center border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{type._id}</td>
                  <td className="px-4 py-3 text-gray-600">{type.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeSection === 'statuses' && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Incident Status</h3>
          <div className="flex space-x-4 mb-4">
            <button 
              onClick={() => handleStatusClick('pending')} 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${selectedStatus === 'pending' ? 'bg-purple-700 text-white' : 'bg-purple-500 text-white'} hover:bg-purple-700`}
            >
              Pending
            </button>
            <button 
              onClick={() => handleStatusClick('in-progress')} 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${selectedStatus === 'in-progress' ? 'bg-gray-400 text-gray-900' : 'bg-gray-300 text-gray-800'} hover:bg-gray-400`}
            >
              In Progress
            </button>
            <button 
              onClick={() => handleStatusClick('resolved')} 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${selectedStatus === 'resolved' ? 'bg-purple-700 text-white' : 'bg-purple-500 text-white'} hover:bg-purple-700`}
            >
              Resolved
            </button>
          </div>

          {/* Filtered Incidents Table */}
          {selectedStatus && (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-purple-500 text-white">
                <tr>
                  <th className="px-4 py-2 font-medium">ID</th>
                  <th className="px-4 py-2 font-medium">Location</th>
                  <th className="px-4 py-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidents.map(incident => (
                  <tr key={incident._id} className="text-center border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{incident._id}</td>
                    <td className="px-4 py-3 text-gray-600">{incident.location}</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(incident.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;