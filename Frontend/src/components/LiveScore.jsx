import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LiveScore() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://free-cricket-live-score1.p.rapidapi.com/matches',
          headers: {
            'X-RapidAPI-Key': 'fc024eb85emsh801def950023b58p1225b8jsn386059591f49',
            'X-RapidAPI-Host': 'free-cricket-live-score1.p.rapidapi.com'
          }
        };

        const response = await axios.request(options);
        console.log(response.data);

        if (response.data.res && Array.isArray(response.data.res.matches)) {
          const iplMatches = response.data.res.matches.filter(match => match.srsKey === 'ipl_2024' && match.matchStatus === 'live');
          setLiveMatches(iplMatches);
        } else {
          setError('No live matches currently available.');
        }
      } catch (error) {
        console.error('Error fetching live matches:', error);
        setError('Failed to fetch live matches.');
      }
    };

    fetchLiveMatches();

    // Update live score every second
    const intervalId = setInterval(fetchLiveMatches, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval
  }, []);

  return (
    <div className="live-score bg-gray-900 text-white p-6 rounded-lg shadow-lg mt-2">
      <h2 className="text-3xl font-bold mb-6">Live IPL Matches</h2>
      {error ? (
        <div className="error-message bg-red-500 p-4 rounded">{error}</div>
      ) : (
        <div className="space-y-6">
          {liveMatches.length > 0 ? (
            liveMatches.map((match, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">{match.teams && match.teams.t1 && match.teams.t1.name} vs {match.teams && match.teams.t2 && match.teams.t2.name}</h3>
                <p className="text-lg mb-2">{match.format}</p>
                <p className="text-md mb-2">{match.matchSuffix}</p>
                <p className="text-sm mb-1"><span className="font-semibold">Venue:</span> {match.venue}</p>
                <p className="text-sm mb-1"><span className="font-semibold">Status:</span> {match.matchStatus}</p>
                <p className="text-sm"><span className="font-semibold">Score:</span> {match.teams.t1.score} - {match.teams.t2.score}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-lg">No live IPL matches currently available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LiveScore;
