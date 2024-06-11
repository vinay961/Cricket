// src/PlayerCareer.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerCareer = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCricketNews = async () => {
      const options = {
        method: 'GET',
        url: 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index',
        headers: {
          'X-RapidAPI-Key': 'fc024eb85emsh801def950023b58p1225b8jsn386059591f49',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCricketNews();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error fetching data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-2xl text-white mb-4">Cricket News</h1>
      {news.length > 0 && (
        <ul className="text-white">
          {news.map((article) => (
            <li key={article.id} className="mb-4">
              <p><strong>Title:</strong> {article.headline}</p>
              <p><strong>Summary:</strong> {article.summary}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400">Read more</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayerCareer;
