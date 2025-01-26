import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterOfficer() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("Officer");
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!username || !email || !password) {
      setDialogMessage("Please fill in all the fields.");
      setShowDialog(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailIsValid = emailRegex.test(email);
    setIsEmailValid(emailIsValid);
    if (!emailIsValid) return;

    // Password validation
    const passwordIsValid = password.length >= 8;
    setIsPasswordValid(passwordIsValid);
    if (!passwordIsValid) return;

    // If type is empty, set it to 'Officer'
    const finalType = type.trim() === "" ? "Officer" : type;

    try {
      const response = await axios.post("http://localhost:5000/api/users/add", {
        username,
        email,
        password,
        type: finalType,
      });
      if (response.data.success) {
        setDialogMessage(`New officer registered: ${username}`);
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setDialogMessage("Failed to register officer. Please try again.");
      setShowDialog(true);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setName("");
    setEmail("");
    setPassword("");
    setType("Officer");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Password validation: minimum 8 characters
    setIsPasswordValid(value.length >= 8);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Register New Officer</h1>

      <input
        type="text"
        placeholder="Name"
        className="border p-2 rounded mb-2 w-full"
        value={username}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className={`border p-2 rounded mb-2 w-full ${isEmailValid ? '' : 'border-red-500'}`}
        value={email}
        onChange={handleEmailChange}
      />
      {!isEmailValid && (
        <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
      )}

      <input
        type="password"
        placeholder="Password"
        className={`border p-2 rounded mb-4 w-full ${isPasswordValid ? '' : 'border-red-500'}`}
        value={password}
        onChange={handlePasswordChange}
      />
      {!isPasswordValid && (
        <p className="text-red-500 text-sm mt-1">Password must be at least 8 characters long.</p>
      )}

      <input
        type="text"
        placeholder="Officer"
        value={type}
        className="border p-2 rounded mb-4 w-full"
        readOnly
        onChange={(e) => setType(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        Register Officer
      </button>
      <Link
  to="/admin/users"
  className="inline-block bg-purple-500 text-white ml-4 px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
>
  Back
</Link>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Notification</h2>
            <p className="mb-4">{dialogMessage}</p>
            <button
              onClick={handleDialogClose}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterOfficer;