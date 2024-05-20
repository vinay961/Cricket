import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:7000/app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        navigate('/'); // Navigate to the desired route on success
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit}>
          <div className="border-b border-gray-300 pb-4 mb-4">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">Register</h2>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-700">Name</label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-700">Email address</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-700">Password</label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-700">Confirm Password</label>
              <div className="mt-2">
                <input
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  value={formData.cpassword}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between space-x-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => navigate('/')}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
