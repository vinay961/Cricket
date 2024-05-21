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
          const iplMatches = response.data.res.matches.filter(match => match.srsKey === 'ipl_2024' && (match.matchStatus === 'Live'));
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
    <div className="live-score bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Live IPL Matches</h2>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div>
          {liveMatches.length > 0 ? (
            liveMatches.map((match, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 mb-4">
                <h3 className="text-xl font-bold">{match.teams && match.teams.t1 && match.teams.t1.name} vs {match.teams && match.teams.t2 && match.teams.t2.name}</h3>
                <p className="text-lg">{match.format}</p>
                <p className='text-m'>{match.matchSuffix}</p>
                <p className="text-sm">Venue: {match.venue}</p>
                <p className="text-sm">Status: {match.matchStatus}</p>
                <p className="text-sm">Score: {match.teams.t1.score} - {match.teams.t2.score}</p>
              </div>
            ))
          ) : (
            <p>No live IPL matches currently available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LiveScore;
