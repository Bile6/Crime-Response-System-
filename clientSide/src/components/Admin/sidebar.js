import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserFriends, FaListAlt, FaSignOutAlt } from 'react-icons/fa';
import { RiAdminFill } from "react-icons/ri";

function AdminSidebar({ onLogout }) {


  // const handleLogout = () => {
  //   // Clear the token from localStorage and reset authentication state
  //   localStorage.removeItem('token');
  //   setIsAuthenticated(false);
  //   setUserRole(null);
  //   navigate('/login');
  // };

  return (
    <aside className="w-64 bg-gray-200 text-gray-600 font-sans">
      <div className="flex items-center justify-center mt-8 mb-4 mr-11">
        <div className="text-xl font-bold text-purple-700 ">Admin Dashboard</div>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="mb-4">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center py-2 px-4 rounded text-lg 
                ${isActive ? 'text-purple-700' : 'text-gray-600 hover:text-purple-700'}`
              }
            >
              <RiAdminFill className="mr-2 text-xl" />
              Overview
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/admin/incidents"
              className={({ isActive }) =>
                `flex items-center py-2 px-4 rounded text-lg 
                ${isActive ? 'text-purple-700' : 'text-gray-600 hover:text-purple-700'}`
              }
            >
              <FaListAlt className="mr-2 text-xl" />
              Incident List
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center py-2 px-4 rounded text-lg 
                ${isActive ? 'text-purple-700' : 'text-gray-600 hover:text-purple-700'}`
              }
            >
              <FaUserFriends className="mr-2 text-xl" />
              Users
            </NavLink>
          </li>
        </ul>
        <button
          onClick={onLogout}
          className="flex items-center w-full py-2 px-4 mt-6 text-lg text-gray-600 hover:text-purple-700"
        >
          <FaSignOutAlt className="mr-2 text-xl" />
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
