import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teams: '',
    date: '',
    venue: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:7000/app/admin/add', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful response
        alert('Match added successfully!');
      } else {
        // Handle errors
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.log('Error:', error);
      alert('Network error');
    }
  };
  
  return (
    <div className="bg-gray-900 h-screen text-white flex">
      {/* Sidebar */}
      <div className="flex flex-col w-64">
        <div className="p-4 bg-gray-800">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <nav className="flex-1 bg-gray-700 p-4">
          <ul>
            <li className="py-2 px-4 hover:bg-gray-600">
              <a href="#">Dashboard Overview</a>
            </li>
            <li className="py-2 px-4 hover:bg-gray-600">
              <a onClick={() => {navigate('/match-schedule') }} >Matches</a>
            </li>
            <li className="py-2 px-4 hover:bg-gray-600">
              <a onClick={()=>{navigate('/player')}} >Players</a>
            </li>
            <li className="py-2 px-4 hover:bg-gray-600">
              <a href="#">Scores</a>
            </li>
            <li className="py-2 px-4 hover:bg-gray-600">
              <a href="#">Settings</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-8">
        <div className="border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        </div>

        {/* Add New Match Form */}
        <div className="bg-gray-800 p-4 rounded-md mb-4">
          <h3 className="text-lg font-semibold mb-2">Add New Match</h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:items-center mb-2">
              <label htmlFor="teams" className="mr-2">Teams:</label>
              <input
                type="text"
                id="teams"
                value={formData.teams}
                onChange={handleChange}
                className="w-full md:w-1/2 rounded-md px-2 py-1 bg-gray-700"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center mb-2">
              <label htmlFor="date" className="mr-2">Date:</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full md:w-1/2 rounded-md px-2 py-1 bg-gray-700"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center mb-2">
              <label htmlFor="venue" className="mr-2">Venue:</label>
              <input
                type="text"
                id="venue"
                value={formData.venue}
                onChange={handleChange}
                className="w-full md:w-1/2 rounded-md px-2 py-1 bg-gray-700"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Add Match
            </button>
          </form>
        </div>

        {/* Other Dashboard Content Goes Here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
