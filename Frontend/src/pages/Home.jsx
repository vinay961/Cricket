import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="header flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="logo">
          <h1 className="text-3xl font-bold">DHEKHO</h1>
        </div>
        <div className="nav flex space-x-4">
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => navigate('/login')}
          >
            LOGIN
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => navigate('/register')}
          >
            REGISTER
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow">
        {/* Your main content goes here */}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} DHEKHO. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
