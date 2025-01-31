import React from "react";
import "font-awesome/css/font-awesome.min.css";
import { NavLink } from "react-router-dom";
import { TbProgressDown } from "react-icons/tb";
import { FaRegCheckSquare, FaEdit } from "react-icons/fa";
import { FaUserFriends, FaListAlt, FaSignOutAlt } from 'react-icons/fa';

function UserSidebar({onLogout}  ) {
  return (
    <aside className="w-64 bg-gray-200 text-gray-600 font-sans">
      <div className="flex items-center justify-center mt-8 mb-4">
        <div className="text-xl font-bold text-purple-700 mr-11">User Dashboard</div>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="mb-4">
            <NavLink
              // to="/report-incident"
              className={({ isActive }) =>
                `flex items-center py-2 px-4 rounded text-lg 
                ${isActive ? "text-purple-700" : "text-gray-600 hover:text-purple-700"}`}
            >
              <FaEdit className="mr-2 text-xl" />
              Register Incident 
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

export default UserSidebar;
