import React from 'react';

function MatchCard({ match }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 m-4 text-white">
      <h2 className="text-2xl font-bold mb-4">{match.teams}</h2>
      <div className="mb-2">
        <span className="font-semibold text-gray-300">Date: </span>
        <span className="text-gray-400">{formatDate(match.date)}</span>
      </div>
      <div>
        <span className="font-semibold text-gray-300">Venue: </span>
        <span className="text-gray-400">{match.venue}</span>
      </div>
      {/* Add more match details as needed */}
    </div>
  );
}

export default MatchCard;
