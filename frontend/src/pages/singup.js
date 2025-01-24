import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordIsValid = password.length >= 8;
    setIsPasswordValid(passwordIsValid);

    if (!passwordIsValid) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/add', {
        username,
        email,
        password,
      });
      if (response.data.success) {
        navigate('/login'); // Redirect to login page after successful registration
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Update password validation
    setIsPasswordValid(value.length >= 8);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Sign Up</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-3 py-2 border ${isPasswordValid ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Create a password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {!isPasswordValid && (
              <p className="text-red-500 text-sm mt-1">Password must be at least 8 characters long.</p>
            )}
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white font-bold py-2 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Register
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;