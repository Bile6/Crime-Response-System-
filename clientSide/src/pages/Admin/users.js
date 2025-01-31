import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]); // State to hold fetched users
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for any error messages
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to control delete dialog visibility
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false); // State to control update dialog visibility
  const [selectedUserId, setSelectedUserId] = useState(null); // State for the user being deleted
  const [selectedUser, setSelectedUser] = useState({}); // State for user being updated
  const [roleFilter, setRoleFilter] = useState(''); // State for role filter
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Read Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/all');
        setUsers(response.data.data); // Assuming your response structure is { data: users }
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to fetch users. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []); // Empty dependency array means this effect runs once on mount

  // Delete User
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${selectedUserId}`);
      setUsers(users.filter(user => user._id !== selectedUserId)); // Remove the deleted user from the state
      setDeleteDialogOpen(false); // Close the delete dialog
    } catch (error) {
      console.error('Failed to delete user:', error);
      setError('Failed to delete user. Please try again later.');
    }
  };

  const openDeleteDialog = (id) => {
    setSelectedUserId(id);
    setDeleteDialogOpen(true);
  };

  const openUpdateDialog = (user) => {
    setSelectedUser(user);
    setSelectedUserId(user._id); // Set the selected user ID here for update
    setUpdateDialogOpen(true);
  };
  

  // Update users
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password } = selectedUser;
      const updateData = { username, email };
  
      if (password) {
        updateData.password = password;
      }
  
      await axios.put(`http://localhost:5000/api/users/${selectedUserId}`, updateData);
      setUsers(users.map(user => (user._id === selectedUserId ? { ...user, username, email } : user)));
      setUpdateDialogOpen(false); // Close the update dialog
    } catch (error) {
      console.error('Failed to update user:', error);
      setError('Failed to update user. Please try again later.');
    }
  };
  ;

  // Filtered users based on role and search term
  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter ? user.type === roleFilter : true;
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {loading ? (
        <p>Loading...</p> // Display loading message
      ) : error ? (
        <p className="text-red-500">{error}</p> // Display error message
      ) : (
        <>
          {/* Role Filter and Search Input */}
          <div className="flex mb-4">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border p-2 rounded mr-2"
            >
              <option value="">All Roles</option>
              <option value="Officer">Officer</option>
              <option value="user">User</option>
            </select>
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <table className="w-full border-collapse mb-4 rounded-lg overflow-hidden">
            <thead className='bg-purple-500 text-white'>
              <tr>
                <th className="border-b p-2 text-left">ID</th>
                <th className="border-b p-2 text-left">Name</th>
                <th className="border-b p-2 text-left">Role</th>
                <th className="border-b p-2 text-left">Email</th>
                <th className="border-b p-2 text-left">Actions</th> {/* Actions Column */}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}> {/* Use the unique _id for the key */}
                  <td className="border-b p-2">{user._id}</td>
                  <td className="border-b p-2">{user.username}</td>
                  <td className="border-b p-2">{user.type}</td>
                  <td className="border-b p-2">{user.email}</td>
                  <td className="border-b p-2">
                    <button
                      onClick={() => openUpdateDialog(user)}
                      className="bg-purple-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => openDeleteDialog(user._id)}
                      className="text-gray-800 bg-red-300 px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Confirmation Dialog for Deletion */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4">
              <button 
                onClick={handleDelete} 
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Yes, Delete
              </button>
              <button 
                onClick={() => setDeleteDialogOpen(false)} 
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update User Dialog */}
      {isUpdateDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Update User</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={selectedUser.username}
                onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                placeholder="Name"
                className="border p-2 rounded mb-2 w-full"
                required
              />
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                placeholder="Email"
                className="border p-2 rounded mb-2 w-full"
                required
              />
              <input
                type="password"
                placeholder="Password (leave blank to keep current)"
                onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                className="border p-2 rounded mb-4 w-full"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Update
              </button>
              <button 
                type="button" 
                onClick={() => setUpdateDialogOpen(false)} 
                className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Button to navigate to Register Officer page */}
      <Link to="/admin/register-officer">
        <button className="bg-purple-500 text-white px-4 py-2 rounded">
          Add Officer
        </button>
      </Link>
    </div>
  );
}

export default Users;