import React from 'react';
import { Link } from 'react-router-dom';

const AdminDash = () => {
  return (
    <>
      <div className="admin-dashboard bg-gray-100 min-h-screen">
        <header className="admin-header mt-2 bg-gray-200 text-black p-4">
          <h2 className="text-3xl font-semibold text-center ">BookMyHotel</h2>
          <h2 className="text-3xl "> Admin Dashboard</h2>

          <nav className="mt-4">
            <ul className="flex space-x-4">
              <li><Link to="/admin/bookings" className=" text-black hover:underline">Manage Bookings</Link></li>
              <li><Link to="/admin/rooms" className=" text-black hover:underline">Manage Rooms</Link></li>
              <li><Link to="/admin/users" className="  text-black hover:underline">Manage Users</Link></li>
              <li><Link to="/admin/reports" className=" text-black hover:underline">View Reports</Link></li>
              <li><Link to="/signout" className="  text-black hover:underline">Sign Out</Link></li>
            </ul>
          </nav>
        </header>
        <main className="p-6">
          <section className="dashboard-section">
            <h2 className="text-3xl  mb-4">Overview</h2>
            <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="stat-card bg-white shadow p-4 rounded">
                <h3 className="text-xl font-medium">Total Bookings</h3>
                <p className="text-3xl font-bold">120</p>
              </div>
              <div className="stat-card bg-white shadow p-4 rounded">
                <h3 className="text-xl font-medium">Available Rooms</h3>
                <p className="text-3xl font-bold">45</p>
              </div>
              <div className="stat-card bg-white shadow p-4 rounded">
                <h3 className="text-xl font-medium">Registered Users</h3>
                <p className="text-3xl font-bold">300</p>
              </div>
              <div className="stat-card bg-white shadow p-4 rounded">
                <h3 className="text-xl font-medium">Revenue</h3>
                <p className="text-3xl font-bold">$15,000</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default AdminDash;




