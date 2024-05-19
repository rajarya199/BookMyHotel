import React from 'react'
import { Link } from 'react-router-dom'
const AdminDash = () => {
  return (
    <>
          <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Hotel Booking Admin Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/admin/bookings">Manage Bookings</Link></li>
            <li><Link to="/admin/rooms">Manage Rooms</Link></li>
            <li><Link to="/admin/users">Manage Users</Link></li>
            <li><Link to="/admin/reports">View Reports</Link></li>
            <li><Link to="/signout">Sign Out</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="dashboard-section">
          <h2>Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Bookings</h3>
              <p>120</p>
            </div>
            <div className="stat-card">
              <h3>Available Rooms</h3>
              <p>45</p>
            </div>
            <div className="stat-card">
              <h3>Registered Users</h3>
              <p>300</p>
            </div>
            <div className="stat-card">
              <h3>Revenue</h3>
              <p>$15,000</p>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  )
}

export default AdminDash



