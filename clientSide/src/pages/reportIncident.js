import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReportIncident() {
  // State for form fields
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  const handleFile = (e) => {
    setEvidence(e.target.files[0]);
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("typeOfIncident", type);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("evidence", evidence);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/incident/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log("Registration failed", error);
      setError("Registering incident failed");
    }
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  const confirmSubmit = () => {
    handleRegister(); // Call the register function
    setIsModalOpen(false); // Close the modal
  };

  const cancelSubmit = () => {
    setIsModalOpen(false); // Close the modal without submitting
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Report an Incident</h2>
      <form onSubmit={handleSubmitReport} className="grid grid-cols-2 gap-6">
        {/* Form Fields */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Type of Incident</label>
          <input
            type="text"
            placeholder="Enter incident type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            placeholder="Describe the incident..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Evidence (optional)</label>
          <input
            type="file"
            onChange={handleFile}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Submit Report
          </button>
        </div>
      </form>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold">Confirm Submission</h2>
            <p className="mt-2">Are you sure you want to submit this report?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={confirmSubmit}
                className="bg-green-500 text-white py-1 px-4 rounded mr-2"
              >
                Yes
              </button>
              <button
                onClick={cancelSubmit}
                className="bg-red-500 text-white py-1 px-4 rounded"
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

export default ReportIncident;