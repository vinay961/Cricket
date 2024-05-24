// src/TeamDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerCareer = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      const options = {
        method: 'GET',
        url: 'https://livescore6.p.rapidapi.com/teams/detail',
        params: { ID: '3339' },
        headers: {
          'X-RapidAPI-Key': 'fc024eb85emsh801def950023b58p1225b8jsn386059591f49',
          'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setTeamData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div>
      <h1>Team Details</h1>
      {teamData && (
        <div>
          <h2>{teamData.team.name}</h2>
          <p><strong>Country:</strong> {teamData.team.country}</p>
          <p><strong>Founded:</strong> {teamData.team.founded}</p>
          <p><strong>Venue:</strong> {teamData.team.venue.name}</p>
          <p><strong>Capacity:</strong> {teamData.team.venue.capacity}</p>
          {/* Add more team details as needed */}
        </div>
      )}
    </div>
  );
};

export default PlayerCareer;
