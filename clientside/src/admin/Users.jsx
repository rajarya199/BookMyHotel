import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { API } from '../config';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Users = () => {
  const { token } = isAuthenticated();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${API}/userlist`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setUsers(res.data);
    })
    .catch(err => console.log(err));
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white  border-1 shadow border-gray-300">
        <caption class="caption-top text-center text-2xl font-serif text-black">
            Manage Users
  </caption>
          <thead>
            <tr className='font-serif'>
            <th className="px-4 py- border-b-2 border-gray-300 bg-gray-100 text-left">S.N</th>
              <th className="px-4 py- border-b-2 border-gray-300 bg-gray-100 text-left">Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Email</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Phone</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Gender</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, i) => (
              <tr key={i} className="hover:bg-gray-50">
               <td className="px-4 py-2 border-b border-gray-300 ">{i+1}</td>
                <td className="px-4 py-2 border-b border-gray-300 ">{user.name}</td>
                <td className="px-4 py-2 border-b border-gray-300 ">{user.email}</td>
                <td className="px-4 py-2 border-b border-gray-300 ">{user.phone}</td>
                <td className="px-4 py-2 border-b border-gray-300">{user.gender}</td>
                <td className="px-4 py-2 border-b border-gray-300 ">
                <div className="flex space-x-2">
                    <Link to={`/admin/edituser/${user._id}`} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </Link>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
