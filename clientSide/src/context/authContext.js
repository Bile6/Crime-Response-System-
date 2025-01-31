// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [user_id, setUser_id] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);  // Add user state to store user info including username

  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token, role, user ,user_id } = response.data;
        console.log("the response is+++++++++++++++++++++++++++++++++++: ", response);
      // Save token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user_id', user_id);

      setUser(user);  // Set the user object with details
      setUserRole(role);
      setIsAuthenticated(true);
      setUser_id(user_id)

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'officer') {
        navigate('/officer');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);  // Reset user on logout
    setUserRole(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    // Check if user is already authenticated on mount
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, isAuthenticated, login, logout, user, user_id }}>
      {children}
    </AuthContext.Provider>
  );
};
