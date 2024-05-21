import React, { useState, useEffect } from 'react';
import MatchCard from '../components/MatchCard.jsx';

function MatchSchedule() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch matches from your backend
    async function fetchMatches() {
      try {
        const response = await fetch('http://localhost:7000/app/admin/matchlist');
        console.log(response);

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Log the data to verify its structure
        console.log('Fetched data:', result);

        // Check if data is an array
        if (Array.isArray(result.data)) {
          setMatches(result.data);
        } else {
          console.error('Fetched data is not an array:', result);
          setMatches([]); // Set an empty array if data is not in expected format
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
        setMatches([]); // Set an empty array in case of an error
      }
    }

    fetchMatches();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="header flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="logo">
          <h1 className="text-3xl font-bold">DHEKHO</h1>
        </div>
      </div>

      <div className="flex-grow">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} DHEKHO. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MatchSchedule;
